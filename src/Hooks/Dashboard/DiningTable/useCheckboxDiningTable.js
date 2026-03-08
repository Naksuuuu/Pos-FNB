import { useCallback, useMemo, useState } from "react";

const useCheckboxDiningTable = () => {
  const [isChecked, setIsChecked] = useState([]);

  const allItemsChecked = useMemo(() => {
    return isChecked.reduce((all, item) => [...all, ...item.idTables], []);
  }, [isChecked]);

  const handleCheckboxChange = useCallback((item) => {
    setIsChecked((prev) => {
      const existingPage = prev.find((itm) => itm.page === item.page);
      const otherPages = prev.filter((itm) => itm.page !== item.page);

      if (existingPage) {
        const tableId = item.idTables[0];
        const alreadyChecked = existingPage.idTables.includes(tableId);

        const updatedIds = alreadyChecked ? existingPage.idTables.filter((id) => id !== tableId) : [...existingPage.idTables, tableId];

        if (updatedIds.length === 0) return otherPages;

        return [...otherPages, { page: existingPage.page, idTables: updatedIds }];
      }

      return [...prev, item];
    });
  }, []);

  const handleAllCheckboxChange = useCallback((item) => {
    setIsChecked((prev) => {
      const existingPage = prev.find((itm) => itm.page === item.page);
      const otherPages = prev.filter((itm) => itm.page !== item.page);

      const allChecked = existingPage && item.idTables.every((id) => existingPage.idTables.includes(id));

      if (allChecked) return otherPages;

      return [...otherPages, { page: item.page, idTables: item.idTables }];
    });
  }, []);

  return { handleCheckboxChange, handleAllCheckboxChange, isChecked, setIsChecked, allItemsChecked };
};

export default useCheckboxDiningTable;
