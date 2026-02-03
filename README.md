# 📚 Mini Course Subscription Application (Black Friday Edition)

A full-stack web application where users can sign up, view courses, and subscribe to courses based on whether they are free or paid. Features mock payment system with promo code validation.

## 🎯 Features

- **Authentication**: JWT-based authentication with signup and login
- **Course Management**: Browse and view course details
- **Subscription System**: 
  - Free courses: Instant subscription
  - Paid courses: Require promo code validation (BFSALE25 for 50% discount)
- **My Courses**: View all subscribed courses
- **Modern UI**: Built with React and TailwindCSS
- **Toast Notifications**: User-friendly feedback for all actions

## 🛠️ Tech Stack

### Frontend
- React 18
- React Router DOM
- Axios
- TailwindCSS
- React Toastify

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (JSON Web Tokens)
- bcryptjs (Password hashing)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas account)

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd cyberware
```

### 2. Install Dependencies

Install all dependencies (root, server, and client):

```bash
npm run install-all
```

Or install separately:

```bash
# Root dependencies
npm install

# Server dependencies
cd server
npm install
cd ..

# Client dependencies
cd client
npm install
cd ..
```

### 3. Environment Configuration

Create a `.env` file in the `server` directory:

```bash
cd server
cp .env.example .env
```

Edit `server/.env` with your configuration:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/course-subscription
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

**For MongoDB Atlas (Cloud):**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/course-subscription
```

### 4. Seed the Database

Run the seed script to populate the database with dummy users and courses:

```bash
cd server
node seed.js
```

This will create:
- 3 dummy users (see credentials below)
- 6 sample courses (mix of free and paid)

### 5. Start the Application

**Option 1: Run both server and client together (Recommended)**

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

## 👤 Demo Credentials

After seeding the database, you can use these credentials to login:

| Email | Password |
|-------|----------|
| john@example.com | password123 |
| jane@example.com | password123 |
| admin@example.com | password123 |

## 🎟️ Promo Code

For paid courses, use the following promo code to get 50% discount:
- **Promo Code**: `BFSALE25`
- **Discount**: 50% off

## 📁 Project Structure

```
cyberware/
├── server/
│   ├── models/
│   │   ├── User.js
│   │   ├── Course.js
│   │   └── Subscription.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── courses.js
│   │   ├── subscriptions.js
│   │   └── myCourses.js
│   ├── middleware/
│   │   └── auth.js
│   ├── index.js
│   ├── seed.js
│   └── package.json
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   └── PrivateRoute.js
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Home.js
│   │   │   ├── CourseDetail.js
│   │   │   └── MyCourses.js
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
├── package.json
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /auth/signup` - Create a new user account
- `POST /auth/login` - Login and get JWT token

### Courses
- `GET /courses` - Get all courses
- `GET /courses/:id` - Get a specific course by ID

### Subscriptions
- `POST /subscribe` - Subscribe to a course
  - Body: `{ courseId, promoCode? }`
  - Headers: `Authorization: Bearer <token>`

### My Courses
- `GET /my-courses` - Get all courses subscribed by the authenticated user
  - Headers: `Authorization: Bearer <token>`

## 🌐 Deployment

### Backend Deployment (Heroku/Railway/Render)

1. **Create account** on your preferred hosting platform
2. **Create a new project/app**
3. **Set environment variables**:
   - `MONGODB_URI` - Your MongoDB connection string
   - `JWT_SECRET` - A secure random string
   - `PORT` - Usually set automatically by the platform
4. **Deploy**:
   ```bash
   cd server
   git init
   git add .
   git commit -m "Initial commit"
   # Follow platform-specific deployment instructions
   ```

### Frontend Deployment (Vercel/Netlify)

1. **Build the React app**:
   ```bash
   cd client
   npm run build
   ```

2. **Set environment variable**:
   - `REACT_APP_API_URL` - Your backend API URL (e.g., `https://your-backend.herokuapp.com`)

3. **Deploy**:
   - **Vercel**: Connect your GitHub repo and deploy
   - **Netlify**: Drag and drop the `build` folder or connect GitHub

### MongoDB Atlas Setup (Cloud Database)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist your IP address (or use `0.0.0.0/0` for development)
5. Get your connection string and update `MONGODB_URI` in `.env`

## 📸 Screenshots

### Login Page
- Clean login/signup interface with form validation
- Demo credentials displayed for easy testing

### Home Page
- Grid layout showing all available courses
- Course cards with title, description, price, and thumbnail
- Visual distinction between free and paid courses

### Course Detail Page
- Full course information
- Promo code input for paid courses
- Price display with discount calculation
- Subscribe button (enabled after promo validation for paid courses)

### My Courses Page
- List of all subscribed courses
- Shows price paid and subscription date
- Quick access to view course details

## 🧪 Testing the Application

1. **Sign up** with a new account or **login** with demo credentials
2. **Browse courses** on the home page
3. **View course details** by clicking on any course
4. **Subscribe to free courses** instantly
5. **Subscribe to paid courses** using promo code `BFSALE25`
6. **View your subscriptions** in the "My Courses" page

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT token-based authentication
- Protected routes (authentication middleware)
- Input validation on both frontend and backend
- Secure API endpoints with token verification

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally, or
- Check your MongoDB Atlas connection string
- Verify network access in MongoDB Atlas

### Port Already in Use
- Change `PORT` in `server/.env` to a different port
- Update frontend API URL if needed

### CORS Errors
- Ensure backend CORS is configured correctly
- Check that API URL matches in frontend

### Build Errors
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version compatibility

## 📝 Notes

- All payments are **mock-based** - no real payment integration
- Promo code validation happens on the backend
- JWT tokens expire after 7 days
- Duplicate subscriptions are prevented (unique index on userId + courseId)

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Built as a full-stack course subscription application with Black Friday promo code feature.

---

**Happy Learning! 🎓**

