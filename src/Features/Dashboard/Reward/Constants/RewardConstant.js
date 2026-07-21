const SORT_BY_OPTIONS = [
  { label: "Semua", value: "" },
  { label: "Kode", value: "code" },
  { label: "Nama", value: "name" },
  { label: "Biaya Poin", value: "point_cost" },
  { label: "Tanggal Dibuat", value: "created_at" },
];

const CATEGORY_OPTIONS = [
  { label: "Merchandise", value: "MERCHANDISE" },
  { label: "Voucher", value: "VOUCHER" },
];

const STATUS_OPTIONS = [
  { label: "Aktif", value: "ACTIVE" },
  { label: "Nonaktif", value: "INACTIVE" },
];

const REWARD_QUERY_KEYS = {
  root: ["dashboard", "reward"],
  lists: () => ["dashboard", "reward", "list"],
  list: (filters = {}) => ["dashboard", "reward", "list", filters],
};

const TABLE_REWARD_HEAD_COLUMNS = [
  { header: "No", width: "w-[50px]" },
  { header: "Kode", width: "w-[120px]" },
  { header: "Nama", width: "min-w-[150px] max-w-full" },
  { header: "Kategori", width: "w-[130px]" },
  { header: "Biaya Poin", width: "w-[120px] text-center" },
  { header: "Stok", width: "w-[100px] text-center" },
  { header: "Diskon (%)", width: "w-[100px] text-center" },
  { header: "Deskripsi", width: "min-w-[200px]" },
  { header: "Status", width: "w-[100px] text-center" },
  { header: "Aksi", width: "w-[150px] text-center" },
];

export { TABLE_REWARD_HEAD_COLUMNS, SORT_BY_OPTIONS, CATEGORY_OPTIONS, STATUS_OPTIONS, REWARD_QUERY_KEYS };
