"use client";

import { useJob, useRelatedJobs } from '@hooks/useJobs';
import config from "@config/config.json";
import GSAPWrapper from "@layouts/components/GSAPWrapper";
import JobSingle from "@components/JobSingle";
import { useParams } from 'next/navigation';

const JobPage = () => {
  const params = useParams();
  const { slug } = params;
  
  // Since your API uses ID (pk) not slug, we'll use the slug as the ID
  const jobId = slug;
  
  const { data: job, isLoading: jobLoading, error: jobError } = useJob(jobId);
  const { data: relatedJobs = [], isLoading: relatedLoading } = useRelatedJobs(jobId);


  if (jobLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (jobError || !job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">Job not found</h2>
          <p className="text-gray-600 mt-2">The job you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      </div>
    );
  }

  return (
    <GSAPWrapper>
      <JobSingle
        job={job}
        relatedJobs={relatedJobs}
      />
    </GSAPWrapper>
  );
};

export default JobPage;