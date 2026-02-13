import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router";

const useFilterParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(() => Object.fromEntries(searchParams.entries()), [searchParams]);

  const setFilters = useCallback(
    (newFilters) => {
      const params = new URLSearchParams();

      Object.entries(newFilters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          params.set(key, value);
        }
      });

      setSearchParams(params);
    },
    [setSearchParams],
  );

  const updateFilters = useCallback(
    (updates) => {
      setSearchParams((prev) => {
        const prevFilters = Object.fromEntries(prev.entries());
        const newFilters = {
          ...prevFilters,
          ...updates,
        };

        const params = new URLSearchParams();
        Object.entries(newFilters).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            params.set(key, value);
          }
        });

        return params;
      });
    },
    [setSearchParams],
  );

  const resetFilters = useCallback(() => {
    const emptyFilters = {};
    setFilters(emptyFilters);
  }, [setFilters]);

  return {
    filters,
    updateFilters,
    resetFilters,
  };
};

export default useFilterParams;
