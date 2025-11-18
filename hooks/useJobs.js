import useSWR from 'swr';
import useAxios from './useAxios';

export const useJob = (jobId) => {
  const api = useAxios();
  
  const fetcher = async () => {
    const response = await api.get(`api/job-openings/jobs/${jobId}/`);
    return response.data;
  };

  const { data, error, isLoading } = useSWR(
    jobId ? `api/job-openings/jobs/${jobId}/` : null,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    data,
    isLoading,
    error: error?.response?.data || error,
  };
};

export const useRelatedJobs = (jobId) => {
  const api = useAxios();
  
  const fetcher = async () => {
    // For now, we'll fetch all jobs and filter by same company
    // You might want to create a proper related jobs endpoint later
    const response = await api.get(`api/job-openings/jobs/`);
    const currentJob = response.data.results.find(job => job.id === jobId);
    
    if (!currentJob) return [];
    
    // Filter jobs from same company, excluding current job
    return response.data.results.filter(job => 
      job.company === currentJob.company && job.id !== jobId
    ).slice(0, 3);
  };

  const { data, error, isLoading } = useSWR(
    jobId ? `api/job-openings/jobs/related/${jobId}/` : null,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    data: data || [],
    isLoading,
    error: error?.response?.data || error,
  };
};