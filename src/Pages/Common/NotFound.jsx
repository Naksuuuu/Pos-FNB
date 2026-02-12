import { memo } from "react";
import { useNavigate } from "react-router";
import { Button } from "@/Components/Elements/Shadcn/Button/button";

const NotFound = memo(() => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-background">
      <div className="flex flex-col  text-center">
        <h2 className="text-2xl font-bold">404 - Not Found</h2>
        <div className="mb-2">Halaman yang Anda cari tidak ditemukan.</div>
        <div className="w-inherit">
          <Button onClick={handleGoBack} className="cursor-pointer">
            Kembali
          </Button>
        </div>
      </div>
    </div>
  );
});
export default NotFound;
