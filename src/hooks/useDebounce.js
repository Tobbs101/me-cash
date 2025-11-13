import { useState, useEffect } from "react";
import { debounce } from "../utils/index.js";

export const useDebounce = (callback, delay = 500) => {
  const [value, setValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");

  useEffect(() => {
    const handler = debounce(() => {
      setDebouncedValue(value);
      callback(value);
    }, delay);

    handler();

    return () => {
      // Cleanup function would be here if debounce returned a cleanup function
    };
  }, [value, callback, delay]);

  return [debouncedValue, setValue];
};
