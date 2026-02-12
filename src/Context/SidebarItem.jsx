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
        path: "/dashboard/menu",
        icon: LayoutDashboard,
        children: null,
      },
      {
        title: "Kategori",
        path: "/dashboard/category",
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
