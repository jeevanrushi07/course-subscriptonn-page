# 🚀 Local Run Instructions

## ✅ Step 1: MongoDB Setup (Choose One)

### Option A: MongoDB Atlas (Easiest - 5 minutes) ⭐

1. **Sign up** at https://www.mongodb.com/cloud/atlas (Free)
2. **Create a free cluster** (M0)
3. **Create database user**:
   - Database Access → Add New User
   - Username: `courseuser`
   - Password: (save this!)
4. **Network Access** → Add IP Address → Allow from anywhere
5. **Get connection string**:
   - Database → Connect → Connect your application
   - Copy the string
   - Replace `<password>` with your password
   - Add `/course-subscription` at the end

6. **Update `server/.env`**:
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://courseuser:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/course-subscription?retryWrites=true&w=majority
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-mini-course-app-2024
   ```

### Option B: Local MongoDB

1. **Install MongoDB**: https://www.mongodb.com/try/download/community
2. **Start MongoDB service** (usually auto-starts on Windows)
3. **`server/.env` already created** with local connection

---

## ✅ Step 2: Seed Database

```bash
cd server
node seed.js
```

Expected output:
```
✅ Connected to MongoDB for seeding
🗑️  Cleared existing data
👥 Created dummy users
📚 Created courses
✅ Seeding completed successfully!
```

---

## ✅ Step 3: Start Application

### Option A: Run Both Together (Recommended)

```bash
npm run dev
```

This starts:
- Backend on http://localhost:5000
- Frontend on http://localhost:3000

### Option B: Run Separately

**Terminal 1 (Backend):**
```bash
cd server
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd client
npm start
```

---

## ✅ Step 4: Access Application

1. Open browser: http://localhost:3000
2. **Login** with demo credentials:
   - Email: `john@example.com`
   - Password: `password123`

---

## 🎯 Quick Commands

```bash
# Install all dependencies (if not done)
npm run install-all

# Seed database
cd server && node seed.js

# Start application
npm run dev
```

---

## 🐛 Troubleshooting

### MongoDB Connection Error
- **Atlas**: Check connection string, password, network access
- **Local**: Ensure MongoDB service is running

### Port Already in Use
- Change `PORT` in `server/.env` to another port (e.g., 5001)
- Update `client/src/utils/api.js` if needed

### Module Not Found
- Run `npm install` in root, server, and client directories

---

**Need help?** Check `SETUP_MONGODB.md` for detailed MongoDB setup.

