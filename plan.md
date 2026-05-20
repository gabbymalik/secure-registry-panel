# Implementation Plan - Auth & Admin Panel (Client-Side)

Build a signup/login flow and an admin dashboard to view registered users. 

**Note: This implementation uses `localStorage` for data persistence as no backend/database is available in this environment.**

## Scope & Non-Goals
- **Goals**: 
    - Create Account (Sign Up) page.
    - Login page.
    - Admin Panel (protected route) to view a list of registered users.
    - "Admin-only" access simulation (hardcoded admin credentials or specific flag).
- **Non-Goals**: 
    - Real-world security (passwords will be stored in plain text in localStorage).
    - Email verification or password recovery.
    - Real database/Supabase integration.

## Assumptions
- The user is the only one who should access the Admin Panel. We will use a "special" account or a specific hardcoded check to identify the user as the admin.
- Data is stored in `localStorage` under a key like `app_users`.

## Affected Areas
- `src/App.tsx`: Routing and state management.
- `src/pages/`: New directory for Signup, Login, and Admin components.
- `src/components/`: Reusable UI components from the existing library.

## Phases

### Phase 1: Setup & Routing
- Install `react-router-dom` if not present (check package.json).
- Configure basic routing in `App.tsx`: `/signup`, `/login`, `/admin`, and `/`.
- **Owner**: `frontend_engineer`

### Phase 2: Authentication Logic (Mock)
- Create a custom hook or utility for `localStorage` persistence.
- Define the user schema: `id`, `email`, `password`, `name`, `isAdmin`.
- Create a default admin user in `localStorage` if it doesn't exist.
- **Owner**: `frontend_engineer`

### Phase 3: Signup & Login Pages
- Build the **Sign Up** page:
    - Form to capture name, email, password.
    - Validate and save to `localStorage`.
    - Redirect to Login.
- Build the **Login** page:
    - Authenticate against `localStorage`.
    - Store "current user" session in `localStorage` or state.
    - Redirect to `/admin` if the user is the admin.
- **Owner**: `frontend_engineer`

### Phase 4: Admin Panel
- Create the **Admin Panel** component:
    - Protected route check (if not admin, redirect to login).
    - Table displaying all users from `localStorage`.
    - Simple logout button.
- **Owner**: `frontend_engineer`

### Phase 5: Polishing & Testing
- Add styling using existing Tailwind/UI components.
- Ensure the "Admin Only" restriction works.
- **Owner**: `quick_fix_engineer`

## Open Questions
- What credentials should the "Admin" use? (Suggestion: `admin@example.com` / `admin123`).
