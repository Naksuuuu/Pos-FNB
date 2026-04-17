import { useCallback, useMemo, useState } from "react";

const useCheckboxMenu = () => {
  const [isChecked, setIsChecked] = useState([]);

  const allItemsChecked = useMemo(() => {
    return isChecked.reduce((all, item) => [...all, ...item.idMenus], []);
  }, [isChecked]);

  const handleCheckboxChange = useCallback((item) => {
    setIsChecked((prev) => {
      const existingPage = prev.find((itm) => itm.page === item.page);
      const otherPages = prev.filter((itm) => itm.page !== item.page);

      if (existingPage) {
        const menuId = item.idMenus[0];
        const alreadyChecked = existingPage.idMenus.includes(menuId);

        const updatedIds = alreadyChecked ? existingPage.idMenus.filter((id) => id !== menuId) : [...existingPage.idMenus, menuId];

        if (updatedIds.length === 0) return otherPages;

        return [...otherPages, { page: existingPage.page, idMenus: updatedIds }];
      }

      return [...prev, item];
    });
  }, []);

  const handleAllCheckboxChange = useCallback((item) => {
    setIsChecked((prev) => {
      const existingPage = prev.find((itm) => itm.page === item.page);
      const otherPages = prev.filter((itm) => itm.page !== item.page);

      const allChecked = existingPage && item.idMenus.every((id) => existingPage.idMenus.includes(id));

      if (allChecked) return otherPages;

      return [...otherPages, { page: item.page, idMenus: item.idMenus }];
    });
  }, []);

  return { handleCheckboxChange, handleAllCheckboxChange, isChecked, setIsChecked, allItemsChecked };
};

export default useCheckboxMenu;
