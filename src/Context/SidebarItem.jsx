import { Computer, LayoutDashboard, Database } from "lucide-react";

export const SidebarItem = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
    children: null,
  },
  {
    title: "Inventory",
    icon: Database,
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
