# EcoLens Backend

This folder contains the Firebase backend for the EcoLens application.

---

## Tech Stack

- Firebase Authentication (Anonymous + future Email login)
- Firestore (NoSQL database)
- Cloud Functions (Node.js)
- Gemini 1.5 Flash (AI material detection)
- Firebase Emulator Suite (local development)

---

## Architecture Overview

The backend acts as a **secure AI inference layer**.

Flow:
1. User signs in (anonymous by default)
2. Client sends scan request to Cloud Function
3. Cloud Function:
   - Verifies authentication
   - Calls Gemini API
   - Applies fallback logic if AI fails
   - Stores scan result in Firestore
   - Awards points to user
4. Result is returned to client

---

## Core Cloud Function: `createScan`

### Input
- `imageUrl` (string)
- Authenticated Firebase user

### Output
- `material`
- `recyclable` (boolean)
- `instruction`
- `pointsAwarded`

---

## Why AI is Server-Side

- Protects Gemini API key
- Prevents client abuse
- Allows easy model upgrades
- Centralized error handling

---

## Abuse Prevention

- Anonymous auth enabled
- Rate limiting per user
- Firestore security rules enforced

---

## Emulator Support

Supported emulators:
- Authentication
- Firestore
- Cloud Functions

Run locally using:
```bash
firebase emulators:start


Built and iterated during EcoLens hackathon development.