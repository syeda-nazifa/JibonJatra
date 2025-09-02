import api from './client.js';

export const sponsoredAPI = {
  // Get all active sponsored posts (for users)
  getSponsoredPosts: () => api.get('/sponsored-posts'),
  
  // Get all sponsored posts (admin view)
  getAllSponsoredPosts: () => api.get('/sponsored-posts/admin/all'),
  
  // Get single sponsored post
  getSponsoredPost: (id) => api.get(`/sponsored-posts/${id}`),
  
  // Create sponsored post
  createSponsoredPost: (formData) => api.post('/sponsored-posts', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  
  // Update sponsored post
  updateSponsoredPost: (id, formData) => api.put(`/sponsored-posts/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  
  // Delete sponsored post
  deleteSponsoredPost: (id) => api.delete(`/sponsored-posts/${id}`)
};