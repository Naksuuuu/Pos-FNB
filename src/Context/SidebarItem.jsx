import { Computer, LayoutDashboard, Database } from "lucide-react";

export const SidebarItem = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
    children: null,
  },
  {
    title: "Inventaris",
    icon: Database,
    children: [
      {
        title: "Menu",
        path: "/dashboard/inventory/menu",
        icon: LayoutDashboard,
        children: null,
      },
      {
        title: "Meja",
        path: "/dashboard/inventory/table",
        icon: LayoutDashboard,
        children: null,
      },
    ],
  },
  {
    title: "Kasir",
    path: "/dashboard/cashier",
    icon: Computer,
    children: null,
  },
];
