# MERN Stack JWT Authentication Demo

A lightweight, demonstration-focused full-stack web application showcasing modern user authentication using the **MERN Stack** (MongoDB, Express, React, Node.js), secure password hashing, and Client-Side Protected Routing.

---

## 🚀 Features

* **User Registration & Secure Hashing:** Frontend captures credentials and forwards them to Node/Express. Passwords are safely hashed using `bcrypt` before storage.
* **JSON Web Tokens (JWT):** Generates and returns stateless user identification tokens securely upon authenticating.
* **Token Lifecycle Management:** Client stores tokens in `localStorage` for seamless continuous user persistence.
* **Route Protection Middleware:** Express interceptor verifying incoming `Authorization: Bearer <token>` requests.
* **Vite Native Reverse Proxy:** Frontend acts on relative endpoints (`/api/*`), bypassing browser CORS issues completely.
* **React Router Guarding:** Custom client-side `<ProtectedRoute />` wrapper kicks unauthenticated sessions back to the landing page (`/`).
* **Premium Custom UI Toasts:** Animated, glassmorphic success and error indicators styled using Tailwind CSS that dismiss themselves after 2 seconds.

---

## 🛠️ Tech Stack

### Frontend
* **React** (via Vite)
* **React Router DOM** (Client-side routing)
* **Axios** (HTTP client requests)
* **Tailwind CSS** (Modern utility-first styling)

### Backend
* **Node.js & Express** (Server framework)
* **jsonwebtoken** (Signing and verifying access tokens)
* **bcrypt** (Password hashing)
* **dotenv** (Environment variable insulation)

---

## 📦 Project Structure

```text
Auth_Test_App/
├── backend/
│   ├── middleware/
│   │   └── authentication.js   # JWT interception logic
│   ├── .env                    # Environmental variables (Secret Keys)
│   └── server.js               # Entry point (Loads dotenv first!)
└── frontend/
    ├── src/
    │   ├── components/
    │   │   └── ProtectedRoute.jsx # Client router guardian wrapper
    │   ├── App.jsx             # React Route declarations
    │   ├── Profile.jsx       # Protected page view with auto-expiring toasts
    │   ├── Login.jsx           # User Session Entry form
    │   └── Register.jsx        # Registration form with immediate auto-login
    └── vite.config.js          # Port proxy settings mapping backend access