import {
  signInAnonymously,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  doc,
  setDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { auth, db } from "./firebase.js";
import { EVENT_ID } from "./firebase-config.js";

const NAME_KEY = "guestName";

// Simplified guest auth: no password, no access code — anyone with the
// link enters their name and is in. Everyone signs in anonymously under
// their own Firebase uid so uploads can be attributed to a name, and every
// signed-in guest is trusted equally (small private wedding guest list,
// not a multi-tenant app).
export async function signInGuest(name) {
  const trimmedName = name.trim();
  if (!trimmedName) throw new Error("login.errNoName");

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
