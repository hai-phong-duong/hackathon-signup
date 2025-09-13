# 🌿 HackAdmin Dashboard

A modern full-stack admin dashboard for managing hackathon data, built with **React**, **Tailwind CSS**, and **Express.js**. 

---

## 🔧 Features

-   JWT Authentication
-   Role-Based Access
-   Admin Dashboard with hackathon analytics 
-   User-side customizable UI
-   Powered by Vite + React 
-   Express.js + MongoDB for custom RESTful API

--- 

The following section is more of a blog about what I learned regarding JWT and authentication ideas. 
This project was mostly a self-driven learning opportunity for me.
**You don't have to read it to use the dashboard.**

## 🔐 JWT Authentication & Session Handling

This hackathon sign-up page implements a robust authentication and authorization system using JSON Web Tokens (JWT).

### Why use access versus refresh tokens?

-   Access Tokens are short-lived and used to authenticate API requests, such as fetching hackathon analytics or user data.
-   Refresh Tokens are long-lived and securely stored to issue new Access Tokens without requiring the user to log in again.

This dual-token approach ensures that:

-   Unauthorized users can’t access protected content (e.g., viewing user dashboards without logging in).
-   Regular users cannot access admin-only routes.

### So how do refresh tokens work with access tokens?

-   When an Access Token nears expiration, a Refresh Token is used to  issue a new Access Token.
-   Refresh Tokens are rotated after every use to prevent replay attacks (i.e., preventing someone from reusing a stolen token).
        - (side note: you can use Postman to manually send a stolen token, this was fun to test lol).

### How does token rotation work?

-   Refresh tokens are stored server-side in a whitelist (this is implemented as a separate Mongo collection).
-   Upon successful refresh, (1) a new Access Token and a new Refresh Token are generated and (2) the old Refresh Token is removed from the whitelist.
-   If a token is reused, missing, or invalid, (1) the session is terminated and (2) the user is automatically logged out and redirected to the login screen.
