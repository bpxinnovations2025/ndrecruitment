"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  Briefcase,
  Clock,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  Upload,
  CheckCircle,
} from "lucide-react";
import { useAuth } from "context/AuthContext";
import { useRouter } from "next/navigation";
import useAxios from "@hooks/useAxios";
import swal from "sweetalert2";

const JobOpenings = () => {
  const { isLoggedIn, user } = useAuth();
  const router = useRouter();
  const api = useAxios();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("-created_at");
  const [searchTerm, setSearchTerm] = useState("");
  const [locationTerm, setLocationTerm] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedJobForApplication, setSelectedJobForApplication] =
    useState(null);
  const [applicationForm, setApplicationForm] = useState({
    resume: null,
    cover_letter: "",
    years_of_experience: 0,
    linkedin_url: "",
    portfolio_url: "",
  });
  const [submitting, setSubmitting] = useState(false);

  // Fetch jobs when filters change
  useEffect(() => {
    fetchJobs();
  }, [currentPage, searchTerm, locationTerm, sortBy]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        search: searchTerm,
        location: locationTerm,
        ordering: sortBy,
      };

      // Remove empty parameters
      Object.keys(params).forEach((key) => {
        if (!params[key] || params[key] === "") {
          delete params[key];
        }
      });

      const response = await api.get("api/job-openings/jobs/", { params });
      setJobs(response.data.results);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      swal.fire({
        title: "Error loading jobs",
        text: "Please try again later.",
        icon: "error",
        toast: true,
        timer: 3000,
        position: "bottom-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchJobs();
  };

  const handleApply = (job) => {
    if (!isLoggedIn) {
      // Store the job ID to apply to after login
      localStorage.setItem("pending_job_application", job.id);
      swal
        .fire({
          title: "Login Required",
          text: "Please log in to apply for this job.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Login",
          cancelButtonText: "Cancel",
        })
        .then((result) => {
          if (result.isConfirmed) {
            router.push("/login");
          }
        });
      return;
    }

    setSelectedJobForApplication(job);
    setApplicationForm({
      resume: null,
      cover_letter: `I am excited to apply for the ${job.title} position at ${job.company}. With my background and experience, I believe I would be a great fit for this role.`,
      years_of_experience: 0,
      linkedin_url: "",
      portfolio_url: "",
    });
    setShowApplicationModal(true);
  };

  const handleApplicationSubmit = async (e) => {
    e.preventDefault();

    if (!applicationForm.resume) {
      swal.fire({
        title: "Resume Required",
        text: "Please upload your resume.",
        icon: "warning",
        toast: true,
        timer: 3000,
        position: "bottom-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
      return;
    }

    try {
      setSubmitting(true);

      const formData = new FormData();
      formData.append("job", selectedJobForApplication.id);
      formData.append("resume", applicationForm.resume);
      formData.append("cover_letter", applicationForm.cover_letter);
      formData.append(
        "years_of_experience",
        applicationForm.years_of_experience,
      );

      if (applicationForm.linkedin_url) {
        formData.append("linkedin_url", applicationForm.linkedin_url);
      }

      if (applicationForm.portfolio_url) {
        formData.append("portfolio_url", applicationForm.portfolio_url);
      }

      const response = await api.post(
        "api/job-openings/jobs/apply/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      swal.fire({
        title: "Application Submitted!",
        text: response.data.detail,
        icon: "success",
        toast: true,
        timer: 3000,
        position: "bottom-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });

      // Refresh jobs to update application status
      fetchJobs();
      setShowApplicationModal(false);
      setSelectedJobForApplication(null);
    } catch (error) {
      console.error("Application error:", error);
      swal.fire({
        title: "Application Failed",
        text:
          error.response?.data?.detail ||
          error.response?.data?.resume?.[0] ||
          "Please try again.",
        icon: "error",
        toast: true,
        timer: 3000,
        position: "bottom-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        swal.fire({
          title: "File Too Large",
          text: "Please upload a file smaller than 5MB.",
          icon: "error",
          toast: true,
          timer: 3000,
          position: "bottom-right",
          timerProgressBar: true,
          showConfirmButton: false,
        });
        return;
      }

      // Check file type
      const allowedTypes = [".pdf", ".doc", ".docx"];
      const fileExtension = "." + file.name.split(".").pop().toLowerCase();
      if (!allowedTypes.includes(fileExtension)) {
        swal.fire({
          title: "Invalid File Type",
          text: "Please upload a PDF, DOC, or DOCX file.",
          icon: "error",
          toast: true,
          timer: 3000,
          position: "bottom-right",
          timerProgressBar: true,
          showConfirmButton: false,
        });
        return;
      }

      setApplicationForm((prev) => ({ ...prev, resume: file }));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Pagination handlers
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Sort options mapping
  const sortOptions = {
    "Most Recent": "-created_at",
    "Highest Salary": "-salary_max",
    "Most Relevant": "-created_at",
  };

  const getJobTypeIcon = (jobType) => {
    switch (jobType) {
      case "full_time":
        return "🕒 Full-time";
      case "part_time":
        return "⏰ Part-time";
      case "contract":
        return "📝 Contract";
      case "internship":
        return "🎓 Internship";
      case "remote":
        return "🏠 Remote";
      default:
        return jobType;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Find Your Dream Job
          </h1>
          <p className="text-gray-600 text-lg">
            Discover opportunities from top companies
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-12">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Job title, keywords, or company"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="City or remote"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={locationTerm}
                onChange={(e) => setLocationTerm(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
            <button
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
              onClick={handleSearch}
              disabled={loading}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Search"
              )}
            </button>
          </div>
        </div>

        {/* Job Openings Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Job Openings {jobs.length > 0 && `(${jobs.length})`}
          </h2>
          <div className="flex items-center gap-3">
            <span className="text-gray-600">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              disabled={loading}
            >
              <option value="-created_at">Most Recent</option>
              <option value="-salary_max">Highest Salary</option>
              <option value="-created_at">Most Relevant</option>
            </select>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        )}

        {/* Job Cards Grid */}
        {!loading && (
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-6 h-6 text-orange-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {job.title}
                      </h3>
                      <p className="text-gray-600">{job.company}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>{getJobTypeIcon(job.job_type)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      <span>{job.salary_range}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">
                    {job.description.length > 150
                      ? `${job.description
                          .substring(0, 150)
                          .trim()
                          .replace(/\s+\S*$/, "")}...`
                      : job.description}
                  </p>

                  {/* Requirements Section - ADD THIS */}
                  {job.requirements && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">
                        Requirements:
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {job.requirements
                          .split("\n")
                          .filter((req) => req.trim())
                          .slice(0, 3)
                          .map((requirement, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-orange-500 mr-2">•</span>
                              <span>{requirement.trim()}</span>
                            </li>
                          ))}
                        {job.requirements
                          .split("\n")
                          .filter((req) => req.trim()).length > 3 && (
                          <li className="text-gray-500 text-xs">
                            +
                            {job.requirements
                              .split("\n")
                              .filter((req) => req.trim()).length - 3}{" "}
                            more requirements
                          </li>
                        )}
                      </ul>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {job.posted_date}
                    </span>
                    <button
                      className={`px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                        job.has_applied
                          ? "bg-green-500 text-white cursor-not-allowed"
                          : "bg-orange-500 hover:bg-orange-600 text-white"
                      }`}
                      onClick={() => handleApply(job)}
                      disabled={job.has_applied || loading}
                    >
                      {job.has_applied ? (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          Applied
                        </>
                      ) : (
                        "Apply Now"
                      )}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2">
                <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                  <div className="max-w-md mx-auto">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Briefcase className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      No Job Openings Found
                    </h3>
                    <p className="text-gray-600 mb-6">
                      We couldn&apos;t find any job openings matching your
                      criteria. Try adjusting your search filters or check back
                      later for new opportunities.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button
                        onClick={() => {
                          setSearchTerm("");
                          setLocationTerm("");
                          setCurrentPage(1);
                          fetchJobs();
                        }}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                      >
                        Clear All Filters
                      </button>
                      <button
                        onClick={fetchJobs}
                        className="border border-orange-300 hover:bg-gray-50 text-gray-700 px-6 py-3 font-medium transition-colors"
                      >
                        Refresh Jobs
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center items-center gap-2">
            <button
              className={`p-2 rounded-lg border border-gray-300 transition-colors ${
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-50"
              }`}
              onClick={handlePrevPage}
              disabled={currentPage === 1 || loading}
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  className={`w-10 h-10 rounded-lg border font-medium transition-colors ${
                    currentPage === pageNum
                      ? "bg-orange-500 text-white border-orange-500"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => handlePageChange(pageNum)}
                  disabled={loading}
                >
                  {pageNum}
                </button>
              );
            })}

            {totalPages > 5 && currentPage < totalPages - 2 && (
              <span className="px-2 text-gray-500">...</span>
            )}

            {totalPages > 5 && currentPage < totalPages - 2 && (
              <button
                className={`w-10 h-10 rounded-lg border border-gray-300 font-medium transition-colors hover:bg-gray-50 text-gray-700`}
                onClick={() => handlePageChange(totalPages)}
                disabled={loading}
              >
                {totalPages}
              </button>
            )}

            <button
              className={`p-2 rounded-lg border border-gray-300 transition-colors ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-50"
              }`}
              onClick={handleNextPage}
              disabled={currentPage === totalPages || loading}
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        )}

        {/* Application Modal */}
        {showApplicationModal && selectedJobForApplication && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Apply for {selectedJobForApplication.title}
                  </h3>
                  <button
                    onClick={() => setShowApplicationModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleApplicationSubmit} className="space-y-6">
                  {/* Resume Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Resume *
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <input
                        type="file"
                        id="resume"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <label htmlFor="resume" className="cursor-pointer">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-600 mb-2">
                          {applicationForm.resume
                            ? applicationForm.resume.name
                            : "Click to upload your resume"}
                        </p>
                        <p className="text-sm text-gray-500">
                          PDF, DOC, DOCX (Max 5MB)
                        </p>
                      </label>
                    </div>
                  </div>

                  {/* Cover Letter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cover Letter
                    </label>
                    <textarea
                      value={applicationForm.cover_letter}
                      onChange={(e) =>
                        setApplicationForm((prev) => ({
                          ...prev,
                          cover_letter: e.target.value,
                        }))
                      }
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Tell us why you're a great fit for this position..."
                    />
                  </div>

                  {/* Years of Experience */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Years of Experience
                    </label>
                    <input
                      type="number"
                      value={applicationForm.years_of_experience}
                      onChange={(e) =>
                        setApplicationForm((prev) => ({
                          ...prev,
                          years_of_experience: parseInt(e.target.value) || 0,
                        }))
                      }
                      min="0"
                      max="50"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  {/* LinkedIn URL */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      LinkedIn Profile (Optional)
                    </label>
                    <input
                      type="url"
                      value={applicationForm.linkedin_url}
                      onChange={(e) =>
                        setApplicationForm((prev) => ({
                          ...prev,
                          linkedin_url: e.target.value,
                        }))
                      }
                      placeholder="https://linkedin.com/in/yourprofile"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  {/* Portfolio URL */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Portfolio URL (Optional)
                    </label>
                    <input
                      type="url"
                      value={applicationForm.portfolio_url}
                      onChange={(e) =>
                        setApplicationForm((prev) => ({
                          ...prev,
                          portfolio_url: e.target.value,
                        }))
                      }
                      placeholder="https://yourportfolio.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowApplicationModal(false)}
                      className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!applicationForm.resume || submitting}
                      className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
                    >
                      {submitting ? (
                        <div className="flex items-center">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Submitting...
                        </div>
                      ) : (
                        "Submit Application"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobOpenings;
