# ⚡ Quick Start Guide

Get the application running in 5 minutes!

## 🚀 Quick Setup

### Step 1: Install Dependencies

```bash
npm run install-all
```

### Step 2: Setup Environment

Create `server/.env` file:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/course-subscription
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

**For MongoDB Atlas (Cloud):**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/course-subscription
```

### Step 3: Seed Database

```bash
cd server
node seed.js
```

### Step 4: Start Application

```bash
npm run dev
```

This starts both backend (port 5000) and frontend (port 3000).

## 🎯 Access the App

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 👤 Login Credentials

After seeding, use these credentials:

- **Email**: `john@example.com`
- **Password**: `password123`

Or create a new account using the signup form.

## 🎟️ Promo Code

For paid courses, use: **BFSALE25** (50% discount)

## ✅ That's It!

You're ready to explore the application!

---

For detailed setup and deployment instructions, see [README.md](./README.md)

