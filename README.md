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
