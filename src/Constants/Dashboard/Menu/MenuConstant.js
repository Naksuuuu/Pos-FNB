const SORY_BY_OPTIONS = [
  { label: "Semua", value: "" },
  { label: "Tanggal Dibuat", value: "created_at" },
  { label: "Nama ", value: "name" },
  { label: "Harga ", value: "price" },
  { label: "Stok ", value: "stock" },
];

const SORT_DIRECTION_OPTIONS = [
  { label: "Default", value: "" },
  { label: "A-Z", value: "asc" },
  { label: "Z-A", value: "desc" },
];

const IS_AVAILABLE_OPTIONS = [
  { label: "Semua", value: "" },
  { label: "Tersedia", value: "1" },
  { label: "Tidak Tersedia", value: "0" },
];

const CATEGORY_ID_OPTIONS = [{ label: "Semua", value: "" }];

const TABLE_MENU_HEAD_COLUMNS = [
  { header: "No", width: "w-[50px]" },
  { header: "Nama", width: "min-w-[300px] max-w-full" },
  { header: "Kategori", width: "w-[300px]" },
  { header: "Harga", width: "w-[200px]" },
  { header: "Status", width: "w-[200px]" },
  { header: "Aksi", width: "w-[200px]" },
];

export { SORY_BY_OPTIONS, SORT_DIRECTION_OPTIONS, IS_AVAILABLE_OPTIONS, CATEGORY_ID_OPTIONS, TABLE_MENU_HEAD_COLUMNS };
