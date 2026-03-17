const STATUS_OPTIONS = [
  { label: "Semua", value: "" },
  { label: "Selesai", value: "completed" },
  { label: "Diajukan", value: "submitted" },
  { label: "Dibatalkan", value: "canceled" },
];

const TABLE_ORDER_HEAD_COLUMNS = [
  { header: "No", width: "w-[50px]" },
  { header: "Order ID", width: "w-1/6" },
  { header: "Nama Pelanggan", width: "w-2/6" },
  { header: "Kode Meja", width: "w-1/6" },
  { header: "Total Harga", width: "w-1/6" },
  { header: "Status", width: "w-1/6 text-center" },
  { header: "Aksi", width: "w-1/6 text-center" },
];

const SORT_DATE_OPTIONS = [
  { label: "Semua", value: "" },
  { label: "7 Hari Terakhir", value: "last_7_days" },
  { label: "1 Bulan Terakhir", value: "this_month" },
  { label: "3 Bulan Terakhir", value: "last_3_months" },
  { label: "1 Tahun Terakhir", value: "last_1_year" },
  { label: "Pilih Tanggal", value: "custom" },
];

const ORDER_STATUS_BADGE = [
  { variant: "success", label: "Selesai", value: "completed" },
  { variant: "info", label: "Diajukan", value: "submitted" },
  { variant: "warning", label: "Diproses", value: "processing" },
  { variant: "destructive", label: "Dibatalkan", value: "canceled" },
];

export { TABLE_ORDER_HEAD_COLUMNS, STATUS_OPTIONS, SORT_DATE_OPTIONS, ORDER_STATUS_BADGE };
