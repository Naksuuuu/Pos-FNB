import { memo } from "react";
import { Button } from "@/Components/Elements/Shadcn/Button/button";

const RootErrorBoundary = memo(() => (
  <div className="flex items-center justify-center min-h-screen bg-background">
    <div className="p-8 text-center">
      <h1 className="mb-4 text-2xl font-bold text-red-600">An Error Occurred</h1>
      <p className="mb-4 text-red-500">The application encountered an unexpected error</p>
      <Button onClick={() => window.location.reload()} variant="destructive" className="cursor-pointer">
        Reload Page
      </Button>
    </div>
  </div>
));

export default RootErrorBoundary;
