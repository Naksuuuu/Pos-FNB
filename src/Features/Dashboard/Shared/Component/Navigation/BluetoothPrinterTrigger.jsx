import { Printer } from "lucide-react";

import { useBluetoothPrinter } from "@/Features/Shared/Context/BluetoothPrinterContext";
import { Button } from "@/Components/Elements/Shadcn/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/Elements/Shadcn/popover";
import { Spinner } from "@/Components/Elements/Shadcn/spinner";

const BluetoothPrinterTrigger = () => {
  const { device, isConnected, isConnecting, connectPrinter, disconnectPrinter } = useBluetoothPrinter();

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className={`relative rounded-xl border transition-all ${
              isConnected
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20"
                : "border-border hover:bg-muted"
            }`}
          >
            <Printer className="size-5" />
            {isConnected && (
              <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
            )}
          </Button>
        }
      />
      <PopoverContent align="end" className="w-80 p-4 border border-border bg-popover rounded-2xl shadow-xl">
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-base leading-none">Printer Bluetooth</h4>
            <p className="text-xs text-muted-foreground mt-1">
              {isConnected 
                ? `Terhubung ke: ${device?.name || "Printer Bluetooth"}`
                : "Belum ada printer yang terhubung."}
            </p>
          </div>

          <div className="border-t border-border pt-4">
            {isConnected ? (
              <Button
                variant="destructive"
                className="w-full flex items-center justify-center gap-2 rounded-xl"
                onClick={disconnectPrinter}
              >
                <Printer className="size-4" />
                Putuskan Printer
              </Button>
            ) : (
              <Button
                className="w-full flex items-center justify-center gap-2 rounded-xl"
                onClick={connectPrinter}
                disabled={isConnecting}
              >
                {isConnecting ? (
                  <Spinner className="size-4" />
                ) : (
                  <Printer className="size-4" />
                )}
                {isConnecting ? "Menghubungkan..." : "Sambungkan Printer"}
              </Button>
            )}
          </div>

          {!isConnected && (
            <p className="text-[11px] text-muted-foreground italic">
              * Pastikan Bluetooth printer menyala dan dalam mode pairing.
            </p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default BluetoothPrinterTrigger;
