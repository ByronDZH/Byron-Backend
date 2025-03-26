# Novel Tracker API

This is a backend service to track and manage novels, including details about the novels, reading progress, notes on power systems, rankings, and more. The service is built using **Node.js**, **Express**, **MongoDB**, and **Mongoose**.

## Table of Contents

1. [Server Information](#1-server-information)
2. [API Endpoints](#2-api-endpoints)
   - [Novels](#novels)
   - [Reading History](#reading-history)
3. [Authentication] (#3-authentication)
4. [Database](#4-database)
5. [Setup and Installation](#5-setup-and-installation)
6. [License](#6-license)

## 1. Server Information

- **Base URL**: `https://byron-backend.onrender.com`
- **Prefix**: `/Byron-Backend`
  
If you face CORS issues or SSL certificate errors, try replacing `https` with `http` in the URL (for local development).

**Example**:  
`http://your-deployed-url.onrender.com/api/v1`

### Environment Variables

- `DATABASE`: MongoDB connection string.
- `PORT`: Port the server will run on (default is 3000).
- `SECRET_KEY`: A key used for JWT authentication (if enabled).

---

## 2. API Endpoints

### Novels

#### Create a New Novel

- **Endpoint**: `POST /api/v1/novels`
- **Description**: Create a new novel record in the database.
- **Body**:

  ```json
  {
      "titulo": "Novel Title",
      "autor": "Author Name",
      "totalCapitulos": 100,
      "genero": "Fantasy",
      "lenguajeOriginal": "Chinese",
      "url": "http://example.com"
  }
  ```

- **Response** (200 OK):

  ```json
  {
      "novel": {
          "_id": "60b704cb915bc54cf0378df2",
          "titulo": "Novel Title",
          "autor": "Author Name",
          "totalCapitulos": 100,
          "genero": "Fantasy",
          "lenguajeOriginal": "Chinese",
          "url": "http://example.com",
          "createdAt": "2025-03-25T12:34:56.789Z",
          "updatedAt": "2025-03-25T12:34:56.789Z"
      }
  }
  ```

#### Get All Novels

- **Endpoint**: `GET /api/v1/novels`
- **Description**: Retrieve all novels in the database.
- **Response** (200 OK):

  ```json
  {
      "novels": [
          {
              "_id": "60b704cb915bc54cf0378df2",
              "titulo": "Novel Title",
              "autor": "Author Name",
              "totalCapitulos": 100,
              "genero": "Fantasy",
              "lenguajeOriginal": "Chinese",
              "url": "http://example.com",
              "createdAt": "2025-03-25T12:34:56.789Z"
          }
      ]
  }
  ```

#### Get a Specific Novel

- **Endpoint**: `GET /api/v1/novels/:id`
- **Description**: Retrieve a single novel by its ID.
- **Response** (200 OK):

  ```json
  {
      "novel": {
          "_id": "60b704cb915bc54cf0378df2",
          "titulo": "Novel Title",
          "autor": "Author Name",
          "totalCapitulos": 100,
          "genero": "Fantasy",
          "lenguajeOriginal": "Chinese",
          "url": "http://example.com"
      }
  }
  ```

#### Update a Novel

- **Endpoint**: `PUT /api/v1/novels/:id`
- **Description**: Update a novel record by ID.
- **Body**:

  ```json
  {
      "titulo": "Updated Title",
      "autor": "Updated Author",
      "totalCapitulos": 120,
      "genero": "Sci-Fi",
      "lenguajeOriginal": "Japanese"
  }
  ```

- **Response** (200 OK):

  ```json
  {
      "novel": {
          "_id": "60b704cb915bc54cf0378df2",
          "titulo": "Updated Title",
          "autor": "Updated Author",
          "totalCapitulos": 120,
          "genero": "Sci-Fi",
          "lenguajeOriginal": "Japanese",
          "url": "http://example.com"
      }
  }
  ```

#### Delete a Novel

- **Endpoint**: `DELETE /api/v1/novels/:id`
- **Description**: Delete a novel by its ID.
- **Response** (200 OK):

  ```json
  {
      "message": "Novel deleted successfully"
  }
  ```

---

### Reading History

#### Create a New Reading History Record

- **Endpoint**: `POST /api/v1/reading-history`
- **Description**: Create a new reading history record for a specific novel.
- **Body**:

  ```json
  {
      "novelId": "60b704cb915bc54cf0378df2",
      "fechaInicio": "2025-03-01T00:00:00.000Z",
      "fechaFin": "2025-03-10T00:00:00.000Z",
      "capitulosLeidos": 10,
      "estado": "finished",
      "comentario": "Really enjoyed this novel!"
  }
  ```

- **Response** (200 OK):

  ```json
  {
      "readingHistory": {
          "_id": "60b704cb915bc54cf0378df3",
          "novelId": "60b704cb915bc54cf0378df2",
          "fechaInicio": "2025-03-01T00:00:00.000Z",
          "fechaFin": "2025-03-10T00:00:00.000Z",
          "capitulosLeidos": 10,
          "estado": "finished",
          "comentario": "Really enjoyed this novel!"
      }
  }
  ```

#### Get All Reading History Records

- **Endpoint**: `GET /api/v1/reading-history`
- **Description**: Retrieve all reading history records.
- **Response** (200 OK):

  ```json
  {
      "readingHistory": [
          {
              "_id": "60b704cb915bc54cf0378df3",
              "novelId": "60b704cb915bc54cf0378df2",
              "fechaInicio": "2025-03-01T00:00:00.000Z",
              "fechaFin": "2025-03-10T00:00:00.000Z",
              "capitulosLeidos": 10,
              "estado": "finished",
              "comentario": "Really enjoyed this novel!"
          }
      ]
  }
  ```

---

## 3. Authentication (Optional)

JWT authentication is currently **disabled**. However, in a production setup, the authentication flow can be enabled by configuring the secret key and using JWT to protect certain routes.

---

## 4. Database

The project uses **MongoDB** for the database, which stores all novel details, reading history, and associated data. The models are structured with Mongoose for easy interaction with the database.

---

## 5. Setup and Installation

### Prerequisites

- Node.js (LTS version)
- MongoDB (either local or a cloud-based instance like MongoDB Atlas)

### Steps to Install

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/novel-tracker-api.git
   cd novel-tracker-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:

   ```bash
   DATABASE=mongodb://your-mongo-db-url
   PORT=3000
   SECRET_KEY=your-jwt-secret-key
   ```

4. Start the server:

   ```bash
   npm start
   ```

---

## 6. License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.
