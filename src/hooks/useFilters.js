import { useReducer, useCallback } from "react";

const initialState = {
  query: "react",
  language: "any",
  license: "any",
  starsMin: "",
  starsMax: "",
  sortBy: "stars",
  order: "desc",
  page: 1,
  perPage: 10,
};

const filterReducer = (state, action) => {
  switch (action.type) {
    case "SET_QUERY":
      return { ...state, query: action.payload, page: 1 };
    case "SET_LANGUAGE":
      return { ...state, language: action.payload, page: 1 };
    case "SET_LICENSE":
      return { ...state, license: action.payload, page: 1 };
    case "SET_STARS_MIN":
      return { ...state, starsMin: action.payload, page: 1 };
    case "SET_STARS_MAX":
      return { ...state, starsMax: action.payload, page: 1 };
    case "SET_SORT":
      return { ...state, sortBy: action.payload, page: 1 };
    case "SET_ORDER":
      return { ...state, order: action.payload, page: 1 };
    case "SET_PAGE":
      return { ...state, page: action.payload };
    case "RESET_FILTERS":
      return { ...initialState, query: state.query };
    default:
      return state;
  }
};

export const useFilters = () => {
  const [filters, dispatch] = useReducer(filterReducer, initialState);

  const setQuery = useCallback((query) => {
    dispatch({ type: "SET_QUERY", payload: query });
  }, []);

  const setLanguage = useCallback((language) => {
    dispatch({ type: "SET_LANGUAGE", payload: language });
  }, []);

  const setLicense = useCallback((license) => {
    dispatch({ type: "SET_LICENSE", payload: license });
  }, []);

  const setStarsMin = useCallback((min) => {
    dispatch({ type: "SET_STARS_MIN", payload: min });
  }, []);

  const setStarsMax = useCallback((max) => {
    dispatch({ type: "SET_STARS_MAX", payload: max });
  }, []);

  const setSortBy = useCallback((sortBy) => {
    dispatch({ type: "SET_SORT", payload: sortBy });
  }, []);

  const setOrder = useCallback((order) => {
    dispatch({ type: "SET_ORDER", payload: order });
  }, []);

  const setPage = useCallback((page) => {
    dispatch({ type: "SET_PAGE", payload: page });
  }, []);

  const resetFilters = useCallback(() => {
    dispatch({ type: "RESET_FILTERS" });
  }, []);

  return {
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
  };
};
