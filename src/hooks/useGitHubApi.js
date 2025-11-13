import { useState, useEffect, useCallback } from "react";
import { buildSearchQuery } from "../utils/index.js";

export const useGitHubApi = (filters) => {
  const [state, setState] = useState({
    data: null,
    loading: false,
    error: null,
  });

  const fetchRepositories = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const query = buildSearchQuery(filters);
      const sortParam =
        filters.sortBy === "updated" ? "updated" : filters.sortBy;

      const url = new URL("https://api.github.com/search/repositories");
      url.searchParams.append("q", query);
      url.searchParams.append("sort", sortParam);
      url.searchParams.append("order", filters.order);
      url.searchParams.append("page", filters.page.toString());
      url.searchParams.append("per_page", filters.perPage.toString());

      const response = await fetch(url.toString(), {
        headers: {
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "GitHub-Explorer-Dashboard",
        },
      });

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error("API rate limit exceeded. Please try again later.");
        } else if (response.status === 422) {
          throw new Error("Invalid search query. Please check your filters.");
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }

      const data = await response.json();
      setState({ data, loading: false, error: null });
    } catch (error) {
      console.error("GitHub API Error:", error);
      setState({
        data: null,
        loading: false,
        error: error.message || "An unexpected error occurred",
      });
    }
  }, [filters]);

  const refetch = useCallback(() => {
    fetchRepositories();
  }, [fetchRepositories]);

  useEffect(() => {
    fetchRepositories();
  }, [fetchRepositories]);

  return {
    ...state,
    refetch,
  };
};
