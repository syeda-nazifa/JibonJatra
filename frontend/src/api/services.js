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
