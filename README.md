# 🌿 HackAdmin Dashboard

A modern full-stack admin dashboard for managing hackathon data, built with **React**, **Tailwind CSS**, and **Express.js**. Features a collapsible sidebar, live countdown, and role-based access control.

---

## 🔧 Features

-   🔐 JWT Authentication (more details below!)
-   👤 Role-Based Access (:nerd:)
-   📊 Admin Dashboard with hackathon analytics (muchos numeros)
-   💅 Styled with Tailwind CSS (soft forest green theme + dark mode, trust me its a vibe fr)
-   ⚡ Powered by Vite + React (heck yeah)

---

## 🔐 JWT Authentication & Session Handling
This hackathon sign-up page implements a robout authentication and authorization system using JSON Web Tokens (JWT).

### ✅ Access & Refresh Tokens
- Access Tokens are short-lived and used to authenticate API requests, such as fetching hackathon analytics or user data.
- Refresh Tokens are long-lived and securely stored to issue new Access Tokens without requiring the user to log in again.

This dual-token approach ensures that:
- Unauthorized users can’t access protected content (e.g., viewing user dashboards without logging in).
- Regular users cannot access admin-only routes.

### 🌀 Refresh Flow
- When an Access Token nears expiration, a Refresh Token is used to seamlessly issue a new Access Token — the user doesn’t notice.
- Refresh Tokens are rotated after every use to prevent replay attacks (i.e., preventing someone from reusing a stolen token).

### 🧠 Token Rotation & Security
- Refresh tokens are stored server-side in a whitelist.
- Upon successful refresh, (1) a new Access Token and a new Refresh Token are generated and (2) the old Refresh Token is removed from the whitelist.
- If a token is reused, missing, or invalid, (1) the session is terminated and (2) the user is automatically logged out and redirected to the login screen.

This token chaining ensures that only valid sessions are maintained — any misuse or replay is immediately cut off.

### 💥 Backend Crash Resilience 
- If the backend crashes or restarts (clearing the token whitelist), the frontend
(1) attempts to refresh the token, (2) detects the failure and (3) logs the user out gracefully without leaving a blank or broken screen.
---

## ✨ License

MIT — use freely, credit appreciated!
