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
const ROLE_KEY = "guestRole";

// Three-tier access: the events/{EVENT_ID} document holds one access code
// per role (adminCode/participantCode/viewerCode). Whichever code the guest
// enters at login determines their role for that session — re-entering a
// different code later re-assigns it. Everyone still signs in anonymously
// under their own Firebase uid so content can be attributed.
export async function signInGuest(name, code) {
  const trimmedName = name.trim();
  if (!trimmedName) throw new Error("login.errNoName");

  const eventSnap = await getDoc(doc(db, "events", EVENT_ID));
  if (!eventSnap.exists()) {
    throw new Error("login.errNoEvent");
  }
  const eventData = eventSnap.data();
  const normalizedCode = code.trim().toLowerCase();
  const role = matchRole(eventData, normalizedCode);
  if (!role) {
    throw new Error("login.errBadCode");
  }

  const cred = await signInAnonymously(auth);
  const guestRef = doc(db, "events", EVENT_ID, "guests", cred.user.uid);
  await setDoc(
    guestRef,
    { name: trimmedName, role, joinedAt: serverTimestamp() },
    { merge: true }
  );
  localStorage.setItem(NAME_KEY, trimmedName);
  localStorage.setItem(ROLE_KEY, role);
  return cred.user;
}

function matchRole(eventData, normalizedCode) {
  const codes = {
    admin: eventData.adminCode,
    participant: eventData.participantCode,
    viewer: eventData.viewerCode,
  };
  for (const [role, expected] of Object.entries(codes)) {
    if (expected && String(expected).trim().toLowerCase() === normalizedCode) {
      return role;
    }
  }
  return null;
}

export function getGuestName() {
  return localStorage.getItem(NAME_KEY) || "Guest";
}

// Cached locally at sign-in for snappy UI gating (hiding upload/delete
// buttons for viewers). The real permission boundary is enforced server
// side by firestore.rules/storage.rules, which check the live role on the
// guest's own document — this cache is only ever used for UI, never trust.
export function getGuestRole() {
  return localStorage.getItem(ROLE_KEY) || "viewer";
}

export function canEdit() {
  return getGuestRole() !== "viewer";
}

export function isAdmin() {
  return getGuestRole() === "admin";
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
  localStorage.removeItem(ROLE_KEY);
  window.location.href = "login.html";
}
