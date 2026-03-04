const SORT_DIRECTION_OPTIONS = [
  { label: "Default", value: "" },
  { label: "Terlama / Terkecil", value: "asc" },
  { label: "Terbaru / Terbesar", value: "desc" },
];

const SORT_BY_OPTIONS = [
  { label: "Semua", value: "" },
  { label: "Nama", value: "name" },
  { label: "Tanggal Dibuat", value: "created_at" },
];

const SORT_ROLE_OPTIONS = [
  { label: "Semua", value: "" },
  { label: "Admin", value: "admin" },
  { label: "Kasir", value: "cashier" },
];

const TABLE_USER_HEAD_COLUMNS = [
  { header: "No", width: "w-[50px]!" },
  { header: "Nama", width: "min-w-[200px] max-w-full" },
  { header: "Username", width: "w-[200px]" },
  { header: "Email", width: "w-[200px]" },
  { header: "No Handphone", width: "w-[200px]" },
  { header: "Role", width: "w-[150px]! text-center" },
  { header: "Aksi", width: "w-[150px] text-center" },
];

const ROLE_OPTIONS = [
  { label: "Admin", value: "admin" },
  { label: "Kasir", value: "cashier" },
];

export { TABLE_USER_HEAD_COLUMNS, SORT_BY_OPTIONS, SORT_DIRECTION_OPTIONS, SORT_ROLE_OPTIONS, ROLE_OPTIONS };
