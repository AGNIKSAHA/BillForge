# 🚀 FreelanceFlow

FreelanceFlow is a full-stack SaaS platform designed to help freelancers
and clients manage projects, track working hours, generate invoices, and
manage payments efficiently.

------------------------------------------------------------------------

# 🧩 Project Overview

FreelanceFlow allows:

-   Freelancers to track billable time
-   Clients to manage projects
-   Automated invoice generation
-   Email notifications
-   Role-based authentication system

------------------------------------------------------------------------

# 🏗 Tech Stack

## Frontend

-   React 19
-   TypeScript
-   Redux Toolkit
-   TanStack Query
-   React Router v7
-   Tailwind CSS
-   Axios

## Backend

-   Node.js
-   Express.js
-   TypeScript
-   MongoDB + Mongoose
-   JWT Authentication
-   Cookie-based Security
-   Nodemailer
-   Passport JWT Strategy

------------------------------------------------------------------------

# 🔐 Authentication System

-   Email Verification
-   Forgot Password Flow
-   Refresh Token stored in database
-   Access Token stored in cookies
-   Role Based Authorization

------------------------------------------------------------------------

# 👥 User Roles

  Role         Permissions
  ------------ ------------------------------------
  Admin        Full access
  Freelancer   Manage projects, timelog, invoices
  Client       View projects, pay invoices

------------------------------------------------------------------------

# 📁 Project Structure

    FreelanceFlow
    │
    ├── backend
    ├── frontend
    └── README.md

------------------------------------------------------------------------

# ⚙️ Installation Guide

## 📌 Clone Repository

    git clone https://github.com/your-username/FreelanceFlow.git

## 📌 Backend Setup

    cd backend
    npm install
    npm run dev

## 📌 Frontend Setup

    cd frontend
    npm install
    npm run dev

------------------------------------------------------------------------

# 🔧 Environment Variables

## Backend `.env`

    PORT=5005
    MONGO_URI=mongodb://127.0.0.1:27017/freelanceflow

    JWT_ACCESS_SECRET=
    JWT_REFRESH_SECRET=

    JWT_ACCESS_EXPIRES=86400
    JWT_REFRESH_EXPIRES=604800

    EMAIL_SERVICE=gmail
    EMAIL_USER=
    EMAIL_PASS=

    CLIENT_URL=http://localhost:5173
    APP_NAME=FreelanceFlow

## Frontend `.env`

    VITE_API_URL=http://localhost:5005/api/v1

------------------------------------------------------------------------

# 🛡 Security Highlights

-   HTTP Only Cookies
-   Refresh Token Rotation
-   Role Based Middleware
-   Input Validation
-   Email Verification

------------------------------------------------------------------------

# 👨‍💻 Developer

### Agnik Saha

Full Stack Developer

------------------------------------------------------------------------

# 📜 License

MIT License
