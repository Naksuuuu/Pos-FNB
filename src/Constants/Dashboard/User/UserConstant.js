const SORT_DIRECTION_OPTIONS = [
  { label: "Default", value: "" },
  { label: "A-Z", value: "asc" },
  { label: "Z-A", value: "desc" },
];

const SORT_BY_OPTIONS = [
  { label: "Semua", value: "" },
  { label: "Nama", value: "name" },
  { label: "Tanggal Dibuat", value: "created_at" },
];

const TABLE_USER_HEAD_COLUMNS = [
  { header: "No", width: "w-[50px]" },
  { header: "Nama", width: "w-[250px]" },
  { header: "Username", width: "min-w-[150px] max-w-full" },
  { header: "Role", width: "w-[220px]" },
  { header: "Aksi", width: "w-[50px] text-right" },
];

const ROLE_OPTIONS = [
  { label: "Admin", value: "admin" },
  { label: "Kasir", value: "cashier" },
];

export { TABLE_USER_HEAD_COLUMNS, SORT_BY_OPTIONS, SORT_DIRECTION_OPTIONS, ROLE_OPTIONS };
