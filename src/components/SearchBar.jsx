import React, { useState, useCallback, useEffect } from "react";
import { debounce } from "../utils/index.js";

const SearchBar = ({
  value,
  onChange,
  placeholder = "Search repositories...",
  className = "",
}) => {
  const [inputValue, setInputValue] = useState(value);

  const debouncedOnChange = useCallback(
    debounce((newValue) => {
      onChange(newValue);
    }, 500),
    [onChange]
  );

  const handleInputChange = useCallback(
    (e) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      debouncedOnChange(newValue);
    },
    [debouncedOnChange]
  );

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg
          className="h-5 w-5 text-gray-400"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="input-field pl-10 pr-4"
        aria-label="Search repositories"
      />
      {inputValue && (
        <button
          onClick={() => {
            setInputValue("");
            onChange("");
          }}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          aria-label="Clear search"
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
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      )}
    </div>
  );
};

export default React.memo(SearchBar);
