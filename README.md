# Psyrene

Virtual therapy & mental-health support platform — React Native (Expo) frontend + FastAPI backend.

Built to the design system and 17-screen information architecture from the Figma export, covering the full frontend scope of Sprints 1–3 (auth, home, therapist discovery & booking, live session) plus the post-Sprint-3 screens (mood check-in, analytics, chatbot, exercises, records, rewards, financial aid, notifications, profile) on mock/local state.

```
psyrene/
├── mobile/     # React Native (Expo SDK 54) app — all 17 screens
└── backend/    # FastAPI skeleton for the wired screens (auth, therapists, booking, sessions)
```

## Frontend — mobile/

### Run it
```bash
cd mobile
npm install
npx expo start          # press a for Android, i for iOS, or scan the QR in Expo Go
```

Requires Node 18+. Uses Expo Go (SDK 54) — no native build step needed for the demo.

### Stack
- **Expo / React Native** (SDK 54, RN 0.81)
- **React Navigation** — native-stack (`src/navigation/RootNavigator.js`)
- **expo-linear-gradient** for the brand gradients
- **react-native-svg** for the mood charts and mood gauge
- **DM Serif Display** (headings) + **DM Sans** (body) via `@expo-google-fonts`
- **axios** shared client with JWT interceptor (`src/api/client.js`)
- **React Context** for auth (`src/context/AuthContext.js`)

### Structure
```
src/
├── theme/         design tokens (colors, gradients, radius, fonts, shadows)
├── components/    shared UI: Card, Pill, Button, Input, StatusBar, BottomNav,
│                  ScreenHeader, Toast, MoodChart, typography + row helpers
├── navigation/    RootNavigator (native-stack)
├── context/       AuthContext
├── api/           axios client + endpoint helpers (auth/therapist/appointment/session)
└── screens/
    ├── auth/          Welcome · Register · Login
    ├── home/          Dashboard
    ├── moodCheckin/   DailyCheckin
    ├── analytics/     Analytics (Progress)
    ├── chatbot/       AIChat (Serenity AI)
    ├── therapists/    Therapists list · TherapistDetail
    ├── booking/       BookSession
    ├── session/       CallSession (live video UI)
    ├── exercises/     Exercises (animated breathing)
    ├── records/       Records
    ├── rewards/       Rewards
    ├── financialAid/  FinancialAid
    ├── notifications/ Notifications
    └── profile/       Profile
```

### Design system (ported from Figma)
- Palette: warm cream base, sage green, soft teal, warm + lavender accents. Light mode only.
- Typography: DM Serif Display headings, DM Sans body/UI.
- Layout baseline: 390×844 (iPhone standard).
- Soft-edged, uncluttered, generous whitespace.

### Navigation map
See `NAVIGATION.md` for the full screen-to-screen wiring (matches the spec provided).

## Backend — backend/

In-memory FastAPI MVP so the app has real endpoints during development. Replace the
fake stores with SQLAlchemy 2.0 + PostgreSQL + Alembic per the coding-context doc.

```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Interactive docs at `http://localhost:8000/docs`.

### Endpoints (Sprints 1–3)
| Method | Path | Purpose |
|---|---|---|
| POST | `/auth/register` | Role-aware registration → JWT |
| POST | `/auth/login` | Login → access + refresh JWT |
| POST | `/auth/logout` | Logout |
| GET | `/users/me` | Current profile |
| GET | `/therapists` | List + `?specialization=` filter |
| GET | `/therapists/{id}` | Profile detail |
| GET | `/therapists/{id}/availability` | Slots |
| POST | `/appointments` | Book a session |
| GET | `/appointments` | List (`?status=`) |
| PATCH | `/appointments/{id}/cancel` | Cancel |
| POST | `/sessions/{appointment_id}/start` | Start (returns room URL) |
| POST | `/sessions/{id}/join` | Join |
| POST | `/sessions/{id}/end` | End + summary |

### Connecting the app to the backend
In `mobile/src/api/client.js`, set `BASE_URL`:
- iOS simulator: `http://localhost:8000`
- Android emulator: `http://10.0.2.2:8000`
- Physical device (Expo Go): `http://<your-computer-LAN-IP>:8000`

The auth screens currently use the `AuthContext` stubs so the UI is fully navigable offline.
Swap those calls for `authApi.login` / `authApi.register` from the client to go live.

## Notes
- All 15 Figma screens + Sign Up + Login are implemented (17 total).
- Screens 1–8 are the ones intended to wire to FastAPI in Sprints 1–3; the rest run on
  local/mock state as designed.
- Video (`CallSession`) is a faithful UI mock — integrate Daily.co / Agora RN SDK for real calls.
