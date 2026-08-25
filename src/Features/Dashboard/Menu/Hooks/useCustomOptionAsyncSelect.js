import { useCallback, useMemo, useRef, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import CustomOptionService from "@/Features/Dashboard/CustomOption/Services/CustomOptionService";
import { CUSTOM_OPTION_QUERY_KEYS } from "@/Features/Dashboard/CustomOption/Constants/CustomOptionConstant";

const useCustomOptionAsyncSelect = ({ field, selectedMenu = null }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParam, setSearchParam] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [fetchedOptionsMap, setFetchedOptionsMap] = useState({});
  const timerRef = useRef(null);

  // Debounced search handler with immediate reset when text is empty
  const handleSearchChange = useCallback((e) => {
    const val = e.target.value;
    setSearchQuery(val);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (!val.trim()) {
      setSearchParam("");
      return;
    }

    timerRef.current = setTimeout(() => {
      setSearchParam(val.trim());
    }, 400);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchQuery("");
    setSearchParam("");
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, []);

  // Combined options map from selectedMenu initial customs + newly selected/fetched options
  const optionsMap = useMemo(() => {
    const map = {};
    if (selectedMenu?.custom_options && Array.isArray(selectedMenu.custom_options)) {
      selectedMenu.custom_options.forEach((opt) => {
        const label = opt.name || opt.custom_name || opt.title || "";
        map[opt.id] = { id: opt.id, label, price: Number(opt.price) || 0 };
      });
    }
    return { ...map, ...fetchedOptionsMap };
  }, [selectedMenu, fetchedOptionsMap]);

  const hasSearchInput = searchParam.trim().length > 0;

  // Fetch custom options API ONLY when input has text & limit per_page=10
  const { data: customOptionsData, isLoading } = useQuery({
    queryKey: CUSTOM_OPTION_QUERY_KEYS.list({ search: hasSearchInput ? searchParam.trim() : undefined, per_page: 10 }),
    queryFn: async () => {
      const params = {
        per_page: 10,
      };

      if (hasSearchInput) {
        params.search = searchParam.trim();
      }

      const response = await CustomOptionService.customOptions(params);

      if (!response?.success && response?.status !== 200) {
        throw new Error(response?.message || "Failed to fetch custom options");
      }

      return response.data;
    },
    enabled: isOpen && hasSearchInput,
    placeholderData: keepPreviousData,
  });

  const fetchedItems = useMemo(() => {
    if (!hasSearchInput) {
      return [];
    }
    if (Array.isArray(customOptionsData)) {
      return customOptionsData;
    }
    return customOptionsData?.custom_options || customOptionsData?.options || customOptionsData?.data || [];
  }, [customOptionsData, hasSearchInput]);

  const selectedValues = useMemo(() => {
    return Array.isArray(field.value) ? field.value : [];
  }, [field.value]);

  const handleToggle = useCallback(
    (opt) => {
      const optionId = typeof opt === "object" ? opt.id : opt;

      if (typeof opt === "object" && opt.id) {
        const label = opt.name || opt.custom_name || opt.title || "";
        const price = Number(opt.price) || 0;
        setFetchedOptionsMap((prev) => ({
          ...prev,
          [opt.id]: { id: opt.id, label, price },
        }));
      }

      if (selectedValues.includes(optionId)) {
        field.onChange(selectedValues.filter((id) => id !== optionId));
      } else {
        field.onChange([...selectedValues, optionId]);
      }
    },
    [field, selectedValues],
  );

  return {
    searchQuery,
    searchParam,
    hasSearchInput,
    isOpen,
    setIsOpen,
    isLoading,
    fetchedItems,
    selectedValues,
    optionsMap,
    handleSearchChange,
    handleClearSearch,
    handleToggle,
  };
};

export default useCustomOptionAsyncSelect;
