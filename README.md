# Course Subscription Application

A full-stack web application for course subscriptions with authentication, course browsing, and subscription management. Built with React, Node.js, Express, and MongoDB.

## Features

- User authentication (JWT-based signup/login)
- Browse and view course details
- Subscribe to free courses instantly
- Subscribe to paid courses with promo code (BFSALE25 - 50% discount)
- View subscribed courses
- Modern UI with TailwindCSS
- Responsive design

## Tech Stack

**Frontend:** React 18, React Router, Axios, TailwindCSS, React Toastify  
**Backend:** Node.js, Express.js, MongoDB (Mongoose), JWT, bcryptjs  
**Database:** MongoDB Atlas

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (free tier available) or local MongoDB installation

## Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/jeevanrushi07/course-subscription-app.git
cd course-subscription-app
```

### 2. Install Dependencies

```bash
# Install root dependencies
npm install

# Install server dependencies
cd server
npm install
cd ..

# Install client dependencies
cd client
npm install
cd ..
```

### 3. Environment Configuration

Create a `.env` file in the `server` directory:

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/course-subscription?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

**For MongoDB Atlas:**
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create database user
4. Whitelist IP address (0.0.0.0/0 for development)
5. Get connection string and update `MONGODB_URI`

### 4. Seed the Database

```bash
cd server
node seed.js
```

This creates:
- 3 dummy users (see credentials below)
- 6 sample courses (mix of free and paid)

### 5. Start the Application

**Option 1: Run both servers together**

```bash
npm run dev
```

**Option 2: Run separately**

Terminal 1 (Backend):
```bash
cd server
npm run dev
```

Terminal 2 (Frontend):
```bash
cd client
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Demo Credentials

After seeding the database, use these credentials to login:

| Email | Password |
|-------|----------|
| john@example.com | password123 |
| jane@example.com | password123 |
| admin@example.com | password123 |

## Promo Code

For paid courses, use the following promo code to get 50% discount:
- **Promo Code**: `BFSALE25`
- **Discount**: 50% off

## Project Structure

```
course-subscription-app/
├── server/                 # Backend API
│   ├── models/            # Database models (User, Course, Subscription)
│   ├── routes/            # API routes (auth, courses, subscriptions, myCourses)
│   ├── middleware/        # Authentication middleware
│   ├── index.js           # Server entry point
│   └── seed.js            # Database seeding script
├── client/                # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components (Navbar, PrivateRoute)
│   │   ├── pages/         # Page components (Login, Home, CourseDetail, MyCourses)
│   │   ├── utils/         # API utilities
│   │   └── App.js         # Main app component
│   └── public/            # Static files
├── api/                   # Vercel serverless functions
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - Login and get JWT token

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course by ID

### Subscriptions
- `POST /api/subscribe` - Subscribe to a course
  - Body: `{ courseId, promoCode? }`
  - Headers: `Authorization: Bearer <token>`
- `GET /api/subscribe/check/:courseId` - Check subscription status

### My Courses
- `GET /api/my-courses` - Get user's subscribed courses
  - Headers: `Authorization: Bearer <token>`

## Deployment

### Deploy to Vercel (Full-Stack)

This application is configured for full-stack deployment on Vercel.

1. **Push code to GitHub**
   ```bash
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [Vercel](https://vercel.com)
   - Sign up/Login with GitHub
   - Click "Add New" → "Project"
   - Import your repository

3. **Configure Build Settings**
   - Root Directory: `.` (root)
   - Build Command: `cd client && npm install && npm run build`
   - Output Directory: `client/build`

4. **Set Environment Variables**
   ```
   MONGODB_URI=your-mongodb-atlas-connection-string
   JWT_SECRET=your-secret-key
   REACT_APP_API_URL=/api
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Your app will be live at `your-app.vercel.app`

### Alternative: Separate Deployment

**Backend (Railway/Render/Heroku):**
- Deploy `server/` directory
- Set environment variables
- Get backend URL

**Frontend (Vercel/Netlify):**
- Deploy `client/` directory
- Set `REACT_APP_API_URL` to backend URL
- Build and deploy

## Screenshots

### Login/Signup Page
![Login Page](screenshots/login.png)
- Clean login/signup interface
- Form validation
- Demo credentials displayed

### Home Page - Course Listing
![Home Page](screenshots/home.png)
- Grid layout of all courses
- Course cards with title, description, price
- Visual distinction between free and paid courses
- "Subscribed" badge on enrolled courses

### Course Detail Page
![Course Detail](screenshots/course-detail.png)
- Full course information
- Detailed content and learning outcomes
- Promo code input for paid courses
- Price display with discount calculation
- Subscribe button (disabled if already subscribed)

### My Courses Page
![My Courses](screenshots/my-courses.png)
- List of all subscribed courses
- Shows price paid and subscription date
- Quick access to course details

*Note: Add screenshots to `screenshots/` directory*

## Testing

1. **Sign up** with a new account or **login** with demo credentials
2. **Browse courses** on the home page
3. **View course details** by clicking on any course
4. **Subscribe to free courses** instantly
5. **Subscribe to paid courses** using promo code `BFSALE25`
6. **View your subscriptions** in the "My Courses" page

## Security Features

- Password hashing with bcryptjs
- JWT token-based authentication
- Protected routes (authentication middleware)
- Input validation on both frontend and backend
- Secure API endpoints with token verification
- CORS configuration

## Notes

- All payments are **mock-based** - no real payment integration
- Promo code validation happens on the backend
- JWT tokens expire after 7 days
- Duplicate subscriptions are prevented
- Free courses can be subscribed instantly
- Paid courses require promo code validation

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB Atlas IP whitelist includes your IP (or 0.0.0.0/0)
- Verify connection string format
- Check database user credentials

### Port Already in Use
- Change `PORT` in `server/.env` to a different port
- Update frontend API URL if needed

### Build Errors
- Clear `node_modules` and reinstall
- Check Node.js version compatibility
- Verify all environment variables are set

## License

MIT

## Author

Jeevan Rushi Sudula

---

**Live Demo:** [View on Vercel](https://course-subscription-app-w5fh.vercel.app)
