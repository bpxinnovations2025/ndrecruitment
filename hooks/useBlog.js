// hooks/useBlog.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { blogApi } from '@lib/blogApi'; // Using the public API version

// Get paginated posts
export const usePosts = (page = 1, category = null, search = '') => {
  return useQuery({
    queryKey: ['posts', page, category, search],
    queryFn: () => blogApi.getPosts(page, category, search),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Get single post
export const usePost = (slug) => {
  return useQuery({
    queryKey: ['post', slug],
    queryFn: () => blogApi.getPost(slug),
    enabled: !!slug, // Only run if slug exists
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Get recent posts
export const useRecentPosts = () => {
  return useQuery({
    queryKey: ['recent-posts'],
    queryFn: blogApi.getRecentPosts,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Get categories
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: blogApi.getCategories,
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
};