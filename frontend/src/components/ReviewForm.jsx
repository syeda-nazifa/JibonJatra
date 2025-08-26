import React, { useState } from 'react';
import { createReview, updateReview } from '../api/services';
import Rating from './Rating';

const ReviewForm = ({ serviceId, existingReview, onReviewSubmitted, token }) => {
  const [rating, setRating] = useState(existingReview?.rating || 0);
  const [comment, setComment] = useState(existingReview?.comment || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      if (existingReview) {
        // Update existing review
        await updateReview(existingReview._id, { rating, comment }, token);
      } else {
        // Create new review
        await createReview({ serviceId, rating, comment }, token);
      }

      setRating(0);
      setComment('');
      if (onReviewSubmitted) {
        onReviewSubmitted();
      }
    } catch (err) {
    //   setError(err.response?.data?.message || 'Error submitting review');
    console.error('Review error details:', err);
  console.error('Response data:', err.response?.data);
  setError(err.response?.data?.message || 'Error submitting review');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-semibold mb-3">
        {existingReview ? 'Edit Your Review' : 'Write a Review'}
      </h3>
      {error && <div className="text-red-500 mb-3">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Your Rating</label>
          <Rating
            rating={rating}
            onRatingChange={setRating}
            editable={true}
            size={24}
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="comment" className="block text-sm font-medium mb-1">
            Your Review
          </label>
          <textarea
            id="comment"
            rows="3"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Share your experience with this service..."
            maxLength="500"
          />
          <div className="text-xs text-gray-500 text-right mt-1">
            {comment.length}/500 characters
          </div>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting || rating === 0}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : (existingReview ? 'Update Review' : 'Submit Review')}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;