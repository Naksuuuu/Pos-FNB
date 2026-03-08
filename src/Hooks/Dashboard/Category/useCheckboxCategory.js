import { useCallback, useState } from "react";

const useCheckboxCategory = () => {
  const [isChecked, setIsChecked] = useState([]);

  const handleCheckboxChange = useCallback((id) => {
    setIsChecked((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      return [...prev, id];
    });
  }, []);

  const handleAllCheckboxChange = useCallback((ids) => {
    setIsChecked((prev) => {
      const allChecked = ids.every((id) => prev.includes(id));
      if (allChecked) return [];
      return ids;
    });
  }, []);

  return { isChecked, setIsChecked, handleCheckboxChange, handleAllCheckboxChange };
};

export default useCheckboxCategory;
