import React, { useMemo, useCallback } from "react";
import SearchBar from "./components/SearchBar.jsx";
import Filters from "./components/Filters.jsx";
import Sort from "./components/Sort.jsx";
import RepositoryList from "./components/RepositoryList.jsx";
import Pagination from "./components/Pagination.jsx";
import { useFilters } from "./hooks/useFilters.js";
import { useGitHubApi } from "./hooks/useGitHubApi.js";

function App() {
  const {
    filters,
    setQuery,
    setLanguage,
    setLicense,
    setStarsMin,
    setStarsMax,
    setSortBy,
    setOrder,
    setPage,
    resetFilters,
  } = useFilters();

  const { data, loading, error, refetch } = useGitHubApi(filters);

  const handleSearchChange = useCallback(
    (query) => {
      setQuery(query);
    },
    [setQuery]
  );

  const handleLanguageChange = useCallback(
    (language) => {
      setLanguage(language);
    },
    [setLanguage]
  );

  const handleLicenseChange = useCallback(
    (license) => {
      setLicense(license);
    },
    [setLicense]
  );

  const handleStarsMinChange = useCallback(
    (min) => {
      setStarsMin(min);
    },
    [setStarsMin]
  );

  const handleStarsMaxChange = useCallback(
    (max) => {
      setStarsMax(max);
    },
    [setStarsMax]
  );

  const handleSortByChange = useCallback(
    (sortBy) => {
      setSortBy(sortBy);
    },
    [setSortBy]
  );

  const handleOrderChange = useCallback(
    (order) => {
      setOrder(order);
    },
    [setOrder]
  );

  const handlePageChange = useCallback(
    (page) => {
      setPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [setPage]
  );

  const handleResetFilters = useCallback(() => {
    resetFilters();
  }, [resetFilters]);

  const repositories = useMemo(() => data?.items || [], [data?.items]);
  const totalCount = useMemo(() => data?.total_count || 0, [data?.total_count]);

  const isInitialLoad = loading && !data;
  const isPaginating = loading && data;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                GitHub Explorer
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Discover and explore public repositories on GitHub
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {error && (
                <button onClick={refetch} className="btn-secondary text-sm">
                  Retry
                </button>
              )}
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="GitHub"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="space-y-6 sticky top-4">
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Search
                </h3>
                <SearchBar
                  value={filters.query}
                  onChange={handleSearchChange}
                  placeholder="Search repositories..."
                />
              </div>

              <Filters
                language={filters.language}
                license={filters.license}
                starsMin={filters.starsMin}
                starsMax={filters.starsMax}
                onLanguageChange={handleLanguageChange}
                onLicenseChange={handleLicenseChange}
                onStarsMinChange={handleStarsMinChange}
                onStarsMaxChange={handleStarsMaxChange}
                onReset={handleResetFilters}
              />

              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Sort
                </h3>
                <Sort
                  sortBy={filters.sortBy}
                  order={filters.order}
                  onSortByChange={handleSortByChange}
                  onOrderChange={handleOrderChange}
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="space-y-6">
              {!isInitialLoad && (
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    {totalCount > 0 && (
                      <>
                        Showing {repositories.length} of{" "}
                        {totalCount.toLocaleString()} repositories
                        {isPaginating && (
                          <span className="ml-2">
                            <svg
                              className="inline w-4 h-4 animate-spin"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                              />
                            </svg>
                          </span>
                        )}
                      </>
                    )}
                  </div>
                  <div className="text-sm text-gray-500">
                    Page {filters.page} of{" "}
                    {Math.ceil(totalCount / filters.perPage)}
                  </div>
                </div>
              )}

              <RepositoryList
                repositories={repositories}
                loading={isInitialLoad}
                error={error}
              />

              {!error && !isInitialLoad && totalCount > 0 && (
                <Pagination
                  currentPage={filters.page}
                  totalCount={totalCount}
                  perPage={filters.perPage}
                  onPageChange={handlePageChange}
                />
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-500">
            <p>Built with ❤️ using React, Tailwind CSS, and GitHub API</p>
            <p className="mt-1">
              Data provided by{" "}
              <a
                href="https://docs.github.com/en/rest"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-800 transition-colors"
              >
                GitHub REST API
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
