import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../utils/api';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [promoCode, setPromoCode] = useState('');
  const [promoValidated, setPromoValidated] = useState(false);
  const [discountedPrice, setDiscountedPrice] = useState(null);
  const [subscribing, setSubscribing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const checkSubscriptionStatus = useCallback(async (courseData) => {
    try {
      const response = await api.get(`/subscribe/check/${id}`);
      setIsSubscribed(response.data.isSubscribed);
      if (response.data.isSubscribed && courseData && courseData.price > 0) {
        setPromoValidated(true);
      }
    } catch (error) {
      // If error, assume not subscribed
      setIsSubscribed(false);
    }
  }, [id]);

  const fetchCourse = useCallback(async () => {
    try {
      const response = await api.get(`/courses/${id}`);
      const courseData = response.data;
      setCourse(courseData);
      if (courseData.price === 0) {
        setPromoValidated(true);
      }
      // Check subscription status after course is loaded
      await checkSubscriptionStatus(courseData);
    } catch (error) {
      toast.error('Failed to load course details');
      navigate('/home');
    } finally {
      setLoading(false);
    }
  }, [id, navigate, checkSubscriptionStatus]);

  useEffect(() => {
    fetchCourse();
  }, [fetchCourse]);

  const handlePromoValidation = () => {
    if (!promoCode.trim()) {
      toast.error('Please enter a promo code');
      return;
    }

    if (promoCode.toUpperCase() === 'BFSALE25') {
      setPromoValidated(true);
      const discount = course.price * 0.5;
      setDiscountedPrice(Math.round(course.price - discount));
      toast.success('Promo code applied! 50% discount applied.');
    } else {
      toast.error('Invalid promo code. Please try again.');
      setPromoValidated(false);
      setDiscountedPrice(null);
    }
  };

  const handleSubscribe = async () => {
    if (isSubscribed) {
      toast.info('You are already subscribed to this course');
      return;
    }

    if (course.price > 0 && !promoValidated) {
      toast.error('Please validate the promo code first');
      return;
    }

    setSubscribing(true);
    try {
      const payload = {
        courseId: id,
        ...(course.price > 0 && { promoCode: promoCode.toUpperCase() }),
      };

      await api.post('/subscribe', payload);
      setIsSubscribed(true);
      toast.success('Successfully subscribed to the course!');
      navigate('/my-courses');
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Failed to subscribe. Please try again.'
      );
    } finally {
      setSubscribing(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-8 animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
          <div className="h-48 bg-gray-300 rounded mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  if (!course) {
    return null;
  }

  const isFree = course.price === 0;
  const finalPrice = discountedPrice !== null ? discountedPrice : course.price;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <button
        onClick={() => navigate('/home')}
        className="mb-4 text-blue-600 hover:text-blue-800 flex items-center"
      >
        ← Back to Courses
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="h-64 md:h-96 bg-gray-200 overflow-hidden">
          {course.image ? (
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-8xl">
              📚
            </div>
          )}
        </div>

        <div className="p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {course.title}
          </h1>

          {/* Course Info Badges */}
          {(course.level || course.duration || course.lessons || course.instructor) && (
            <div className="flex flex-wrap gap-3 mb-6">
              {course.level && (
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                  {course.level}
                </span>
              )}
              {course.duration && (
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                  ⏱️ {course.duration}
                </span>
              )}
              {course.lessons > 0 && (
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-semibold">
                  📚 {course.lessons} Lessons
                </span>
              )}
              {course.instructor && (
                <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-semibold">
                  👤 {course.instructor}
                </span>
              )}
            </div>
          )}

          {/* Short Description */}
          <div className="mb-6">
            <p className="text-gray-700 text-lg leading-relaxed">
              {course.description}
            </p>
          </div>

          {/* Detailed Content */}
          {course.detailedContent && (
            <div className="mb-8 border-t pt-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Course</h2>
              <div className="text-gray-700 leading-relaxed space-y-4">
                {course.detailedContent.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-base">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* What You Will Learn */}
          {course.whatYouWillLearn && course.whatYouWillLearn.length > 0 && (
            <div className="mb-8 border-t pt-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">What You'll Learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {course.whatYouWillLearn.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="border-t pt-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Price</p>
                {isFree ? (
                  <p className="text-3xl font-bold text-green-600">FREE</p>
                ) : (
                  <div>
                    {discountedPrice !== null && (
                      <p className="text-xl text-gray-400 line-through">
                        ${course.price}
                      </p>
                    )}
                    <p className="text-3xl font-bold text-blue-600">
                      ${finalPrice}
                      {discountedPrice !== null && (
                        <span className="text-lg text-green-600 ml-2">
                          (50% OFF)
                        </span>
                      )}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {isSubscribed ? (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-lg font-semibold text-green-800 mb-2">
                      ✅ You are subscribed to this course!
                    </p>
                    <button
                      onClick={() => navigate('/my-courses')}
                      className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    >
                      View in My Courses
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {!isFree && (
                  <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-gray-700 mb-3">
                      💳 This is a paid course. Enter promo code to subscribe:
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => {
                          setPromoCode(e.target.value);
                          setPromoValidated(false);
                          setDiscountedPrice(null);
                        }}
                        placeholder="Enter promo code (BFSALE25)"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={promoValidated}
                      />
                      <button
                        onClick={handlePromoValidation}
                        disabled={promoValidated}
                        className="px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {promoValidated ? '✓ Applied' : 'Apply Code'}
                      </button>
                    </div>
                    {promoValidated && (
                      <p className="text-sm text-green-700 mt-2">
                        ✅ Promo code validated! You can now subscribe.
                      </p>
                    )}
                  </div>
                )}

                <button
                  onClick={handleSubscribe}
                  disabled={(!isFree && !promoValidated) || subscribing || isSubscribed}
                  className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-colors ${
                    isFree || promoValidated
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : 'bg-gray-400 cursor-not-allowed'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {subscribing
                    ? 'Subscribing...'
                    : isFree
                    ? 'Subscribe for Free'
                    : 'Subscribe Now'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;

