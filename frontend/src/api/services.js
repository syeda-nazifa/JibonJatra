import api from "../api";

// Get all services
export const fetchServices = (params) => api.get("/api/services", { params });

// Get single service
export const fetchService = (id) => api.get(`/api/services/${id}`);

// Create service
export const createServiceAPI = (data, token) =>
  api.post("/api/services", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Update service
export const updateServiceAPI = (id, data, token) =>
  api.put(`/api/services/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Delete service
export const deleteServiceAPI = (id, token) =>
  api.delete(`/api/services/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
// Review functions
export const getServiceReviews = (serviceId, page = 1, limit = 10) =>
  api.get(`/api/reviews/service/${serviceId}?page=${page}&limit=${limit}`);

export const getUserReviewForService = (serviceId, token) =>
  api.get(`/api/reviews/user-review/${serviceId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const createReview = (reviewData, token) =>
  api.post('/api/reviews', reviewData, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateReview = (reviewId, reviewData, token) =>
  api.put(`/api/reviews/${reviewId}`, reviewData, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteReview = (reviewId, token) =>
  api.delete(`/api/reviews/${reviewId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// import api from "../api";

// // Get all services
// export const fetchServices = (params) => api.get("/api/services", { params });

// // Get single service
// export const fetchService = (id) => api.get(`/api/services/${id}`);

// // Create service
// export const createServiceAPI = (data, token) =>
//   api.post("/api/services", data, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

// // Update service
// export const updateServiceAPI = (id, data, token) =>
//   api.put(`/api/services/${id}`, data, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

// // Delete service
// export const deleteServiceAPI = (id, token) =>
//   api.delete(`/api/services/${id}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

// // ADD RATING FUNCTIONS
// export const getServiceRatings = (id) => api.get(`/api/services/${id}/ratings`);

// export const getUserRating = (id, token) =>
//   api.get(`/api/services/${id}/my-rating`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

// export const addServiceRating = (id, ratingData, token) =>
//   api.post(`/api/services/${id}/rate`, ratingData, {
//     headers: { Authorization: `Bearer ${token}` },
//   });