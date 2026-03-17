const SORY_BY_OPTIONS = [
  { label: "Semua", value: "" },
  { label: "Tanggal Dibuat", value: "created_at" },
  { label: "Nama ", value: "name" },
  { label: "Harga ", value: "price" },
];

const SORT_DIRECTION_OPTIONS = [
  { label: "Default", value: "" },
  { label: "Terlama / Terkecil", value: "asc" },
  { label: "Terbaru / Terbesar", value: "desc" },
];

const IS_AVAILABLE_OPTIONS = [
  { label: "Semua", value: "" },
  { label: "Tersedia", value: "1" },
  { label: "Tidak Tersedia", value: "0" },
];

const CATEGORY_ID_OPTIONS = [{ label: "Semua", value: "" }];

// const TABLE_MENU_HEAD_COLUMNS = [
//   { header: "No", width: "w-[50px]" },
//   { header: "Nama", width: "min-w-[300px] max-w-full" },
//   { header: "Kategori", width: "w-[300px]" },
//   { header: "Harga", width: "w-[200px]" },
//   { header: "Status", width: "w-[200px] text-center" },
//   { header: "Aksi", width: "w-[150px] text-center" },
// ];

const TABLE_MENU_HEAD_COLUMNS = [
  { header: "No", width: "w-[50px]!" },
  { header: "Nama", width: "min-w-[200px] w-2/5" },
  { header: "Kategori", width: "w-1/5" },
  { header: "Harga", width: "w-1/5" },
  { header: "Status", width: "w-1/5 text-center" },
  { header: "Aksi", width: "max-w-[50px]! text-center" },
];

const MENU_STATUS_BADGE = [
  { variant: "success", label: "Tersedia", value: true },
  { variant: "destructive", label: "Tidak Tersedia", value: false },
];

export { SORY_BY_OPTIONS, SORT_DIRECTION_OPTIONS, IS_AVAILABLE_OPTIONS, CATEGORY_ID_OPTIONS, TABLE_MENU_HEAD_COLUMNS, MENU_STATUS_BADGE };
