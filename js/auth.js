import {
  signInAnonymously,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { auth, db } from "./firebase.js";
import { EVENT_ID } from "./firebase-config.js";

const NAME_KEY = "guestName";

// Simplified guest auth: a shared access code (set by the couple in the
// events/{EVENT_ID} document) gates entry, then everyone signs in
// anonymously under their own Firebase uid so photos can be attributed.
export async function signInGuest(name, code) {
  const trimmedName = name.trim();
  if (!trimmedName) throw new Error("Введите имя");

  const eventSnap = await getDoc(doc(db, "events", EVENT_ID));
  if (!eventSnap.exists()) {
    throw new Error("Событие не найдено. Проверьте настройки Firebase.");
  }
  const eventData = eventSnap.data();
  const expected = String(eventData.accessCode || "").trim().toLowerCase();
  if (expected && expected !== code.trim().toLowerCase()) {
    throw new Error("Неверный код доступа");
  }

  const cred = await signInAnonymously(auth);
  await setDoc(
    doc(db, "events", EVENT_ID, "guests", cred.user.uid),
    { name: trimmedName, joinedAt: serverTimestamp() },
    { merge: true }
  );
  localStorage.setItem(NAME_KEY, trimmedName);
  return cred.user;
}

export function getGuestName() {
  return localStorage.getItem(NAME_KEY) || "Guest";
}

// Resolves with the current user, or redirects to login.html and never
// resolves if nobody is signed in. Call at the top of every protected page.
export function requireAuth() {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      if (user) {
        resolve(user);
      } else {
        window.location.href = "login.html";
      }
    });
  });
}

export async function signOutGuest() {
  await signOut(auth);
  localStorage.removeItem(NAME_KEY);
  window.location.href = "login.html";
}
