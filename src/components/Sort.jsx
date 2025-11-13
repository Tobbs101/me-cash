import React from "react";

const Sort = ({ sortBy, order, onSortByChange, onOrderChange }) => {
  const sortOptions = [
    { value: "stars", label: "Stars" },
    { value: "forks", label: "Forks" },
    { value: "updated", label: "Last Updated" },
  ];

  const orderOptions = [
    { value: "desc", label: "Descending" },
    { value: "asc", label: "Ascending" },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex-1">
        <label
          htmlFor="sortBy"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Sort by
        </label>
        <select
          id="sortBy"
          value={sortBy}
          onChange={(e) => onSortByChange(e.target.value)}
          className="input-field"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1">
        <label
          htmlFor="order"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Order
        </label>
        <select
          id="order"
          value={order}
          onChange={(e) => onOrderChange(e.target.value)}
          className="input-field"
        >
          {orderOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-end">
        <div className="flex rounded-md shadow-sm">
          <button
            onClick={() => onOrderChange("desc")}
            className={`px-3 py-2 text-sm font-medium rounded-l-md border ${
              order === "desc"
                ? "bg-primary text-white border-primary"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            } transition-colors`}
            title="Descending (High to Low)"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </button>
          <button
            onClick={() => onOrderChange("asc")}
            className={`px-3 py-2 text-sm font-medium rounded-r-md border-t border-r border-b ${
              order === "asc"
                ? "bg-primary text-white border-primary"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            } transition-colors`}
            title="Ascending (Low to High)"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Sort);
