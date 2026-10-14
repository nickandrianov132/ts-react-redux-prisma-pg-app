
# # Full-Stack Forum App

A scalable, robust Full-Stack application boilerplate built on a modern development stack. The project features a monorepository structure, separating client-side and server-side logic, and provides a production-ready template for a discussion forum with topics, posts, comments, and a flexible polymorphic voting system.

---

## 🛠 Tech Stack

### **Frontend (Client)**
* TypeScript — Strict typing for scalable, self-documenting code.
* React — Component-driven declarative user interface.
* Redux Toolkit & RTK Query — Centralized state management with efficient data fetching, caching, and automatic cache invalidation.

### **Backend (Server)**
* Node.js & Express.js — Lightweight and minimalist web framework for building RESTful APIs.
* Prisma ORM — Type-safe database client and automated migration workflows.
* PostgreSQL — Powerful relational database management system managing production-ready data relations.

---

## 📂 Project Structure

```text
TS React Redux Prisma PG App/
├── client/          # Frontend application (React, Redux, RTK Query)
├── server/          # Backend application (Express, Prisma, PostgreSQL)
└── README.md        # Project documentation
```

---

## 🗄 Database Architecture (Prisma Schema)
The backend data layer is managed using a deeply relational PostgreSQL schema with the following design choices:
    • User: Manages system accounts with strict unique constraints on username and email. Maintains one-to-many relations with topics, posts, comments, and votes.
    • Topic: High-level community discussion boards created by users.
    • Post: Content entries nested within specific topics.
    • Comment: Feedback threads linked directly to posts.
    • Like: A clean, unified polymorphic system handling both LIKE and DISLIKE actions. Enforced by unique composite constraints (@@unique), ensuring a user can submit exactly one vote per unique piece of content (topic, post, or comment).

### 1. Clone the repository
git clone https://github.com/nickandrianov132/ts-react-redux-prisma-pg-app.git
    cd "TS React Redux Prisma PG App"

### 2. Install frontend dependencies
    cd client && npm install

### 3. Install backend dependencies
    cd ../server && npm install

### 4. Environment Configurations (.env)
Configure your environment variables by setting up your local configurations in the respective folders.
    In server/.env:
    DATABASE_URL="postgresql://postgres:yourdb"
    JWT_SECRET="your_jwt_secret"
    In client/.env:
    VITE_API_URL="http://localhost:3001/"


### 5. Initialize the Database (Prisma)
While inside the server directory, run the database migrations to build your tables inside PostgreSQL and generate the underlying TypeScript types for the Prisma client:
    cd server
    npx prisma migrate dev --name init


### 6. Running the Development Servers

Start the API Server (from the server directory):
    cd server
    npm run dev
Start the Frontend App (from the client directory):
    cd client
    npm run dev



