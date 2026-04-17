const SORT_BY_OPTIONS = [
  { label: "Semua", value: "" },
  { label: "Nama", value: "name" },
  { label: "Total Menu", value: "menu_count" },
  { label: "Tanggal Dibuat", value: "created_at" },
];

const CATEGORY_QUERY_KEYS = {
  root: ["dashboard", "category"],
  lists: () => ["dashboard", "category", "list"],
  list: (filters = {}) => ["dashboard", "category", "list", filters],
  stats: (filters = {}) => ["dashboard", "category", "stats", filters],
};

const TABLE_CATEGORY_HEAD_COLUMNS = [
  { header: "No", width: "w-[50px]" },
  { header: "Nama", width: "min-w-[300px] max-w-full" },
  { header: "Total Menu", width: "w-[150px] text-center" },
  { header: "Aksi", width: "w-[150px] text-center" },
];

export { TABLE_CATEGORY_HEAD_COLUMNS, SORT_BY_OPTIONS, CATEGORY_QUERY_KEYS };

