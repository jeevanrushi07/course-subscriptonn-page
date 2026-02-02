# Troubleshooting "Something Went Wrong" Error

## Common Causes & Solutions

### 1. Environment Variables Not Set

**Check in Vercel Dashboard:**
- Go to Project → Settings → Environment Variables
- Verify these are set:
  - `MONGODB_URI` - Your actual MongoDB Atlas connection string
  - `JWT_SECRET` - A strong secret key
  - `REACT_APP_API_URL` - Should be `/api`

**Fix:**
- Update environment variables in Vercel
- Redeploy the application

### 2. MongoDB Connection Issues

**Symptoms:**
- API calls fail
- Database errors in logs

**Fix:**
- Verify MongoDB Atlas connection string is correct
- Check MongoDB Atlas Network Access (whitelist 0.0.0.0/0)
- Ensure database user credentials are correct
- Check Vercel function logs for connection errors

### 3. API Route Mismatch

**Symptoms:**
- 404 errors
- "Route not found" messages

**Current API Routes:**
- `/api/auth/login`
- `/api/auth/signup`
- `/api/courses`
- `/api/courses/:id`
- `/api/subscribe`
- `/api/subscribe/check/:courseId`
- `/api/my-courses`

**Fix:**
- Ensure frontend uses `/api` prefix for all API calls
- Check browser console for actual API URLs being called

### 4. CORS Issues

**Symptoms:**
- Network errors in browser console
- CORS policy errors

**Fix:**
- Backend CORS is configured to allow all origins
- If issues persist, check Vercel function logs

### 5. Authentication Token Issues

**Symptoms:**
- 401 Unauthorized errors
- Automatic logout

**Fix:**
- Clear browser localStorage
- Login again
- Check if JWT_SECRET is set correctly

## Debugging Steps

### 1. Check Browser Console
- Open browser DevTools (F12)
- Check Console tab for errors
- Check Network tab for failed API calls

### 2. Check Vercel Logs
- Go to Vercel Dashboard
- Select your project
- Go to "Deployments" → Latest deployment → "Functions" tab
- Check serverless function logs

### 3. Test API Endpoints

Test these URLs directly:
- `https://your-app.vercel.app/api` - Should return API message
- `https://your-app.vercel.app/api/courses` - Should return courses (no auth needed)

### 4. Verify Environment Variables

In Vercel Dashboard:
1. Settings → Environment Variables
2. Verify all variables are set
3. Check for typos
4. Ensure no extra spaces

## Quick Fixes

### Reset Everything
1. Clear browser cache and localStorage
2. Verify environment variables in Vercel
3. Redeploy application
4. Test again

### Common Environment Variable Mistakes
- ❌ `REACT_APP_API_URL=https://railway-url.com` (wrong for Vercel)
- ✅ `REACT_APP_API_URL=/api` (correct for Vercel)

- ❌ `MONGODB_URI=your-mongodb-atlas-connection-string` (placeholder)
- ✅ `MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db` (actual connection string)

## Still Having Issues?

1. Check Vercel function logs for detailed error messages
2. Verify MongoDB Atlas is accessible
3. Test API endpoints directly using Postman or curl
4. Check browser console for specific error messages

