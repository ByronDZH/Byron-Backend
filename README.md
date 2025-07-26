# Byron's Backend API

A Node.js + Express + MongoDB backend API to manage users and their novel collections.
Supports user authentication and CRUD operations on novels owned by each user.

---

## Features

* User registration and login with JWT authentication
* Users can save, update, fetch, and delete their own novels
* Clean RESTful API design with route prefixing
* Health check endpoint to keep the service alive
* MongoDB for data persistence

---

## Base URL

```
https://byron-backend.onrender.com/Byron-Backend
```

---

## API Endpoints Overview

### Users

* **POST** `/users/register` — Register a new user
* **POST** `/users/login` — Authenticate and receive a JWT token

### Novels (protected by JWT)

* **GET** `/novels` — Get all novels for the authenticated user
* **POST** `/novels` — Create a new novel for the user
* **GET** `/novels/:id` — Get a specific novel by ID
* **PUT** `/novels/:id` — Update a novel by ID
* **DELETE** `/novels/:id` — Delete a novel by ID

### System

* **GET** `/system/ping` — Health check endpoint (returns "Pong! Service is running.")

---

## Data Model Enums

### Novel `status` field values

* `reading`
* `finished`
* `abandoned`
* `on-hold`
* `dropped`

---

## Example JSON Payloads

### User Model

```json
{
  "username": "byron123",
  "password": "yourSecurePassword"
}
```

> Note: Password should be sent plain here but is hashed on the server before storage.

---

### Novel Model

```json
{
  "title": "Solo Leveling",
  "author": "Chugong",
  "status": "reading",
  "chapters": 34,
  "totalChapters": 270,
  "notes": "MC is busted later on"
}
```

> Note: The `userId` is automatically assigned on the server side from the authenticated user’s ID.

## Data Model Enums

### Novel `status` field values

* `reading`
* `finished`
* `abandoned`
* `on-hold`
* `dropped`

---

## Notes

* Novels belong to a user, linked via `userId` (MongoDB ObjectId)
* User documents contain only `username` and hashed `password`
* All novel endpoints require a valid JWT token in the `Authorization` header:
  `Authorization: Bearer <token>`
* CORS is currently open to all origins
* Passwords are hashed before storage
* MongoDB free tier may cause cold start delays on first request

---
