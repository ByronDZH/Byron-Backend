# Project Documentation [Byron's Backend API]

This is the backend built in Node.js + Express + MongoDB.
No auth at the moment — just clean data.

---

## 🌍 Base URL + /Prefix

```bash
https://byron-backend.onrender.com/Byron-Backend
```

---

## Project Structure

middleware/
└── auth.js
// What This Middleware Does
// Looks for a Bearer <token> in the Authorization header
// Verifies the token using your secret
// If valid, adds req.user = { id, username }
// If invalid, sends a 401 Unauthorized response

node_modules/

routes/
└── novelRoutes.js
└── userRoutes.js
└── systemRoutes.js         // Health check / keep-alive endpoint

services/
└── user/
    ├── userModel.js        // Mongoose schema
    ├── userLogicDB.js      // DB logic (register, login, etc.)
    └── userController.js   // Request handlers (Express controllers)
└── novel/
    └── novelController.js
    └── novelLogicDB.js
    └── novelModel.js

.env (.gitignore)
Documentation.md
package-lock.json
package.json
README.md
server.js

---

## Keep-Alive Ping Endpoint ✅

Render spins down unused web services
MongoDB Atlas might close idle connections
First request = SLOW 🐢

GET https://byron-backend.onrender.com/Byron-Backend/system/ping

In your frontend app, you can:

Call /ping on startup, on login screen or via a background setInterval every 5–10 minutes

Use setInterval(() => fetch('/ping'), 5 * 60 * 1000) every 5 minutes to keep it warm

This won’t fully eliminate the cold start, but it reduces perceived delay for actual users.

---

## 🧠 **Core Concept: User-Novel Ownership**

Right now, your backend has a collection of novels and guild members, but there's no concept of "ownership" — any client can access all data. You want to pivot toward a model where:

* **Each user has their own collection of saved novels.**
* Only that user can access or modify their data.

This moves your app toward:

* A **multi-user system**
* A **secured API** where data access is scoped to the authenticated user
* Possibly enabling things like user profiles, favorites, and personalized history down the line

---

## 🏗️ What Changes Conceptually?

### 1. **Introduce a `User` Entity**

* Each user has a unique ID, email/username, password (hashed), etc.
* Users can register, log in, and get a token (JWT) for authentication.

### 2. **Link `Novels` to `Users`**

* Each novel document now **belongs to one user**.
* You’ll likely add a `userId` (or `owner`) field to each novel.

Think of it as:

```text
User (1) ────▶ (many) Novels
```

---

## 🔐 Authentication & Authorization

Now that you're introducing users, you’ll also need to secure the API:

* **Authentication**: Validate user identity (e.g., login with JWT)
* **Authorization**: Check that a user owns the resource they're accessing

This ensures:

* A user can't access or edit someone else’s novels.
* Every CRUD action checks the `userId` before proceeding.

---

## 📦 New Data Model Overview

### 🧑 User

* `username`
* `email`
* `password` (hashed)
* `createdAt`, `updatedAt`

### 📘 Novel

* `title`, `author`, `status`, `chapters`, etc.
* `userId` → reference to the `User` who owns this novel
* You could store it as either a `ref` (normalized) or embed (denormalized)

---

## 🔄 API Behavior Changes

### Before:

* `GET /novels` → Returns all novels in the DB
* `POST /novels` → Adds a novel for *anyone*

### After:

* `GET /novels` → Returns **only the novels belonging to the authenticated user**
* `POST /novels` → Saves a novel for **the authenticated user**
* `PUT /novels/:id` → Only allows editing **if the novel belongs to the user**
* `DELETE /novels/:id` → Same access control

---

## 🚧 Implications for Your Code

You’ll need to add:

1. ✅ A **User model** and **auth routes** (`/auth/register`, `/auth/login`)
2. ✅ A **JWT-based auth middleware** to protect routes
3. ✅ Novel routes that check `req.user.id` before accessing/modifying data

---

## 🔮 Optional Future Enhancements

* **Profile customization**: bio, avatar, reading goals
* **Sharing**: public novel lists or read-only sharing links
* **Stats**: how many novels read, time spent, etc.
* **Cloud sync**: allow users to sync across devices

---

## 🧭 Final Thoughts Before Coding

This architectural change:

* Makes your backend **multi-tenant** (each tenant = a user)
* Requires thinking in terms of **ownership** and **security**
* Opens the door to a more polished app with user-specific experiences

---

---

---

Collecting workspace informationHere’s a review of your backend structure and code based on the files you provided:

### ✅ Project Structure

- Follows a clear MVC pattern: routes, services, middleware
- All main features (auth, user, novel, health check) are separated and modular.

---

### ✅ Core Functionality

- **User registration & login**: Handled in userController.js and userLogicDB.js
- **JWT authentication**: Implemented in auth.js, used to protect novel routes.
- **Novel CRUD**: All endpoints are protected and scoped to the authenticated user in novelRoutes.js and novelController.js.
- **Health check**: Available at `/system/ping` via systemRoutes.js.

---

### ✅ Models

- **User**: Only stores `username` and hashed `password` (`services/user/userModel.js`).
- **Novel**: Includes `userId` for ownership (`services/novel/novelModel.js`), but see below for a fix.

---

### ⚠️ Suggestions

#### 1. **No .env Example**
Consider adding a `.env.example` file with keys like:
```
DATABASE=mongodb+srv://...
PORT=3000
PREFIX=/Byron-Backend
JWT_SECRET=your_jwt_secret
```

#### 2. **General Recommendations**
- Remove sensitive info from .env before pushing.
- Add a license and fill out `author`/`description` in package.json if open source.
- Consider adding basic tests in the future.

---
