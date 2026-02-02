# 🗄️ MongoDB Atlas Setup - Step by Step

## 📸 Visual Guide for Connection String

### Step 1: Click "Connect" on Your Cluster
![Connect Button](https://docs.mongodb.com/images/atlas-connect-button.png)

### Step 2: Choose "Connect your application"
- Select the second option: **"Connect your application"**
- NOT "MongoDB Shell" or "MongoDB Compass"

### Step 3: Choose Driver Settings
When you see the connection dialog:

**Driver:** Select **"Node.js"** ⬅️ **THIS IS WHAT YOU NEED!**

**Version:** Select **"5.5 or later"** (or latest available)

### Step 4: Copy Connection String
You'll see something like:
```
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

### Step 5: Update Connection String

**Replace these parts:**
1. `<username>` → Your database username (e.g., `courseuser`)
2. `<password>` → Your database user password
3. Add database name: After `.net/` add `course-subscription`

**Final format:**
```
mongodb+srv://courseuser:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/course-subscription?retryWrites=true&w=majority
```

### Step 6: Update server/.env File

Open `server/.env` and update:

```env
PORT=5000
MONGODB_URI=mongodb+srv://courseuser:YOUR_ACTUAL_PASSWORD@cluster0.xxxxx.mongodb.net/course-subscription?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-mini-course-app-2024
```

**Important:**
- Replace `YOUR_ACTUAL_PASSWORD` with your real password
- Replace `cluster0.xxxxx` with your actual cluster name
- Keep the `/course-subscription` part (database name)

---

## ✅ Quick Checklist

- [ ] Created MongoDB Atlas account
- [ ] Created free cluster (M0)
- [ ] Created database user (username + password)
- [ ] Added network access (allow from anywhere)
- [ ] Got connection string with **Node.js driver**
- [ ] Updated `server/.env` with connection string
- [ ] Replaced `<username>` and `<password>` in connection string
- [ ] Added `/course-subscription` database name

---

## 🧪 Test Connection

After updating `.env`, test the connection:

```bash
cd server
node seed.js
```

If successful, you'll see:
```
✅ Connected to MongoDB for seeding
🗑️  Cleared existing data
👥 Created dummy users
📚 Created courses
✅ Seeding completed successfully!
```

---

## 🎯 Summary

**Driver to Choose:** **Node.js** (version 5.5 or later)

This is the correct driver for our Express.js backend application using Mongoose!

