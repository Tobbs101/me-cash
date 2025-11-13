export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "k";
  }
  return num.toString();
};

export const formatDate = (dateString) => {
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

export const buildSearchQuery = (filters) => {
  let query = filters.query || "react";

  if (filters.language && filters.language !== "any") {
    query += ` language:${filters.language}`;
  }

  if (filters.license && filters.license !== "any") {
    query += ` license:${filters.license}`;
  }

  if (filters.starsMin) {
    query += ` stars:>=${filters.starsMin}`;
  }

  if (filters.starsMax) {
    query += ` stars:<=${filters.starsMax}`;
  }

  return query;
};

export const LANGUAGES = [
  "any",
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C++",
  "C#",
  "PHP",
  "Ruby",
  "Go",
  "Rust",
  "Swift",
  "Kotlin",
  "Dart",
  "Shell",
  "HTML",
  "CSS",
  "Vue",
  "React",
  "Angular",
];

export const LICENSES = [
  "any",
  "mit",
  "apache-2.0",
  "gpl-3.0",
  "bsd-3-clause",
  "bsd-2-clause",
  "lgpl-3.0",
  "mpl-2.0",
  "cc0-1.0",
  "unlicense",
];
