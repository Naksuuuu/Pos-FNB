import { useCallback, useMemo } from "react";
import { useState } from "react";

const useCheckboxUser = () => {
  const [isChecked, setIsChecked] = useState([]);

  const allItemsChecked = useMemo(() => {
    return isChecked.reduce((all, item) => [...all, ...item.idUsers], []);
  }, [isChecked]);

  const handleCheckboxChange = useCallback((item) => {
    setIsChecked((prev) => {
      const existingPage = prev.find((itm) => itm.page === item.page);
      const otherPages = prev.filter((itm) => itm.page !== item.page);

      if (existingPage) {
        const userId = item.idUsers[0];
        const alreadyChecked = existingPage.idUsers.includes(userId);

        const updatedIds = alreadyChecked ? existingPage.idUsers.filter((id) => id !== userId) : [...existingPage.idUsers, userId];

        if (updatedIds.length === 0) return otherPages;

        return [...otherPages, { page: existingPage.page, idUsers: updatedIds }];
      }

      return [...prev, item];
    });
  }, []);

  const handleAllCheckboxChange = useCallback((item) => {
    setIsChecked((prev) => {
      const existingPage = prev.find((itm) => itm.page === item.page);
      const otherPages = prev.filter((itm) => itm.page !== item.page);

      const allChecked = existingPage && item.idUsers.every((id) => existingPage.idUsers.includes(id));

      if (allChecked) return otherPages;

      return [...otherPages, { page: item.page, idUsers: item.idUsers }];
    });
  }, []);

  return { handleCheckboxChange, handleAllCheckboxChange, isChecked, setIsChecked, allItemsChecked };
};

export default useCheckboxUser;
