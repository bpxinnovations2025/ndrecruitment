"use client";

import { useState } from "react";
import { usePosts, useCategories } from "@hooks/useBlog";
import Pagination from "@components/Pagination";
import config from "@config/config.json";
import Banner from "@layouts/components/Banner";
import Cta from "@layouts/components/Cta";
import GSAPWrapper from "@layouts/components/GSAPWrapper";
import SeoMeta from "@layouts/partials/SeoMeta";
import Post from "@partials/Post";

const { blog_folder } = config.settings;

const BlogPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: postsData,
    isLoading,
    error,
  } = usePosts(currentPage, selectedCategory, searchTerm);

  console.log("Posts Data:", postsData);
  const { data: categories = [] } = useCategories();

  const { pagination } = config.settings;
  const postIndex = { frontmatter: { title: "Blog" } };
  const { frontmatter } = postIndex;
  const { title } = frontmatter;

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handleCategoryChange = (categorySlug) => {
    setSelectedCategory(categorySlug);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">
            Error loading posts
          </h2>
          <p className="text-gray-600 mt-2">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <GSAPWrapper>
      <SeoMeta title={title} />
      <section className="section pt-0">
        <Banner title={title} />

        <div className="container">
          {/* Search and Filter Section */}
          <div className="my-12">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="mb-6">
              <div className="flex gap-4 max-w-2xl mx-auto">
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="submit"
                  className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => handleCategoryChange(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  !selectedCategory
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                All Posts
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => handleCategoryChange(cat.slug)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === cat.slug
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          )}

          {/* Posts Grid - Updated to 2-column grid */}
          {!isLoading && postsData && postsData.results?.length === 0 && (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  No Posts Found
                </h3>
                <p className="text-gray-600 mb-6">
                  We couldn&apos;t find any blog posts matching your search
                  criteria. Try adjusting your filters or search terms.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => {
                      setSelectedCategory(null);
                      setSearchTerm("");
                      setCurrentPage(1);
                    }}
                    className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors"
                  >
                    Clear All Filters
                  </button>
                  <button
                    onClick={() => window.location.reload()}
                    className="border border-orange-300 hover:bg-gray-50 text-gray-700 px-6 py-3 font-medium transition-colors"
                  >
                    Refresh Posts
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Posts Grid - Updated to 2-column grid */}
          {!isLoading && postsData && postsData.results?.length > 0 && (
            <>
              <div className="pb-16 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-10">
                  {postsData.results.map((post, i) => (
                    <div key={`post-${post.id}-${i}`}>
                      <Post post={post} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Pagination */}
              {postsData.total_pages > 1 && (
                <div className="flex justify-center">
                  <Pagination
                    section={blog_folder}
                    totalPages={postsData.total_pages}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </section>
      <Cta />
    </GSAPWrapper>
  );
};

export default BlogPage;
