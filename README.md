# Netplix Clone (React + Firebase + Firestore)

A full Netflix-style clone built with React and Vite, with Firebase Authentication and Firestore persistence.

## Features

- Email/password and Google sign-in
- Protected app routes
- Multi-profile support
- Netflix-like home screen with hero banner and content rows
- Search across titles, genres, and descriptions
- My List per profile (saved to Firestore)
- Watch history / continue watching per profile (saved to Firestore)
- Trailer modal playback
- Responsive layout for desktop and mobile

## Tech Stack

- React + Vite
- React Router
- Firebase Auth
- Firestore

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create environment file:

```bash
copy .env.example .env
```

3. Fill in your Firebase values in `.env`.

4. Start development server:

```bash
npm run dev
```

## Firebase Setup

1. Create a Firebase project.
2. Enable Authentication providers:
	- Email/Password
	- Google
3. Create a Firestore database (Production or Test mode).
4. Add a web app in Firebase Console and copy config values into `.env`.

## Build

```bash
npm run build
npm run preview
```

## Production Firebase On GitHub Pages

Use GitHub repository secrets so Firebase config is injected only during the build:

1. Open repository secrets:
- `Settings` -> `Secrets and variables` -> `Actions` -> `New repository secret`
2. Create these secrets exactly:
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
3. Push to `main` (or re-run the `Deploy To GitHub Pages` workflow).
4. Verify the live site:
- `https://dross7278-star.github.io/search-engine/`

If secrets are missing, the app still runs in local demo mode (fallback) so the UI remains usable.

## Save To Main GitHub Branch

Run from project root:

```bash
git init
git branch -M main
git add .
git commit -m "feat: build netflix clone with firebase auth and firestore"
git remote add origin <YOUR_GITHUB_REPO_URL>
git push -u origin main
```

If `origin` already exists, replace the remote URL:

```bash
git remote set-url origin <YOUR_GITHUB_REPO_URL>
git push -u origin main
```
