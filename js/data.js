import {
  collection,
  collectionGroup,
  doc,
  addDoc,
  getDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  increment,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";
import { db, storage, auth } from "./firebase.js";
import { EVENT_ID } from "./firebase-config.js";
import { getGuestName } from "./auth.js";

const albumsCol = () => collection(db, "events", EVENT_ID, "albums");
const photosCol = (albumId) =>
  collection(db, "events", EVENT_ID, "albums", albumId, "photos");

export async function listAlbums() {
  const q = query(albumsCol(), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getAlbum(albumId) {
  const snap = await getDoc(doc(db, "events", EVENT_ID, "albums", albumId));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export async function createAlbum(name) {
  const ref = await addDoc(albumsCol(), {
    name,
    coverUrl: null,
    pinned: false,
    photoCount: 0,
    videoCount: 0,
    createdAt: serverTimestamp(),
    createdBy: auth.currentUser?.uid || null,
    createdByName: getGuestName(),
  });
  return ref.id;
}

export async function renameAlbum(albumId, name) {
  await updateDoc(doc(db, "events", EVENT_ID, "albums", albumId), { name });
}

export async function setAlbumPinned(albumId, pinned) {
  await updateDoc(doc(db, "events", EVENT_ID, "albums", albumId), { pinned });
}

export async function setAlbumCover(albumId, coverUrl) {
  await updateDoc(doc(db, "events", EVENT_ID, "albums", albumId), { coverUrl });
}

// Deletes an album and everything in it (photo docs + their Storage files).
export async function deleteAlbum(albumId) {
  const photos = await listPhotos(albumId);
  await Promise.all(
    photos.map((p) =>
      Promise.all([
        deleteDoc(doc(db, "events", EVENT_ID, "albums", albumId, "photos", p.id)),
        deleteObject(ref(storage, p.storagePath)).catch(() => {}),
      ])
    )
  );
  await deleteDoc(doc(db, "events", EVENT_ID, "albums", albumId));
}

export async function listPhotos(albumId) {
  const q = query(photosCol(albumId), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// Finds every photo/video a given guest uploaded, across all albums.
export async function listPhotosByUploader(uid) {
  const q = query(collectionGroup(db, "photos"), where("uploadedBy", "==", uid));
  const snap = await getDocs(q);
  return snap.docs
    .map((d) => ({ id: d.id, albumId: d.ref.parent.parent.id, ...d.data() }))
    .sort((a, b) => (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0));
}

export async function getPhoto(albumId, photoId) {
  const snap = await getDoc(
    doc(db, "events", EVENT_ID, "albums", albumId, "photos", photoId)
  );
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

// Uploads one file to Storage and records it in Firestore.
// onProgress(fraction 0..1) is called as the upload advances.
export function uploadPhoto(albumId, file, onProgress) {
  const isVideo = file.type.startsWith("video/");
  const ext = (file.name.split(".").pop() || (isVideo ? "mp4" : "jpg")).toLowerCase();
  const fileId = crypto.randomUUID();
  const storagePath = `events/${EVENT_ID}/albums/${albumId}/${fileId}.${ext}`;
  const storageRef = ref(storage, storagePath);
  const task = uploadBytesResumable(storageRef, file, { contentType: file.type });

  return new Promise((resolve, reject) => {
    task.on(
      "state_changed",
      (snap) => {
        if (onProgress) onProgress(snap.bytesTransferred / snap.totalBytes);
      },
      reject,
      async () => {
        try {
          const url = await getDownloadURL(storageRef);
          const docRef = await addDoc(photosCol(albumId), {
            url,
            storagePath,
            type: isVideo ? "video" : "image",
            uploadedBy: auth.currentUser?.uid || null,
            uploadedByName: getGuestName(),
            createdAt: serverTimestamp(),
          });
          const albumRef = doc(db, "events", EVENT_ID, "albums", albumId);
          const albumSnap = await getDoc(albumRef);
          const patch = {
            [isVideo ? "videoCount" : "photoCount"]: increment(1),
          };
          if (!isVideo && !albumSnap.data()?.coverUrl) {
            patch.coverUrl = url;
          }
          await updateDoc(albumRef, patch);
          resolve({ id: docRef.id, url, storagePath, type: isVideo ? "video" : "image" });
        } catch (err) {
          reject(err);
        }
      }
    );
  });
}

export async function deletePhoto(albumId, photo) {
  await deleteDoc(
    doc(db, "events", EVENT_ID, "albums", albumId, "photos", photo.id)
  );
  await deleteObject(ref(storage, photo.storagePath)).catch(() => {});
  const albumRef = doc(db, "events", EVENT_ID, "albums", albumId);
  await updateDoc(albumRef, {
    [photo.type === "video" ? "videoCount" : "photoCount"]: increment(-1),
  });
}

// Re-files a photo under a different album without re-uploading the
// underlying Storage object — only the Firestore bookkeeping moves.
export async function movePhoto(fromAlbumId, toAlbumId, photo) {
  await addDoc(photosCol(toAlbumId), {
    url: photo.url,
    storagePath: photo.storagePath,
    type: photo.type,
    uploadedBy: photo.uploadedBy,
    uploadedByName: photo.uploadedByName,
    createdAt: photo.createdAt || serverTimestamp(),
  });
  await deleteDoc(
    doc(db, "events", EVENT_ID, "albums", fromAlbumId, "photos", photo.id)
  );
  const field = photo.type === "video" ? "videoCount" : "photoCount";
  await updateDoc(doc(db, "events", EVENT_ID, "albums", fromAlbumId), {
    [field]: increment(-1),
  });
  await updateDoc(doc(db, "events", EVENT_ID, "albums", toAlbumId), {
    [field]: increment(1),
  });
}

export async function listGuests() {
  const q = query(
    collection(db, "events", EVENT_ID, "guests"),
    orderBy("joinedAt", "asc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}
