import { Toaster } from "sonner";
import { Card } from "../Elements/Cards/Card";

const AuthLayout = ({ children, title = "halo", subtitle = "subtitle" }) => {
  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 relative bg-linear-to-br from-[#0f2b3b] via-[#102b3c] to-[#092a43] text-white p-12 items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]" />
        </div>

        <div className="relative z-10 max-w-lg space-y-6 animate-fadeIn">
          <div className="space-y-4">
            <h1 className="text-6xl font-bold tracking-tight">
              POS <span className="text-primary/90">App</span>
            </h1>
            <div className="h-1 w-24 bg-linear-to-r from-primary to-transparent rounded-full" />
          </div>

          <p className="text-xl text-primary/80 font-medium">Point of Sale Application</p>

          <p className="text-primary/70 leading-relaxed">
            Platform modern untuk pengelolaan transaksi yang efisien dan ramah lingkungan untuk masa depan yang lebih
            bersih.
          </p>

          <div className="pt-4 space-y-3 text-primary/60">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span>Pemantauan Real-time</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: "150ms" }} />
              <span>Manajemen Transaksi Terpadu</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: "300ms" }} />
              <span>Laporan Komprehensif</span>
            </div>
          </div>
        </div>

        <div className="absolute top-20 right-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="w-full relative lg:w-1/2 flex items-center justify-center bg-linear-to-br from-[#0f2b3b] via-[#102b3c] to-[#092a43] lg:from-background lg:via-background lg:to-background p-8 ">
        <div className="absolute inset-0 opacity-10 lg:opacity-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]" />
        </div>

        <div className="w-full max-w-md z-10">
          <Card outerClassName="border border-primary/10 p-4">
            <div className="lg:hidden mb-8 text-center">
              <h1 className="text-3xl font-bold text-foreground">
                POS <span className="text-primary">FNB</span>
              </h1>
              <p className="text-sm text-foreground mt-2">Point of Sale Application</p>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-2xl font-extrabold text-primary mb-2">{title}</h2>
              <p className="text-foreground text-sm">{subtitle}</p>
            </div>

            {children}
            <Toaster
              toastOptions={{
                classNames: {
                  toast: "!bg-background !text-foreground !border-border",
                  success: "!bg-success/40 !text-black !border-success/20",
                  error: "!bg-destructive/40 !text-black !border-destructive/20",
                },
              }}
            />

            <div className="mt-8 pt-4 border-t border-primary/20">
              <p className="text-xs text-center text-gray-600">© 2026 POS FNB. All rights reserved.</p>
            </div>
          </Card>
        </div>

        <div className="block lg:hidden">
          <div className="absolute top-20 right-20 w-[40vw] h-[40vw] bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-20 left-20 w-[40vw] h-[40vw] bg-primary/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </div>
      </div>
    </div>
  );
};
export default AuthLayout;
