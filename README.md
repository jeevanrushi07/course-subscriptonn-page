# Course Subscription Application

A full-stack web application for course subscriptions with authentication, course browsing, and subscription management.

## Features

- User authentication (JWT-based signup/login)
- Browse and view course details
- Subscribe to free courses instantly
- Subscribe to paid courses with promo code (BFSALE25 - 50% discount)
- View subscribed courses
- Modern UI with TailwindCSS

## Tech Stack

**Frontend:** React, React Router, Axios, TailwindCSS  
**Backend:** Node.js, Express, MongoDB, JWT  
**Database:** MongoDB Atlas

## Setup

### Prerequisites
- Node.js (v14+)
- MongoDB Atlas account or local MongoDB

### Installation

```bash
# Install dependencies
npm install
cd server && npm install
cd ../client && npm install

# Setup environment variables
# Create server/.env file:
PORT=5000
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key

# Seed database
cd server && node seed.js

# Start development servers
npm run dev
```

## Demo Credentials

- Email: `john@example.com`
- Password: `password123`

## Promo Code

For paid courses: **BFSALE25** (50% discount)

## Project Structure

```
├── server/          # Backend API
├── client/          # React frontend
└── api/             # Vercel serverless functions
```

## Deployment

Deployed on Vercel (full-stack):
- Frontend: React app
- Backend: Express as serverless functions
- Database: MongoDB Atlas

## License

MIT
