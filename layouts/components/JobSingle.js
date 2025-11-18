"use client";
import dateFormat from "@lib/utils/dateFormat";
import Cta from "@components/Cta";
import SeoMeta from "@partials/SeoMeta";
import {
  MapPin,
  Briefcase,
  Clock,
  DollarSign,
  Building,
  Calendar,
  ArrowLeft,
  Share2,
  Bookmark,
  ChevronLeft,
  Upload,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "context/AuthContext";
import { useRouter } from "next/navigation";
import useAxios from "@hooks/useAxios";
import { useState } from "react";
import swal from "sweetalert2";
import Banner from "./Banner";

const JobSingle = ({ job, relatedJobs }) => {
  const { isLoggedIn, user } = useAuth();
  const router = useRouter();
  const api = useAxios();
  const [isApplying, setIsApplying] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [applicationForm, setApplicationForm] = useState({
    resume: null,
    cover_letter: "",
    years_of_experience: 0,
    linkedin_url: "",
    portfolio_url: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const {
    id,
    title,
    company,
    location,
    job_type,
    salary_range,
    description,
    requirements,
    is_active,
    has_applied,
  } = job;

  const getJobTypeIcon = (jobType) => {
    switch (jobType) {
      case "full_time":
        return { icon: "🕒", text: "Full-time" };
      case "part_time":
        return { icon: "⏰", text: "Part-time" };
      case "contract":
        return { icon: "📝", text: "Contract" };
      case "internship":
        return { icon: "🎓", text: "Internship" };
      case "remote":
        return { icon: "🏠", text: "Remote" };
      default:
        return { icon: "💼", text: jobType };
    }
  };

  const handleApplyClick = () => {
    if (!isLoggedIn) {
      // Store the job ID to apply to after login
      localStorage.setItem("pending_job_application", id);
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

    // Show application modal instead of direct apply
    setApplicationForm({
      resume: null,
      cover_letter: `I am excited to apply for the ${title} position at ${company}. With my background and experience, I believe I would be a great fit for this role.`,
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
      formData.append("job", id);
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

      // Update job data to reflect application
      job.has_applied = true;
      setShowApplicationModal(false);
      setApplicationForm({
        resume: null,
        cover_letter: "",
        years_of_experience: 0,
        linkedin_url: "",
        portfolio_url: "",
      });
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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${title} at ${company}`,
          text: `Check out this job opportunity: ${title} at ${company}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        swal.fire({
          title: "Link Copied!",
          text: "Job link copied to clipboard",
          icon: "success",
          toast: true,
          timer: 2000,
          position: "bottom-right",
          timerProgressBar: true,
          showConfirmButton: false,
        });
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    }
  };

  const handleSave = () => {
    const savedJobs = JSON.parse(localStorage.getItem("savedJobs") || "[]");

    if (isSaved) {
      // Remove from saved
      const filtered = savedJobs.filter((job) => job.id !== id);
      localStorage.setItem("savedJobs", JSON.stringify(filtered));
      setIsSaved(false);
      swal.fire({
        title: "Removed!",
        text: "Job removed from saved items",
        icon: "info",
        toast: true,
        timer: 2000,
        position: "bottom-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } else {
      // Add to saved
      const jobData = {
        id,
        title,
        company,
        location,
        job_type,
        salary_range,
        savedAt: new Date().toISOString(),
      };
      savedJobs.push(jobData);
      localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
      setIsSaved(true);
      swal.fire({
        title: "Saved!",
        text: "Job saved successfully",
        icon: "success",
        toast: true,
        timer: 2000,
        position: "bottom-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };

  // Check if job is already saved on component mount
  useState(() => {
    const savedJobs = JSON.parse(localStorage.getItem("savedJobs") || "[]");
    const isJobSaved = savedJobs.some((job) => job.id === id);
    setIsSaved(isJobSaved);
  }, [id]);

  // Format requirements for display
  const formatRequirements = (reqs) => {
    if (!reqs) return [];
    return reqs.split("\n").filter((item) => item.trim());
  };

  return (
    <>
      <SeoMeta
        title={`${title} at ${company} - Job Opportunity`}
        description={
          description?.substring(0, 160) ||
          `Apply for ${title} at ${company}. ${job_type} position in ${location}.`
        }
      />

      <Banner title={title} />

      <section className="section pt-0">
        <div className="container">
          {/* Back Button */}
          <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4 max-w-7xl">
              {/* Back Button */}
              <div className="mb-6">
                <button
                  onClick={() => router.push("/jobs-and-careers")}
                  className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-all hover:gap-3 group"
                >
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  <span className="font-medium">Back to Jobs</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                {/* Main Content - Takes 8 columns on large screens */}
                <div className="lg:col-span-8 space-y-6">
                  {/* Job Header Card */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Company Logo/Icon */}
                      <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                        <Briefcase className="w-10 h-10 text-orange-600" />
                      </div>

                      {/* Job Info */}
                      <div className="flex-1 min-w-0">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 leading-tight">
                          {title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-4">
                          <div className="flex items-center gap-2">
                            <Building className="w-5 h-5 text-gray-400 flex-shrink-0" />
                            <span className="text-base md:text-lg font-semibold text-gray-700 truncate">
                              {company}
                            </span>
                          </div>
                          <span className="hidden md:inline text-gray-300">
                            •
                          </span>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0" />
                            <span className="text-gray-600">{location}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <span className="inline-flex items-center bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-sm font-medium border border-blue-100">
                            {getJobTypeIcon(job_type).text}
                          </span>
                          {salary_range && (
                            <span className="inline-flex items-center bg-green-50 text-green-700 px-3 py-1.5 rounded-lg text-sm font-medium border border-green-100">
                              <DollarSign className="w-4 h-4 mr-1" />
                              {salary_range}
                            </span>
                          )}
                          <span
                            className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium border ${
                              is_active
                                ? "bg-green-50 text-green-700 border-green-100"
                                : "bg-red-50 text-red-700 border-red-100"
                            }`}
                          >
                            {is_active ? "Active Hiring" : "Position Closed"}
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons - Desktop */}
                      <div className="hidden md:flex flex-col gap-3 min-w-[160px]">
                        <button
                          onClick={handleApplyClick}
                          disabled={has_applied || !is_active}
                          className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 shadow-sm ${
                            has_applied
                              ? "bg-green-600 text-white cursor-not-allowed"
                              : !is_active
                                ? "bg-gray-400 text-white cursor-not-allowed"
                                : "bg-orange-500 hover:bg-orange-600 text-white hover:shadow-md transform hover:-translate-y-0.5"
                          }`}
                        >
                          {has_applied ? (
                            <>
                              <CheckCircle className="w-4 h-4" />
                              Applied
                            </>
                          ) : !is_active ? (
                            "Closed"
                          ) : (
                            "Apply Now"
                          )}
                        </button>

                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={handleShare}
                            className="border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 hover:border-orange-500 hover:text-orange-600 transition-all flex items-center justify-center gap-1.5"
                            title="Share this job"
                          >
                            <Share2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={handleSave}
                            className={`border px-3 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                              isSaved
                                ? "bg-orange-500 border-orange-500 text-white hover:bg-orange-600"
                                : "border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-orange-500 hover:text-orange-600"
                            }`}
                            title={
                              isSaved ? "Remove from saved" : "Save this job"
                            }
                          >
                            <Bookmark
                              className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Mobile Action Buttons */}
                    <div className="md:hidden mt-6 space-y-3">
                      <button
                        onClick={handleApplyClick}
                        disabled={has_applied || !is_active}
                        className={`w-full px-6 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                          has_applied
                            ? "bg-green-600 text-white cursor-not-allowed"
                            : !is_active
                              ? "bg-gray-400 text-white cursor-not-allowed"
                              : "bg-orange-500 hover:bg-orange-600 text-white"
                        }`}
                      >
                        {has_applied ? (
                          <>
                            <CheckCircle className="w-4 h-4" />
                            Applied Successfully
                          </>
                        ) : !is_active ? (
                          "Position Closed"
                        ) : (
                          "Apply for this Position"
                        )}
                      </button>

                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={handleShare}
                          className="border border-gray-300 text-gray-700 px-4 py-2.5 rounded-lg hover:bg-gray-50 hover:border-orange-500 hover:text-orange-600 transition-all flex items-center justify-center gap-2"
                        >
                          <Share2 className="w-4 h-4" />
                          <span>Share</span>
                        </button>
                        <button
                          onClick={handleSave}
                          className={`border px-4 py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 ${
                            isSaved
                              ? "bg-orange-500 border-orange-500 text-white hover:bg-orange-600"
                              : "border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-orange-500 hover:text-orange-600"
                          }`}
                        >
                          <Bookmark
                            className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`}
                          />
                          <span>{isSaved ? "Saved" : "Save"}</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Key Information Grid */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                      Job Highlights
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-orange-50 border border-orange-100">
                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <DollarSign className="w-5 h-5 text-orange-600" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-orange-700 font-medium mb-1">
                            Salary Range
                          </p>
                          <p className="font-semibold text-gray-900 text-sm truncate">
                            {salary_range || "Competitive"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 border border-blue-100">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Clock className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-blue-700 font-medium mb-1">
                            Job Type
                          </p>
                          <p className="font-semibold text-gray-900 text-sm truncate">
                            {getJobTypeIcon(job_type).text}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 rounded-lg bg-green-50 border border-green-100">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Calendar className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-green-700 font-medium mb-1">
                            Posted Date
                          </p>
                          <p className="font-semibold text-gray-900 text-sm truncate">
                            {job.posted_date}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 rounded-lg bg-purple-50 border border-purple-100">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Briefcase className="w-5 h-5 text-purple-600" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-purple-700 font-medium mb-1">
                            Status
                          </p>
                          <p
                            className={`font-semibold text-sm truncate ${is_active ? "text-green-600" : "text-red-600"}`}
                          >
                            {is_active ? "Open" : "Closed"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Job Description */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <div className="w-1 h-6 bg-orange-500 rounded-full"></div>
                      Job Description
                    </h2>
                    <div className="prose prose-gray max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-li:text-gray-600">
                      {description ? (
                        <div
                          dangerouslySetInnerHTML={{ __html: description }}
                        />
                      ) : (
                        <p className="text-gray-500 italic">
                          No description available.
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Requirements */}
                  {requirements && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <div className="w-1 h-6 bg-orange-500 rounded-full"></div>
                        Requirements
                      </h2>
                      <ul className="space-y-3">
                        {formatRequirements(requirements).map(
                          (requirement, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-3 group"
                            >
                              <span className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-sm font-semibold group-hover:bg-orange-500 group-hover:text-white transition-colors">
                                {index + 1}
                              </span>
                              <span className="text-gray-700 leading-relaxed">
                                {requirement}
                              </span>
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Sidebar - Takes 4 columns on large screens */}
                <div className="lg:col-span-4">
                  <div className="lg:sticky lg:top-8 space-y-6">
                    {/* Quick Apply Card */}
                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
                      <h3 className="text-lg font-semibold mb-2">
                        Ready to Apply?
                      </h3>
                      <p className="text-orange-100 text-sm mb-4">
                        Join our team and start your career journey today.
                      </p>
                      <button
                        onClick={handleApplyClick}
                        disabled={has_applied || !is_active}
                        className={`w-full px-6 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                          has_applied
                            ? "bg-green-600 text-white cursor-not-allowed"
                            : !is_active
                              ? "bg-gray-400 text-white cursor-not-allowed"
                              : "bg-white text-orange-600 hover:bg-orange-50 shadow-md hover:shadow-xl transform hover:-translate-y-0.5"
                        }`}
                      >
                        {has_applied ? (
                          <>
                            <CheckCircle className="w-5 h-5" />
                            Application Submitted
                          </>
                        ) : !is_active ? (
                          "Position Closed"
                        ) : (
                          <>
                            Apply for this Job
                            <ArrowRight className="w-5 h-5" />
                          </>
                        )}
                      </button>
                    </div>

                    {/* Company Info Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        About {company}
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <MapPin className="w-4 h-4 text-gray-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 mb-0.5">
                              Location
                            </p>
                            <p className="text-gray-900 font-medium">
                              {location}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Job Overview Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Job Overview
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="text-gray-600 text-sm">
                            Job Type
                          </span>
                          <span className="font-medium text-gray-900">
                            {getJobTypeIcon(job_type).text}
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="text-gray-600 text-sm">Salary</span>
                          <span className="font-medium text-gray-900">
                            {salary_range || "Competitive"}
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="text-gray-600 text-sm">
                            Location
                          </span>
                          <span className="font-medium text-gray-900 truncate ml-2">
                            {location}
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="text-gray-600 text-sm">Status</span>
                          <span
                            className={`font-medium px-2 py-1 rounded text-sm ${
                              is_active
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {is_active ? "Active" : "Closed"}
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                          <span className="text-gray-600 text-sm">Posted</span>
                          <span className="font-medium text-gray-900">
                            {job.posted_date}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Share Card */}
                    <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Share this job
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Help others discover this opportunity
                      </p>
                      <div className="space-y-2">
                        <button
                          onClick={handleShare}
                          className="w-full border-2 border-gray-300 text-gray-700 px-4 py-2.5 rounded-lg hover:bg-white hover:border-orange-500 hover:text-orange-600 transition-all flex items-center justify-center gap-2 font-medium"
                        >
                          <Share2 className="w-4 h-4" />
                          Share Job Posting
                        </button>
                        <button
                          onClick={handleSave}
                          className={`w-full border-2 px-4 py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 font-medium ${
                            isSaved
                              ? "bg-orange-500 border-orange-500 text-white hover:bg-orange-600 hover:border-orange-600"
                              : "border-gray-300 text-gray-700 hover:bg-white hover:border-orange-500 hover:text-orange-600"
                          }`}
                        >
                          <Bookmark
                            className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`}
                          />
                          {isSaved ? "Saved to My Jobs" : "Save for Later"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Application Modal */}
          {showApplicationModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">
                      Apply for {title}
                    </h3>
                    <button
                      onClick={() => setShowApplicationModal(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                  </div>

                  <form
                    onSubmit={handleApplicationSubmit}
                    className="space-y-6"
                  >
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
      </section>

      <Cta />
    </>
  );
};

export default JobSingle;
