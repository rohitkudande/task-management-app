# Task Management App

## Project Overview
This is a scalable REST API with JWT Authentication and Role-Based Access Control (RBAC).
It includes:

- User Registration & Login
- JWT Authentication
- Role-based access (Admin & User)
- CRUD APIs for Tasks
- Input validation & error handling
- API versioning
- Basic React frontend integration

---

## Tech Stack

### Backend
- Node.js
- Express.js
- MySQL
- JWT (Authentication)
- bcrypt (Password hashing)

### Frontend
- React.js
- Axios

---

## Project Structure

task-management-app/
│
├── backend/
│ ├── controllers/
│ ├── routes/
│ ├── middleware/
│ ├── models/
│ └── server.js
│
├── frontend/
│ ├── src/
│ └── package.json



---

## Authentication

- Passwords hashed using bcrypt
- JWT token generated on login
- Protected routes require Bearer Token
- Role-based middleware implemented

---

## API Endpoints

### Auth APIs
- POST /api/v1/auth/register
- POST /api/v1/auth/login

### Task APIs
- GET /api/v1/tasks
- POST /api/v1/tasks
- PUT /api/v1/tasks/:id
- DELETE /api/v1/tasks/:id

---

## Setup Instructions

### 1.Clone Repository

git clone https://github.com/rohitkudande/task-management-app.git

### 2.Backend Setup

cd backend
npm install
npm start


### 3.Frontend Setup


---

## Database

- MySQL
- Schema included in `/database/schema.sql`

---

## API Documentation

Swagger / Postman collection included in repository.

---

## Security Practices

- Password hashing using bcrypt
- JWT authentication
- Role-based access middleware
- Input validation
- Proper error handling

---

## Scalability Note

The project follows a modular architecture:
- Separate controllers, routes, middleware
- Versioned APIs (`/api/v1`)
- Can be extended into microservices
- Can integrate Redis for caching
- Docker-ready structure

---

## Author
Rohit Kudande
