import { cn } from "@/Utils/cn";

const BASE_CUSTOM_VARIANTS = {
  success: "bg-success/10 text-success dark:bg-success/20 ",
  warning: "bg-warning/10 text-warning dark:bg-warning/20 ",
};

const INTERACTION = {
  hover: {
    success: "hover:bg-success/20 dark:hover:bg-success/30",
    warning: "hover:bg-warning/20 dark:hover:bg-warning/30",
  },
};

const BADGE_VARIANTS = {
  success: cn(BASE_CUSTOM_VARIANTS.success, "[a]:hover:bg-success/20"),
  warning: cn(BASE_CUSTOM_VARIANTS.warning, "[a]:hover:bg-warning/20"),
};

export { BADGE_VARIANTS, BASE_CUSTOM_VARIANTS };
