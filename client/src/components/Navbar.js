import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/home" className="text-2xl font-bold">
            📚 CourseHub
          </Link>
          
          {token ? (
            <div className="flex items-center space-x-6">
              <Link
                to="/home"
                className="hover:text-blue-200 transition-colors"
              >
                Home
              </Link>
              <Link
                to="/my-courses"
                className="hover:text-blue-200 transition-colors"
              >
                My Courses
              </Link>
              <div className="flex items-center space-x-4">
                <span className="text-sm">👤 {user.name || user.email}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

