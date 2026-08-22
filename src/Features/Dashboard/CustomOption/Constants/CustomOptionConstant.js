const CUSTOM_OPTION_QUERY_KEYS = {
  root: ["dashboard", "custom-options"],
  lists: () => ["dashboard", "custom-options", "list"],
  list: (filters = {}) => ["dashboard", "custom-options", "list", filters],
};

const TABLE_CUSTOM_OPTION_HEAD_COLUMNS = [
  {
    header: "No",
    width: "w-[50px]",
  },
  {
    header: "Nama Opsi",
    width: "min-w-[180px] max-w-full",
  },
  {
    header: "Harga",
    width: "min-w-[120px] max-w-[200px]",
  },
  {
    header: "Tanggal Dibuat",
    width: "min-w-[150px] max-w-[220px]",
  },
  {
    header: "Aksi",
    width: "w-[150px] text-center",
  },
];

const SORT_BY_OPTIONS = [
  { label: "Nama", value: "name" },
  { label: "Harga", value: "price" },
  { label: "Tanggal Dibuat", value: "created_at" },
];

export { CUSTOM_OPTION_QUERY_KEYS, TABLE_CUSTOM_OPTION_HEAD_COLUMNS, SORT_BY_OPTIONS };
