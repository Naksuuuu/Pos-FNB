const STATUS_OPTIONS = [
  { label: "Semua", value: "" },
  { label: "Selesai", value: "completed" },
  { label: "Pending", value: "pending" },
  { label: "Dibatalkan", value: "canceled" },
];

const TABLE_ORDER_HEAD_COLUMNS = [
  { header: "No", width: "w-[50px]" },
  { header: "Order ID", width: "w-1/6" },
  { header: "Nama Pelanggan", width: "w-1/6" },
  { header: "Status", width: "w-1/6" },
  { header: "Nomor Meja", width: "w-1/6" },
  { header: "Total Harga", width: "w-1/6" },
  { header: "Aksi", width: "w-1/6 text-center" },
];

export { TABLE_ORDER_HEAD_COLUMNS, STATUS_OPTIONS };
