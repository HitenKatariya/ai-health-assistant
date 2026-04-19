# AI Healthcare Assistant

Full-stack healthcare platform with:

- User AI consultation web app
- Nearby hospital discovery and directions
- Appointment booking flow
- Hospital-facing dashboard web app
- Node.js + Express + MongoDB backend API

This repository is a multi-app workspace, not a single frontend.

## Project Architecture

### Applications

1. User app (`User`)
- AI symptom conversation (Groq)
- Emergency symptom detection
- Nearby hospitals page
- User authentication and consultation history
- Appointment booking

2. Hospital app (`Hospital`)
- Hospital registration/login
- Manage hospital profile and hospital-side workflows
- Appointment operations via backend APIs

3. Backend API (`Hospital/backend`)
- Auth APIs for users and hospitals
- Hospital registry and nearby search
- Chat session/history APIs
- Appointment APIs for both user and hospital sides

### High-Level Flow

1. User talks to AI in the User app.
2. User can open Nearby Hospitals and search by live location.
3. User books appointment with a selected hospital.
4. Hospital app consumes the same backend to view and update appointments.

## Repository Structure

```text
ai-health-assistant/
	User/                # User-facing React app
	Hospital/            # Hospital-facing React app
		backend/           # Express + MongoDB backend API
	DEPLOYMENT.md        # Render + Vercel deployment steps
	render.yaml          # Render blueprint config
```

## Tech Stack

### Frontend
- React 19 + Vite
- React Router
- React Markdown
- Three.js + @react-three/fiber + @react-three/drei (User app visual layer)

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT authentication
- bcryptjs password hashing

### Integrations
- Groq API (AI responses)
- Browser Geolocation
- Google Maps directions (client-side link out)

## Key Features

### User App
- AI-guided symptom assessment conversation
- Emergency cue detection and urgent prompts
- Nearby hospital discovery with distance sorting
- Appointment booking with optional chat context
- Multi-language support (English, Hindi, Gujarati)

### Hospital App
- Hospital onboarding and login
- Hospital data management
- Appointment status handling (pending, confirmed, completed)

### Backend
- User auth: register, login, profile
- Hospital auth: register, login
- Chat session lifecycle and history persistence
- Nearby hospital APIs
- Appointment APIs for both user and hospital roles

## Recent UX Fixes

- Added loading spinner state when user clicks "Find Nearby Hospitals" so long navigation/data preparation is visible.
- Corrected open/closed badge logic so unknown operating status is not incorrectly shown as "Closed".

## Prerequisites

- Node.js 18+
- npm 9+
- MongoDB Atlas (or compatible MongoDB)
- Groq API key

## Local Development Setup

### 1. Clone

```bash
git clone https://github.com/HitenKatariya/ai-health-assistant.git
cd ai-health-assistant
```

### 2. Install Dependencies

```bash
cd User
npm install

cd ../Hospital
npm install

cd backend
npm install
```

### 3. Configure Environment Variables

Create these files:

1. `Hospital/backend/.env`

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>/<db>?retryWrites=true&w=majority
PORT=3001
NODE_ENV=development
JWT_SECRET=replace_with_a_strong_secret
JWT_EXPIRE=30d
CORS_ORIGIN=http://localhost:5173,http://localhost:5174
```

2. `User/.env`

```env
VITE_API_BASE_URL=http://localhost:3001
VITE_GROQ_API_KEY=your_groq_api_key
```

3. `Hospital/.env`

```env
VITE_API_BASE_URL=http://localhost:3001
```

Notes:
- Frontends also accept `VITE_API_URL` as fallback.
- Default frontend API fallback is `http://localhost:3001`.

### 4. Run Services (3 terminals)

1. Backend

```bash
cd Hospital/backend
npm run dev
```

2. User app

```bash
cd User
npm run dev -- --port 5173
```

3. Hospital app

```bash
cd Hospital
npm run dev -- --port 5174
```

Open:

- User app: `http://localhost:5173`
- Hospital app: `http://localhost:5174`
- Backend: `http://localhost:3001`

## Scripts

### User (`User/package.json`)
- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run lint`

### Hospital (`Hospital/package.json`)
- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run lint`

### Backend (`Hospital/backend/package.json`)
- `npm run dev` (nodemon)
- `npm start`

## API Overview

Base URL: `http://localhost:3001`

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `PUT /api/auth/profile`
- `PUT /api/auth/password`
- `DELETE /api/auth/account`

### Hospitals
- `POST /api/hospitals/register`
- `POST /api/hospitals/login`
- `GET /api/hospitals`
- `GET /api/hospitals/:id`
- `POST /api/hospitals/nearby`

### Chat
- `POST /api/chat/sessions`
- `GET /api/chat/sessions`
- `GET /api/chat/sessions/:sessionId`
- `POST /api/chat/sessions/:sessionId/messages`
- `POST /api/chat/sessions/:sessionId/hospitals`
- `PUT /api/chat/sessions/:sessionId/end`

### Appointments
- User routes:
	- `POST /api/appointments`
	- `GET /api/appointments`
	- `GET /api/appointments/:id`
- Hospital routes:
	- `GET /api/appointments/hospital`
	- `PATCH /api/appointments/hospital/:id/status`

## Deployment

Production deployment instructions are documented in `DEPLOYMENT.md`.

Current deployment model:
- Backend on Render
- User frontend on Vercel
- Hospital frontend on Vercel

Important production settings:
- Set frontend `VITE_API_BASE_URL` to your Render backend URL.
- Set backend `CORS_ORIGIN` to both Vercel domains (comma-separated).

## Medical Disclaimer

This project is for informational and educational support only. It does not replace professional medical advice, diagnosis, or treatment.

## Troubleshooting

### Nearby hospitals are slow to appear
- Check browser geolocation permission.
- Verify backend connectivity and MongoDB status.
- Confirm frontend `VITE_API_BASE_URL` points to a live backend.

### Hospital shows incorrect closed status
- Ensure hospital `isOpen` data is stored as explicit boolean.
- Unknown status should render without a closed badge.

### CORS errors
- Verify backend `CORS_ORIGIN` includes both frontend origins.
- Restart backend after env changes.

## License

ISC
