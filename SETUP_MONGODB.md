# 🗄️ MongoDB Setup Guide

## Option 1: MongoDB Atlas (Cloud - Recommended) ⭐

### Step 1: Create Free Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Try Free" and sign up

### Step 2: Create Cluster
1. Choose "Free" tier (M0)
2. Select a cloud provider and region
3. Click "Create Cluster" (takes 3-5 minutes)

### Step 3: Create Database User
1. Go to "Database Access" in left menu
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Username: `courseuser` (or any name)
5. Password: Create a strong password (save it!)
6. Database User Privileges: "Read and write to any database"
7. Click "Add User"

### Step 4: Network Access
1. Go to "Network Access" in left menu
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development)
   - Or add your specific IP for production
4. Click "Confirm"

### Step 5: Get Connection String
1. Go to "Database" in left menu
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
   - It looks like: `mongodb+srv://username:password@cluster.mongodb.net/`
5. Replace `<password>` with your database user password
6. Add database name at the end: `...mongodb.net/course-subscription`

### Step 6: Update .env File
Create `server/.env` file with:

```env
PORT=5000
MONGODB_URI=mongodb+srv://courseuser:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/course-subscription?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-mini-course-app-2024
```

Replace `YOUR_PASSWORD` and `cluster0.xxxxx` with your actual values.

---

## Option 2: Local MongoDB Installation

### Windows:
1. Download MongoDB Community Server: https://www.mongodb.com/try/download/community
2. Run the installer
3. Choose "Complete" installation
4. Install MongoDB as a Windows Service
5. MongoDB will start automatically

### macOS:
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

### Linux (Ubuntu/Debian):
```bash
sudo apt-get update
sudo apt-get install -y mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

### After Installation:
Create `server/.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/course-subscription
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-mini-course-app-2024
```

---

## ✅ Verify Setup

After setting up MongoDB (Atlas or Local), run:

```bash
cd server
node seed.js
```

You should see:
```
✅ Connected to MongoDB for seeding
🗑️  Cleared existing data
👥 Created dummy users
📚 Created courses
✅ Seeding completed successfully!
```

If you see errors, check:
- MongoDB is running (for local)
- Connection string is correct (for Atlas)
- Network access is allowed (for Atlas)

