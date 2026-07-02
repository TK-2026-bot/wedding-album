# Mallorca Wedding — Photo Album

A small phone-sized web app for a wedding party to share photos and videos
into shared albums. Static HTML/CSS/JS (no build step) backed by Firebase
(Auth, Firestore, Storage, Hosting).

## Architecture

- Plain HTML pages, one per screen (`index.html`, `albums.html`, `album.html`, …).
- `js/firebase.js` initializes the Firebase SDK (loaded from the `gstatic.com`
  CDN as ES modules — no bundler needed).
- `js/auth.js` — simplified guest sign-in: one of three shared access codes
  gates entry and assigns a role, then every guest is signed in anonymously
  via Firebase Auth so uploads can be attributed to a name.
- `js/data.js` — Firestore/Storage helpers (albums, photos, guests).
- Data model, all under a single event document (see `EVENT_ID` in
  `js/firebase-config.js`):
  - `events/{eventId}` — event info + `adminCode` / `participantCode` /
    `viewerCode` (publicly readable so the login screen can check them
    before sign-in).
  - `events/{eventId}/albums/{albumId}` — album name, cover, `pinned`,
    photo/video counts.
  - `events/{eventId}/albums/{albumId}/photos/{photoId}` — one per uploaded file.
  - `events/{eventId}/guests/{uid}` — one per guest who signed in, with
    `role: "admin" | "participant" | "viewer"`.

### Roles

Whichever code a guest enters at login determines their role for that
session (entering a different code later re-assigns it):

| Role | Can do |
|---|---|
| **admin** | Everything: create/rename/delete/pin albums, set covers, upload, delete any photo, grant access (share codes). |
| **participant** | Upload photos/videos, view. Can't manage albums or delete other people's photos. |
| **viewer** | Read-only: view and save/download, nothing else. |

Enforced in both `firestore.rules` and `storage.rules` (not just hidden in
the UI) — see the `canEdit()`/`isAdmin()` helpers in those files.

## One-time setup

1. **Create a Firebase project** at https://console.firebase.google.com.
2. **Upgrade to the Blaze (pay-as-you-go) plan.** Cloud Storage for Firebase
   requires it even for the free-tier quota (5GB storage / 1GB per day
   download). You will not be charged unless you exceed the free quota — see
   the cost note below.
3. **Enable Authentication → Sign-in method → Anonymous.**
4. **Enable Firestore** (production mode, any region close to your guests).
5. **Enable Storage.**
6. **Register a Web App** (Project settings → General → Your apps → Web) and
   copy the config object into `js/firebase-config.js`, replacing the
   `REPLACE_ME` placeholders.
7. **Seed the event document.** In the Firestore console, create a document
   at `events/mallorca-wedding` (or whatever `EVENT_ID` you set in
   `js/firebase-config.js`) with fields:
   - `name` (string) — e.g. `"Pau & Sofia"`
   - `adminCode` (string) — e.g. `"PAUSOFIA-ADMIN"` — give this to the couple
     and yourself only.
   - `participantCode` (string) — e.g. `"PAUSOFIA26"` — the one you print on
     invitations for guests who'll upload photos.
   - `viewerCode` (string) — e.g. `"PAUSOFIA-VIEW"` — for people who should
     only browse (e.g. family who couldn't attend).
8. **Deploy Firestore/Storage rules and hosting** (requires the
   [Firebase CLI](https://firebase.google.com/docs/cli)):
   ```
   npm install -g firebase-tools
   firebase login
   # replace REPLACE_ME in .firebaserc with your real project id first
   firebase deploy
   ```
   Or run locally without deploying anything:
   ```
   npx http-server .
   ```

## Cost note

With Blaze, everything stays free until you exceed: 1GiB Firestore storage,
50k reads/20k writes per day, 5GB Storage, 1GB/day Storage download, and
10GB/month Hosting transfer. For a single wedding's worth of photos this is
very unlikely to be exceeded; if it is, overage is billed per-GB
(~$0.026/GB-month storage, ~$0.12/GB egress) rather than jumping to a fixed
monthly plan.

## Media handling

Photos are resized (longest side capped at 2000px) and re-encoded to JPEG
client-side before upload (`js/media.js`), which cuts Storage usage
dramatically for phone camera photos — see it happen live as a
"Compressing…" status in the upload panel. Videos are **not** re-encoded:
doing that in-browser needs a heavy decoder (e.g. ffmpeg.wasm, tens of MB)
that this no-build vanilla-JS app doesn't bundle, so videos upload as-is.

## Guest flow

1. Share the login link (from Profile → Invite links, or just the site URL)
   plus the appropriate code from step 7 above for who you're inviting.
2. Guest enters their name + the code once; from then on the browser stays
   signed in with the role that code grants.
3. Home shows pinned albums; Albums lists everything. Admins create/rename/
   pin/delete albums and set covers (from a photo's "Set Cover" action);
   admins and participants upload photos/videos (camera or gallery) and
   view full-screen; viewers can only view and save/download. Profile shows
   the guest's role as a badge, and only admins see "Invite links"/"Manage
   members".

## Security model

Within a role tier, guests are trusted with each other's content (e.g. any
participant can add photos to any album, not just their own) — appropriate
for a small guest list, not a multi-tenant product. The role boundaries
themselves (admin vs participant vs viewer) *are* enforced server-side in
`firestore.rules` / `storage.rules`, not just hidden in the UI. The one
soft spot: a guest's own `role` field is written by the (trusted) client
after it validates the entered code, so a guest who opens devtools could
technically self-assign a higher role — same trust model as the rest of
this app, see the comment on `canEdit()` in `firestore.rules`.
