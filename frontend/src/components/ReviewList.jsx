import React, { useState, useEffect, useCallback  } from 'react';
import { getServiceReviews, deleteReview } from '../api/services';
import Rating from './Rating';

const ReviewList = ({ serviceId, token, user, onReviewDeleted }) => {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

//   const fetchReviews = useCallback(async () => {
//     setIsLoading(true);
//     setError('');
    
//     try {
//       const response = await getServiceReviews(serviceId, currentPage);
//       setReviews(response.data.reviews);
//       setTotalPages(response.data.totalPages);
//     } catch (err) {
//       setError('Failed to load reviews');
//     } finally {
//       setIsLoading(false);
//     }
//   }, [serviceId, currentPage]);

  

  const fetchReviews = useCallback(async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await getServiceReviews(serviceId, currentPage);
      setReviews(response.data.reviews);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      setError('Failed to load reviews');
    } finally {
      setIsLoading(false);
    }
  }, [serviceId, currentPage]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;
    
    try {
      await deleteReview(reviewId, token);
      if (onReviewDeleted) {
        onReviewDeleted();
      }
      fetchReviews(); // Refresh the list
    } catch (err) {
      alert('Failed to delete review');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading && currentPage === 1) {
    return <div className="text-center py-4">Loading reviews...</div>;
  }

  if (error && currentPage === 1) {
    return <div className="text-center text-red-500 py-4">{error}</div>;
  }

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
      
      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet.</p>
      ) : (
        <>
          {reviews.map((review) => (
            <div key={review._id} className="border-b border-gray-200 py-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center">
                  {/* <img
                    src={review.userId?.profilePicture || '/default-avatar.png'}
                    alt={review.userId?.name}
                    className="w-10 h-10 rounded-full mr-3"
                  /> */}
                  <div>
                    <h4 className="font-medium">{review.userId?.name}</h4>
                    <p className="text-sm text-gray-500">
                      {formatDate(review.createdAt)}
                    </p>
                  </div>
                </div>
                <Rating rating={review.rating} size={16} />
              </div>
              
              {review.comment && (
                <p className="text-gray-700 mt-2">{review.comment}</p>
              )}
              
              {/* Delete button for user's own reviews */}
              {user && user.id === review.userId?._id && (
                <div className="mt-2">
                  <button
                    onClick={() => handleDeleteReview(review._id)}
                    className="text-red-600 text-sm hover:text-red-800 flex items-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete Review
                  </button>
                </div>
              )}
            </div>
          ))}
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="mx-1 px-3 py-1 border rounded disabled:opacity-50"
              >
                Previous
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`mx-1 px-3 py-1 border rounded ${
                    currentPage === page ? 'bg-blue-600 text-white' : ''
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="mx-1 px-3 py-1 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ReviewList;