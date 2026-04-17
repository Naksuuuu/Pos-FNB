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

const SORT_DATE_OPTIONS = [
  { label: "Semua", value: "" },
  { label: "7 Hari Terakhir", value: "last_7_days" },
  { label: "1 Bulan Terakhir", value: "this_month" },
  { label: "3 Bulan Terakhir", value: "last_3_months" },
  { label: "1 Tahun Terakhir", value: "last_1_year" },
  { label: "Pilih Tanggal", value: "custom" },
];

const TABLE_USER_HEAD_COLUMNS = [
  { header: "No", width: "w-[50px]!" },
  { header: "Nama", width: "min-w-[200px] w-2/6" },
  { header: "Username", width: "w-1/6" },
  { header: "Email", width: "w-1/6" },
  { header: "No Handphone", width: "w-1/6" },
  { header: "Role", width: "w-1/6 text-center" },
  { header: "Aksi", width: "w-[150px] text-center" },
];

const ROLE_OPTIONS = [
  { label: "Admin", value: "admin", variant: "success" },
  { label: "Kasir", value: "cashier", variant: "warning" },
];

const USER_QUERY_KEYS = {
  root: ["dashboard", "user"],
  lists: () => ["dashboard", "user", "list"],
  list: (filters = {}) => ["dashboard", "user", "list", filters],
};

export { TABLE_USER_HEAD_COLUMNS, SORT_BY_OPTIONS, SORT_ROLE_OPTIONS, SORT_DATE_OPTIONS, ROLE_OPTIONS, USER_QUERY_KEYS };
