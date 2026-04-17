const STATUS_OPTIONS = [
  { label: "Semua", value: "" },
  { label: "Tersedia", value: "available" },
  { label: "Ditempati", value: "occupied" },
];

const DINING_TABLE_QUERY_KEYS = {
  root: ["dashboard", "dining-table"],
  lists: () => ["dashboard", "dining-table", "list"],
  list: (filters = {}) => ["dashboard", "dining-table", "list", filters],
};

const STATUS_OPTIONS_SCHEMA = STATUS_OPTIONS.filter((option) => option.value !== "");

const TABLE_DINING_TABLE_HEAD_COLUMNS = [
  {
    header: "No",
    width: "w-[50px]",
  },
  {
    header: "Kode Nama",
    width: "min-w-[150px] max-w-full",
  },
  {
    header: "Status",
    width: "min-w-[100px] max-w-[400px] text-center",
  },
  {
    header: "Aksi",
    width: "w-[150px] text-center",
  },
];

export { STATUS_OPTIONS, STATUS_OPTIONS_SCHEMA, TABLE_DINING_TABLE_HEAD_COLUMNS, DINING_TABLE_QUERY_KEYS };
