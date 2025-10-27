// hooks/useJobsQuery.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxios from '@hooks/useAxios';

export const useJobsQuery = (params) => {
  const api = useAxios();
  
  return useQuery({
    queryKey: ['jobs', params],
    queryFn: async () => {
      const response = await api.get('api/job-openings/jobs/', { 
        params: {
          page: params?.page || 1,
          search: params?.search || '',
          location: params?.location || '',
          ordering: params?.ordering || '-created_at'
        }
      });
      return response.data;
    },
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useJobApplicationMutation = () => {
  const api = useAxios();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (formData) => {
      const response = await api.post('api/job-openings/jobs/apply/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
    onSuccess: () => {
      // Invalidate jobs query to refresh data
      queryClient.invalidateQueries(['jobs']);
    },
  });
};