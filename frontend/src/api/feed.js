// frontend/src/api/feed.js
import api from './client.js'; // Import default export

export const feedAPI = {
  // Get complete feed with all content types
  getFeed: (page = 1, limit = 10) => 
    api.get(`/feed?page=${page}&limit=${limit}`),
  
  // Get filtered feed by content type
  getFilteredFeed: (type, page = 1, limit = 10) => 
    api.get(`/feed/filter/${type}?page=${page}&limit=${limit}`),
};