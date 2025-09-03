import api from './client';

// Create wrapper functions with correct endpoints
export const homeApi = {
  // Get all home rentals
  getAll: () => api.get('/homes'), // ✅ This will become /api/homes
  
  // Get single home rental
  getById: (id) => api.get(`/homes/${id}`), // ✅ This will become /api/homes/:id
  
  // Create home rental (JSON)
  create: (data) => api.post('/homes', data), // ✅ This will become /api/homes
  
  // Update home rental (JSON or form-data)
  update: (id, data) => api.put(`/homes/${id}`, data), // ✅ This will become /api/homes/:id
  
  // Delete home rental
  delete: (id) => api.delete(`/homes/${id}`), // ✅ This will become /api/homes/:id
  
  // Add images to home rental (form-data)
  addImages: (id, formData) => api.put(`/homes/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }), // ✅ This will become /api/homes/:id
  
  // Remove specific image
  removeImage: (homeId, imageIndex) => 
    api.delete(`/homes/${homeId}/images/${imageIndex}`) // ✅ This will become /api/homes/:homeId/images/:imageIndex
};