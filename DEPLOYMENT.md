# 🚀 Deployment Guide

This guide will help you deploy the Mini Course Subscription Application to cloud platforms.

## 📋 Pre-Deployment Checklist

- [ ] All code is committed to Git
- [ ] Environment variables are configured
- [ ] Database is set up (MongoDB Atlas recommended)
- [ ] Backend API is tested locally
- [ ] Frontend build is tested locally

## 🌐 Option 1: Deploy to Heroku

### Backend Deployment

1. **Install Heroku CLI**:
   ```bash
   # Visit https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Login to Heroku**:
   ```bash
   heroku login
   ```

3. **Create Heroku App**:
   ```bash
   cd server
   heroku create your-app-name-backend
   ```

4. **Set Environment Variables**:
   ```bash
   heroku config:set MONGODB_URI=your-mongodb-connection-string
   heroku config:set JWT_SECRET=your-secret-key
   ```

5. **Create Procfile** in `server/` directory:
   ```
   web: node index.js
   ```

6. **Deploy**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   heroku git:remote -a your-app-name-backend
   git push heroku main
   ```

### Frontend Deployment

1. **Update API URL** in `client/src/utils/api.js`:
   ```javascript
   const API_URL = process.env.REACT_APP_API_URL || 'https://your-app-name-backend.herokuapp.com';
   ```

2. **Build the app**:
   ```bash
   cd client
   npm run build
   ```

3. **Deploy to Vercel/Netlify** (see below)

## 🌐 Option 2: Deploy to Railway

### Backend Deployment

1. **Sign up** at [Railway.app](https://railway.app)

2. **Create New Project** → New Service → GitHub Repo

3. **Configure**:
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `node index.js`

4. **Set Environment Variables**:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `PORT` (auto-set by Railway)

5. **Deploy**: Railway will auto-deploy on push

### Frontend Deployment

1. **Create New Service** in same Railway project

2. **Configure**:
   - Root Directory: `client`
   - Build Command: `npm install && npm run build`
   - Start Command: `npx serve -s build`

3. **Set Environment Variable**:
   - `REACT_APP_API_URL` = Your backend Railway URL

## 🌐 Option 3: Deploy to Render

### Backend Deployment

1. **Sign up** at [Render.com](https://render.com)

2. **Create New Web Service**

3. **Connect GitHub Repository**

4. **Configure**:
   - Name: `course-subscription-backend`
   - Environment: Node
   - Build Command: `cd server && npm install`
   - Start Command: `cd server && node index.js`
   - Root Directory: `server`

5. **Set Environment Variables**:
   - `MONGODB_URI`
   - `JWT_SECRET`

6. **Deploy**: Render will auto-deploy

### Frontend Deployment

1. **Create New Static Site**

2. **Configure**:
   - Build Command: `cd client && npm install && npm run build`
   - Publish Directory: `client/build`

3. **Set Environment Variable**:
   - `REACT_APP_API_URL` = Your backend Render URL

## 🌐 Option 4: Deploy Frontend to Vercel

1. **Sign up** at [Vercel.com](https://vercel.com)

2. **Import Project** from GitHub

3. **Configure**:
   - Framework Preset: Create React App
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Output Directory: `build`

4. **Set Environment Variable**:
   - `REACT_APP_API_URL` = Your backend URL

5. **Deploy**: Vercel will auto-deploy on push

## 🌐 Option 5: Deploy Frontend to Netlify

1. **Sign up** at [Netlify.com](https://netlify.com)

2. **New Site from Git** → Connect GitHub

3. **Configure**:
   - Base directory: `client`
   - Build command: `npm run build`
   - Publish directory: `client/build`

4. **Set Environment Variable**:
   - `REACT_APP_API_URL` = Your backend URL

5. **Deploy**: Netlify will auto-deploy on push

## 🗄️ MongoDB Atlas Setup

1. **Create Account** at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

2. **Create Cluster** (Free tier available)

3. **Create Database User**:
   - Username and password
   - Save credentials securely

4. **Network Access**:
   - Add IP Address: `0.0.0.0/0` (for development)
   - Or add specific IPs for production

5. **Get Connection String**:
   - Click "Connect" → "Connect your application"
   - Copy connection string
   - Replace `<password>` with your database password

6. **Update Environment Variable**:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/course-subscription
   ```

## 🔄 Post-Deployment Steps

1. **Seed Database**:
   ```bash
   # Option 1: Run seed script locally with production MongoDB URI
   MONGODB_URI=your-production-uri node server/seed.js

   # Option 2: Create a seed endpoint in backend (for one-time use)
   ```

2. **Test API Endpoints**:
   - Use Postman or curl to test backend APIs
   - Verify CORS is working

3. **Test Frontend**:
   - Visit deployed frontend URL
   - Test login, course browsing, subscription

4. **Monitor Logs**:
   - Check platform logs for errors
   - Monitor database connections

## 🔒 Security Checklist

- [ ] Use strong JWT_SECRET in production
- [ ] MongoDB Atlas IP whitelist configured
- [ ] Environment variables are set (not hardcoded)
- [ ] CORS is configured for production frontend URL
- [ ] HTTPS is enabled (most platforms do this automatically)

## 📝 Environment Variables Summary

### Backend
```
PORT=5000 (or auto-set by platform)
MONGODB_URI=mongodb+srv://...
JWT_SECRET=strong-random-string
```

### Frontend
```
REACT_APP_API_URL=https://your-backend-url.com
```

## 🐛 Troubleshooting

### Backend Issues
- Check logs in platform dashboard
- Verify MongoDB connection string
- Ensure PORT is set correctly
- Check CORS configuration

### Frontend Issues
- Verify REACT_APP_API_URL is set
- Check browser console for errors
- Ensure backend is accessible
- Verify CORS allows frontend domain

### Database Issues
- Check MongoDB Atlas network access
- Verify database user credentials
- Ensure database name exists
- Check connection string format

## 📞 Support

If you encounter issues:
1. Check platform-specific documentation
2. Review application logs
3. Test API endpoints directly
4. Verify environment variables

---

**Happy Deploying! 🚀**

