import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../utils/api';

const MyCourses = () => {
  const [myCourses, setMyCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyCourses();
  }, []);

  const fetchMyCourses = async () => {
    try {
      const response = await api.get('/my-courses');
      setMyCourses(response.data);
    } catch (error) {
      toast.error('Failed to load your courses');
      console.error('Error fetching my courses:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse"
            >
              <div className="h-48 bg-gray-300"></div>
              <div className="p-6">
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
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
          📖 My Courses
        </h1>
        <p className="text-gray-600">
          All the courses you have subscribed to are listed below.
        </p>
      </div>

      {myCourses.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            No courses yet
          </h2>
          <p className="text-gray-500 mb-6">
            Start exploring our courses and subscribe to begin learning!
          </p>
          <Link
            to="/home"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse Courses
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myCourses.map((subscription) => (
            <div
              key={subscription.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 relative"
            >
              <div className="absolute top-3 right-3 z-10">
                <span className="px-3 py-1 bg-green-500 text-white rounded-full text-xs font-semibold shadow-lg">
                  ✓ Subscribed
                </span>
              </div>
              <div className="h-48 bg-gray-200 overflow-hidden">
                {subscription.image ? (
                  <img
                    src={subscription.image}
                    alt={subscription.title}
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
                  {subscription.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {subscription.description}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <p className="text-gray-500">Price Paid</p>
                    <p className="font-semibold text-gray-900">
                      {subscription.pricePaid === 0
                        ? 'FREE'
                        : `$${subscription.pricePaid}`}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-500">Subscribed</p>
                    <p className="font-semibold text-gray-900">
                      {new Date(subscription.subscribedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <Link
                  to={`/course/${subscription.courseId}`}
                  className="mt-4 block text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  View Course
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCourses;

