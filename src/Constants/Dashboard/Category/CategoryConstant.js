const SORT_DIRECTION_OPTIONS = [
  { label: "Default", value: "" },
  { label: "A-Z", value: "asc" },
  { label: "Z-A", value: "desc" },
];

const SORT_BY_OPTIONS = [
  { label: "Semua", value: "" },
  { label: "Nama", value: "name" },
  { label: "Total Menu", value: "total_menu" },
  { label: "Tanggal Dibuat", value: "created_at" },
];

const TABLE_CATEGORY_HEAD_COLUMNS = [
  { header: "No", width: "w-[50px]" },
  { header: "Nama", width: "min-w-[300px] max-w-full" },
  { header: "Total Menu", width: "w-[150px]" },
  { header: "Aksi", width: "w-[50px] text-right" },
];

export { TABLE_CATEGORY_HEAD_COLUMNS, SORT_BY_OPTIONS, SORT_DIRECTION_OPTIONS };
