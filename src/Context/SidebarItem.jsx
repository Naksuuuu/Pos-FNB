import { Computer, LayoutDashboard } from "lucide-react";

const SIDEBAR_ITEMS = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
    children: null,
  },
  {
    title: "Inventory",
    icon: LayoutDashboard,
    children: [
      {
        title: "Products",
        path: "/dashboard/products",
        icon: LayoutDashboard,
        children: null,
      },
    ],
  },
  {
    title: "Cashier",
    path: "/dashboard/cashier",
    icon: Computer,
    children: null,
  },
];

export const SidebarItem = SIDEBAR_ITEMS;
