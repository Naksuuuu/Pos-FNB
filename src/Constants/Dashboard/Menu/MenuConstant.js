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

export { SORY_BY_OPTIONS, SORT_DIRECTION_OPTIONS, IS_AVAILABLE_OPTIONS, CATEGORY_ID_OPTIONS };
