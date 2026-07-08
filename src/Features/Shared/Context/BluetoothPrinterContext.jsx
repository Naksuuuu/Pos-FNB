import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { toast } from "sonner";

const BluetoothPrinterContext = createContext(null);

const PRINTER_SERVICES = [
  "000018f0-0000-1000-8000-00805f9b34fb", // Common BLE printer service
  "49535f47-5255-5054-4f52-434849505300", // Another common generic printing service
  "0000e781-0000-1000-8000-00805f9b34fb",
  "0000ff00-0000-1000-8000-00805f9b34fb",
];

export const BluetoothPrinterProvider = ({ children }) => {
  const [device, setDevice] = useState(null);
  const [characteristic, setCharacteristic] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    if (!device) return;

    const handleDisconnect = () => {
      setIsConnected(false);
      setCharacteristic(null);
      setDevice(null);
      toast.error("Printer Bluetooth terputus.");
    };

    device.addEventListener("gattserverdisconnected", handleDisconnect);
    return () => {
      device.removeEventListener("gattserverdisconnected", handleDisconnect);
    };
  }, [device]);

  const connectPrinter = useCallback(async () => {
    if (!navigator.bluetooth) {
      toast.error("Web Bluetooth tidak didukung di browser ini. Gunakan Chrome/Edge.");
      return;
    }

    setIsConnecting(true);
    try {
      const selectedDevice = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: PRINTER_SERVICES,
      });

      setDevice(selectedDevice);

      toast.info(`Menghubungkan ke ${selectedDevice.name || "Printer Bluetooth"}...`);
      const server = await selectedDevice.gatt.connect();

      let foundCharacteristic = null;

      for (const serviceUuid of PRINTER_SERVICES) {
        try {
          const service = await server.getPrimaryService(serviceUuid);
          const characteristics = await service.getCharacteristics();
          const writeChar = characteristics.find(
            (char) => char.properties.write || char.properties.writeWithoutResponse,
          );
          if (writeChar) {
            foundCharacteristic = writeChar;
            break;
          }
        } catch {
          // Ignore and check the next UUID
        }
      }

      if (!foundCharacteristic) {
        throw new Error("Karakteristik penulisan printer tidak ditemukan pada list service.");
      }

      setCharacteristic(foundCharacteristic);
      setIsConnected(true);
      toast.success(`Berhasil terhubung ke ${selectedDevice.name || "Printer Bluetooth"}!`);
    } catch (error) {
      console.error("Bluetooth connection error:", error);
      if (error.name !== "NotFoundError") {
        toast.error(`Gagal menghubungkan printer: ${error.message}`);
      }
      setIsConnected(false);
      setDevice(null);
      setCharacteristic(null);
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const disconnectPrinter = useCallback(() => {
    if (device && device.gatt.connected) {
      device.gatt.disconnect();
    }
    setIsConnected(false);
    setDevice(null);
    setCharacteristic(null);
    toast.success("Koneksi printer diputuskan.");
  }, [device]);

  const printRaw = useCallback(
    async (data) => {
      if (!characteristic) {
        toast.error("Printer belum terhubung.");
        return false;
      }

      try {
        const chunkSize = 20;
        for (let i = 0; i < data.length; i += chunkSize) {
          const chunk = data.slice(i, i + chunkSize);
          if (characteristic.properties.writeWithoutResponse) {
            await characteristic.writeValueWithoutResponse(chunk);
          } else {
            await characteristic.writeValue(chunk);
          }
          await new Promise((resolve) => setTimeout(resolve, 20)); // slight delay for print buffering
        }
        return true;
      } catch (error) {
        console.error("Gagal mengirim data cetak:", error);
        toast.error(`Gagal mencetak: ${error.message}`);
        return false;
      }
    },
    [characteristic],
  );

  return (
    <BluetoothPrinterContext.Provider
      value={{
        device,
        isConnected,
        isConnecting,
        connectPrinter,
        disconnectPrinter,
        printRaw,
      }}
    >
      {children}
    </BluetoothPrinterContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useBluetoothPrinter = () => {
  const context = useContext(BluetoothPrinterContext);
  if (!context) {
    throw new Error("useBluetoothPrinter must be used within a BluetoothPrinterProvider");
  }
  return context;
};
