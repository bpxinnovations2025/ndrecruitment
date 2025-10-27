// lib/blogApi.js
import { baseUrl } from '@hooks/useAxios';
import axios from 'axios';

// Create a base axios instance for public endpoints
const publicApi = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
});

export const blogApi = {
  // Get paginated posts
  getPosts: async (page = 1, category = null, search = '') => {
    const params = { page };
    if (category) params.category = category;
    if (search) params.search = search;
    
    const response = await publicApi.get('api/blogs/posts/', { params });
    return response.data;
  },

  // Get single post by slug
  getPost: async (slug) => {
    const response = await publicApi.get(`api/blogs/posts/${slug}/`);
    return response.data;
  },

  // Get recent posts
  getRecentPosts: async () => {
    const response = await publicApi.get('api/blogs/recent-posts/');
    return response.data;
  },

  // Get categories
  getCategories: async () => {
    const response = await publicApi.get('api/blogs/categories/');
    return response.data;
  }
};