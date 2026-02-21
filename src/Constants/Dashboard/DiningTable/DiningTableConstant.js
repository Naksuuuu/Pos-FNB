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

export { STATUS_OPTIONS, SORT_DIRECTION_OPTIONS, STATUS_OPTIONS_SCHEMA };
