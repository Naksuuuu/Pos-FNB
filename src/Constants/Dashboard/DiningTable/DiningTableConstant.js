const STATUS_OPTIONS = [
  { label: "Semua", value: "" },
  { label: "Tersedia", value: "available" },
  { label: "Ditempati", value: "occupied" },
];

const SORT_DIRECTION_OPTIONS = [
  { label: "Default", value: "" },
  { label: "A-Z", value: "asc" },
  { label: "Z-A", value: "desc" },
];

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
    width: "min-w-[100px] max-w-[400px]",
  },
  {
    header: "Aksi",
    width: "w-[50px] text-right",
  },
];

export { STATUS_OPTIONS, SORT_DIRECTION_OPTIONS, STATUS_OPTIONS_SCHEMA, TABLE_DINING_TABLE_HEAD_COLUMNS };
