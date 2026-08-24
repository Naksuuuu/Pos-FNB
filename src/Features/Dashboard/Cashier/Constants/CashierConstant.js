const CASHIER_QUERY_KEYS = {
  root: ["dashboard", "cashier"],
  menus: (filters = {}) => ["dashboard", "cashier", "menus", filters],
  categories: () => ["dashboard", "cashier", "categories"],
  tables: () => ["dashboard", "cashier", "tables"],
  submittedOrders: () => ["dashboard", "cashier", "submitted-orders"],
  members: (filters = {}) => ["dashboard", "cashier", "members", filters],
  rewardClaims: (filters = {}) => ["dashboard", "cashier", "reward-claims", filters],
};

const CLAIM_STATUS_OPTIONS = [
  { label: "Semua Status", value: "" },
  { label: "Pending", value: "PENDING" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Rejected", value: "REJECTED" },
];

const TABLE_REWARD_CLAIM_HEAD_COLUMNS = [
  { header: "No", width: "w-[50px]" },
  { header: "Pelanggan", width: "min-w-[150px]" },
  { header: "Merchandise", width: "min-w-[180px]" },
  { header: "Poin Ditukar", width: "min-w-[100px] text-center" },
  { header: "Tanggal Klaim", width: "min-w-[150px]" },
  { header: "Status", width: "min-w-[120px] text-center" },
  { header: "Catatan", width: "min-w-[150px]" },
  { header: "Aksi", width: "w-[160px] text-center" },
];

export { CASHIER_QUERY_KEYS, CLAIM_STATUS_OPTIONS, TABLE_REWARD_CLAIM_HEAD_COLUMNS };
