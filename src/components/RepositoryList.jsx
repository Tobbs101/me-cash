import React from "react";

const RepositorySkeleton = () => {
  return (
    <div className="card animate-pulse">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="h-6 w-16 bg-gray-200 rounded"></div>
      </div>

      <div className="mb-4">
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="h-4 w-4 bg-gray-200 rounded mr-1"></div>
            <div className="h-4 bg-gray-200 rounded w-8"></div>
          </div>
          <div className="flex items-center">
            <div className="h-4 w-4 bg-gray-200 rounded mr-1"></div>
            <div className="h-4 bg-gray-200 rounded w-8"></div>
          </div>
        </div>
        <div className="h-4 bg-gray-200 rounded w-20"></div>
      </div>
    </div>
  );
};

const RepositoryCard = ({ repository }) => {
  const {
    name,
    full_name,
    description,
    html_url,
    stargazers_count,
    forks_count,
    language,
    license,
    updated_at,
    owner,
  } = repository;

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num.toString();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} month${months > 1 ? "s" : ""} ago`;
    } else {
      const years = Math.floor(diffDays / 365);
      return `${years} year${years > 1 ? "s" : ""} ago`;
    }
  };

  return (
    <div className="card hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <img
              src={owner.avatar_url}
              alt={`${owner.login} avatar`}
              className="w-6 h-6 rounded-full"
              loading="lazy"
            />
            <a
              href={html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold text-primary hover:text-primary-800 transition-colors truncate"
            >
              {full_name}
            </a>
          </div>
        </div>
        {language && (
          <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
            {language}
          </span>
        )}
      </div>

      {description && (
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
      )}

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <svg
              className="w-4 h-4 mr-1 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>{formatNumber(stargazers_count)}</span>
          </div>

          <div className="flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414L2.586 8l3.707-3.707a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>{formatNumber(forks_count)}</span>
          </div>

          {license && (
            <div className="flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{license.name}</span>
            </div>
          )}
        </div>

        <span className="text-xs">Updated {formatDate(updated_at)}</span>
      </div>
    </div>
  );
};

const RepositoryList = ({ repositories = [], loading, error }) => {
  if (error) {
    return (
      <div className="card text-center py-12">
        <div className="text-red-500 mb-4">
          <svg
            className="w-12 h-12 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Error Loading Repositories
        </h3>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }, (_, index) => (
          <RepositorySkeleton key={index} />
        ))}
      </div>
    );
  }

  if (repositories.length === 0) {
    return (
      <div className="card text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg
            className="w-12 h-12 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No Repositories Found
        </h3>
        <p className="text-gray-600">
          Try adjusting your search terms or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {repositories.map((repo) => (
        <RepositoryCard key={repo.id} repository={repo} />
      ))}
    </div>
  );
};

export default React.memo(RepositoryList);
export { RepositorySkeleton, RepositoryCard };
