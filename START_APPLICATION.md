# 🚀 Application Start Instructions

## ✅ Current Status
- ✅ Backend Server: Running on http://localhost:5000
- ⏳ Frontend: Starting...

## 📋 Manual Start (Recommended)

Open **2 separate terminal windows**:

### Terminal 1 - Backend Server
```powershell
cd C:\Users\jeeva\Downloads\cyberware\server
npm run dev
```

You should see:
```
🚀 Server running on port 5000
✅ MongoDB connected
```

### Terminal 2 - Frontend
```powershell
cd C:\Users\jeeva\Downloads\cyberware\client
npm start
```

You should see:
```
Compiling...
Compiled successfully!
webpack compiled
```

The browser will automatically open http://localhost:3000

---

## 🌐 Access URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

---

## 🔑 Login Credentials

- **Email**: `john@example.com`
- **Password**: `password123`

---

## 🎟️ Promo Code

- **Code**: `BFSALE25`
- **Discount**: 50% off paid courses

---

## 🐛 Troubleshooting

### Port Already in Use
If you see "port already in use" error:
1. Close the terminal
2. Kill the process: `taskkill /F /IM node.exe`
3. Start again

### Frontend Not Starting
1. Make sure you're in the `client` directory
2. Check if `node_modules` exists: `ls node_modules`
3. If missing, run: `npm install`
4. Then run: `npm start`

### Backend Not Starting
1. Make sure you're in the `server` directory
2. Check `.env` file exists
3. Verify MongoDB connection string is correct
4. Run: `node index.js` (without nodemon to see errors)

---

**Note**: Keep both terminals open while using the application!

