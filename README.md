# Mallorca Wedding — Photo Album

A small phone-sized web app for a wedding party to share photos and videos
into shared albums. Static HTML/CSS/JS (no build step) backed by Firebase
(Auth, Firestore, Storage, Hosting).

## Architecture

- Plain HTML pages, one per screen (`index.html`, `albums.html`, `album.html`, …).
- `js/firebase.js` initializes the Firebase SDK (loaded from the `gstatic.com`
  CDN as ES modules — no bundler needed).
- `js/auth.js` — simplified guest sign-in: enter a name, get signed in
  anonymously via Firebase Auth so uploads can be attributed to that name.
  No access codes, no roles — every guest who has the link has equal access.
- `js/data.js` — Firestore/Storage helpers (albums, photos, guests).
- Data model, all under a single event document (see `EVENT_ID` in
  `js/firebase-config.js`):
  - `events/{eventId}` — event info.
  - `events/{eventId}/albums/{albumId}` — album name, cover, `pinned`,
    photo/video counts.
  - `events/{eventId}/albums/{albumId}/photos/{photoId}` — one per uploaded file.
  - `events/{eventId}/guests/{uid}` — one per guest who signed in, with `name`.

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
   `js/firebase-config.js`) with a `name` field, e.g. `"Pau & Sofia"`.
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

1. Share the login link (from Profile → Invite links, or just the site URL).
2. Guest enters their name once; from then on the browser stays signed in.
3. Home shows pinned albums; Albums lists everything. Any guest can create/
   rename/pin/delete albums, set covers, and upload/delete photos and videos.

## Security model

Any signed-in guest is trusted with any other guest's content (e.g. anyone
can add photos to any album, rename it, or delete a photo someone else
uploaded) — appropriate for a small, invite-only guest list, not a
multi-tenant product. The only real gate is knowing the link: `firestore.rules`
/ `storage.rules` require the user to be signed in (anonymous auth is enough)
but otherwise don't distinguish between guests.
