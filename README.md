# 🚀 NestJS Backend Assessment

This project is developed as part of the **Code Inbound LLP SDE Backend Internship Assessment**.  
It includes user authentication, JWT-based protected routes, CRUD operations, PostgreSQL database integration, and Swagger API documentation.

---

## 🛠 Tech Stack

| Technology | Purpose |
|-----------|---------|
| NestJS | Backend framework |
| PostgreSQL | Database |
| TypeORM | ORM for DB operations |
| JWT Auth | Authentication |
| Class Validator | Input validation |
| Jest | Unit testing |
| Swagger | API documentation |

---

## 📦 Features

- User registration & login
- Password hashing using bcrypt
- JWT-based authentication
- Protected routes
- CRUD operations for tasks
- Input validation & proper error handling
- Swagger UI API documentation
- Unit tests for main services
- Postman collection included

---

## 📁 Folder Structure

src/
├── auth/ # Authentication (JWT, Login, Guards, Strategy)
├── users/ # User module (entity, controller, service)
├── tasks/ # Task CRUD operations
├── app.module.ts # App root module
└── main.ts # Application entry point



---

## ⚙️ Environment Variables

Create a `.env` file in the project root:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_NAME=nest_assessment
JWT_SECRET=super_secret_key
JWT_EXPIRES_IN=1h
PORT=3000


# Install dependencies
npm install

# Start development server
npm run start:dev


🔐 Authentication Workflow

Register a user
POST /users/register

Login to get JWT token
POST /auth/login

Use JWT token with:

Authorization: Bearer <TOKEN>

📝 API Documentation

Swagger UI available at:

👉 http://localhost:3000/api/docs

📌 Available Endpoints
👤 User

Method	Endpoint	Auth	Description

POST	    /users/register	  ❌	     Create account
POST	    /auth/login	      ❌	     Login and get token
GET	      /users/me	        ✅	     Get logged-in user


🗂 Tasks

Method	Endpoint	Auth	Description

POST	    /tasks	          ✅	     Create task
GET	      /tasks	          ✅	     List tasks
GET	      /tasks/:id	      ✅	     Retrieve task
PATCH	    /tasks/:id	      ✅	     Update task
DELETE	  /tasks/:id	      ✅	     Delete task

🧪 Running Tests

npm run test

📤 Postman Collection

A Postman collection file (internship.postman_collection.json) is included for easy testing.

