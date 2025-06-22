# 📚 Byron's Backend API

This is the backend built in Node.js + Express + MongoDB.
No auth at the moment — just clean data.

---

## 🌍 Base URL + /Prefix

```bash
https://byron-backend.onrender.com/Byron-Backend
```

---

## 📖 Novels API

### ➕ Create a Novel

**POST** `/novels`

```json
{
  "title": "Solo Leveling",
  "author": "Chugong",
  "status": "reading",
  "chapters": 34,
  "totalChapters": 270,
  "approximateDateRead": "2023-06-01",
  "originalLanguage": "Korean",
  "genre": "Action",
  "url": "https://example.com",
  "notes": "MC is busted later on"
}
```

✅ **Response**

```json
{
  "_id": "123abc...",
  "title": "Solo Leveling",
  "author": "Chugong",
  "status": "reading",
  "chapters": 34,
  "totalChapters": 270,
  "approximateDateRead": "2023-06-01T00:00:00.000Z",
  "originalLanguage": "Korean",
  "genre": "Action",
  "url": "https://example.com",
  "notes": "MC is busted later on",
  "createdAt": "2025-06-21T00:00:00.000Z",
  "updatedAt": "2025-06-21T00:00:00.000Z"
}
```

---

### 📄 Get All Novels

**GET** `/novels`

---

### 📘 Get One Novel

**GET** `/novels/:id`

---

### ✏️ Update a Novel

**PUT** `/novels/:id`

```json
{
  "status": "finished",
  "chapters": 270,
  "notes": "Insane ending"
}
```

---

### ❌ Delete a Novel

**DELETE** `/novels/:id`

✅ **Response**

```json
{ "message": "Novel deleted successfully" }
```

---

## 🧙 Guild Members API

### ➕ Create a Member

**POST** `/members`

```json
{
  "name": "Zaltor",
  "rank": "Officer",
  "joinDate": "2024-05-01",
  "status": "active",
  "notes": "Main DPS in raids"
}
```

✅ **Response**

```json
{
  "_id": "456def...",
  "name": "Zaltor",
  "rank": "Officer",
  "joinDate": "2024-05-01T00:00:00.000Z",
  "status": "active",
  "notes": "Main DPS in raids",
  "createdAt": "2025-06-21T00:00:00.000Z",
  "updatedAt": "2025-06-21T00:00:00.000Z"
}
```

---

### 📄 Get All Members

**GET** `/members`

---

### 📘 Get One Member

**GET** `/members/:id`

---

### ✏️ Update a Member

**PUT** `/members/:id`

```json
{
  "status": "active",
  "notes": "Promoted to Officer"
}
```

---

### ❌ Delete a Member

**DELETE** `/members/:id`

✅ **Response**

```json
{ "message": "Member deleted successfully" }
```

---

## ✅ Status Enums

* **Novel Status**: `reading`, `finished`, `abandoned`, `dropped`, `on-hold`
* **Language**: `Chinese`, `Japanese`, `Korean`, `English`, `Other`, `Unknown`
* **Member Rank**: `Leader`, `Officer`, `Member`, `Recruit`
* **Member Status**: `active`, `inactive`
