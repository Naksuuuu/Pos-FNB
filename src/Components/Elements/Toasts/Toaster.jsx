import { Toaster as Sonner } from "sonner";

const Toaster = () => {
  return (
    <Sonner
      toastOptions={{
        classNames: {
          toast: "!border-b-none !border-t-none !border-r-none !border-l-4 !border-l-primary",
          success: "!border-b-none !border-t-none !border-r-none !border-l-4 !border-l-success",
          error: "!border-b-none !border-t-none !border-r-none !border-l-4 !border-l-destructive",
        },
      }}
    />
  );
};
export default Toaster;
