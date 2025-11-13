import React, { useMemo } from "react";

const Pagination = ({
  currentPage,
  totalCount,
  perPage,
  onPageChange,
  maxVisiblePages = 5,
}) => {
  const totalPages = Math.ceil(totalCount / perPage);

  const pageNumbers = useMemo(() => {
    const delta = Math.floor(maxVisiblePages / 2);
    const range = [];
    const rangeWithDots = [];

    let start = Math.max(1, currentPage - delta);
    let end = Math.min(totalPages, currentPage + delta);

    if (end - start + 1 < maxVisiblePages) {
      if (start === 1) {
        end = Math.min(totalPages, start + maxVisiblePages - 1);
      } else {
        start = Math.max(1, end - maxVisiblePages + 1);
      }
    }

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    if (start > 1) {
      rangeWithDots.push(1);
      if (start > 2) {
        rangeWithDots.push("...");
      }
    }

    rangeWithDots.push(...range);

    if (end < totalPages) {
      if (end < totalPages - 1) {
        rangeWithDots.push("...");
      }
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  }, [currentPage, totalPages, maxVisiblePages]);

  if (totalPages <= 1) {
    return null;
  }

  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <div className="flex items-center justify-between bg-white px-4 py-3 sm:px-6 border-t border-gray-200">
      <div className="flex-1 flex justify-between sm:hidden">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!canGoPrevious}
          className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
            canGoPrevious
              ? "text-gray-700 bg-white hover:bg-gray-50"
              : "text-gray-400 bg-gray-100 cursor-not-allowed"
          }`}
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!canGoNext}
          className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
            canGoNext
              ? "text-gray-700 bg-white hover:bg-gray-50"
              : "text-gray-400 bg-gray-100 cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </div>

      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {Math.min((currentPage - 1) * perPage + 1, totalCount)}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {Math.min(currentPage * perPage, totalCount)}
            </span>{" "}
            of{" "}
            <span className="font-medium">{totalCount.toLocaleString()}</span>{" "}
            results
          </p>
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={!canGoPrevious}
              className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 text-sm font-medium ${
                canGoPrevious
                  ? "text-gray-500 bg-white hover:bg-gray-50"
                  : "text-gray-300 bg-gray-100 cursor-not-allowed"
              }`}
              aria-label="Previous page"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {pageNumbers.map((pageNum, index) => {
              if (pageNum === "...") {
                return (
                  <span
                    key={`ellipsis-${index}`}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                  >
                    ...
                  </span>
                );
              }

              const isActive = pageNum === currentPage;
              return (
                <button
                  key={pageNum}
                  onClick={() => onPageChange(pageNum)}
                  className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                    isActive
                      ? "z-10 bg-primary border-primary text-white"
                      : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                  }`}
                  aria-label={`Go to page ${pageNum}`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={!canGoNext}
              className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 text-sm font-medium ${
                canGoNext
                  ? "text-gray-500 bg-white hover:bg-gray-50"
                  : "text-gray-300 bg-gray-100 cursor-not-allowed"
              }`}
              aria-label="Next page"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Pagination);
