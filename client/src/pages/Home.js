import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../utils/api';

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [subscribedCourseIds, setSubscribedCourseIds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
    fetchSubscribedCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await api.get('/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        url: error.config?.url
      });
      toast.error(error.response?.data?.message || 'Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const fetchSubscribedCourses = async () => {
    try {
      const response = await api.get('/my-courses');
      const subscribedIds = response.data.map(course => course.courseId.toString());
      setSubscribedCourseIds(subscribedIds);
    } catch (error) {
      // If error, just continue without subscription data
      console.error('Error fetching subscribed courses:', error);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse"
            >
              <div className="h-48 bg-gray-300"></div>
              <div className="p-6">
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          🎓 Available Courses
        </h1>
        <p className="text-gray-600">
          Explore our collection of courses. Free courses can be subscribed
          instantly, while paid courses require a promo code.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => {
          const isSubscribed = subscribedCourseIds.includes(course._id.toString());
          return (
            <Link
              key={course._id}
              to={`/course/${course._id}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 relative"
            >
              {isSubscribed && (
                <div className="absolute top-3 right-3 z-10">
                  <span className="px-3 py-1 bg-green-500 text-white rounded-full text-xs font-semibold shadow-lg">
                    ✓ Subscribed
                  </span>
                </div>
              )}
              <div className="h-48 bg-gray-200 overflow-hidden">
                {course.image ? (
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-4xl">
                    📚
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {course.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {course.description}
                </p>
                <div className="flex items-center justify-between">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      course.price === 0
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {course.price === 0 ? 'FREE' : `$${course.price}`}
                  </span>
                  <span className="text-blue-600 font-medium">View Details →</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {courses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No courses available at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default Home;

