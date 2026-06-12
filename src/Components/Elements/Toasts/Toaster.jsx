import { Toaster as Sonner } from "sonner";

const Toaster = () => {
  return (
    <Sonner
      position="top-right"
      toastOptions={{
        classNames: {
          toast: "!border-b-none !border-t-none !border-r-none !border-l-4 !border-l-primary",
          success: "!border-b-none !border-t-none !border-r-none !border-l-4 !border-l-success",
          error: "!border-b-none !border-t-none !border-r-none !border-l-4 !border-l-destructive",
          warning: "!border-b-none !border-t-none !border-r-none !border-l-4 !border-l-warning",
        },
      }}
    />
  );
};
export default Toaster;
