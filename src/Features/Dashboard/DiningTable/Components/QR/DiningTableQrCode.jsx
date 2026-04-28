import { memo, useCallback, useEffect, useRef, useState } from "react";
import { Download, X } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

import { Button } from "@/Components/Elements/Shadcn/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/Components/Elements/Shadcn/dialog";

const QR_PREVIEW_SIZE = 280;
const QR_EXPORT_SIZE = 1400;

const downloadBlob = (blob, filename) => {
  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = objectUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(objectUrl);
};

const serializeSvgElement = (svgElement) => new XMLSerializer().serializeToString(svgElement);

const DiningTableQrCode = memo(({ scanUrl, code }) => {
  const [isOpen, setIsOpen] = useState(false);
  const previewQrRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const getPreviewSvgElement = useCallback(() => previewQrRef.current?.querySelector("svg"), []);

  const handleDownloadSvg = useCallback(() => {
    const svgElement = getPreviewSvgElement();

    if (!svgElement) {
      return;
    }

    const svgString = serializeSvgElement(svgElement);
    const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });

    downloadBlob(svgBlob, `qr-meja-${code || "table"}.svg`);
  }, [code, getPreviewSvgElement]);

  const handleDownloadJpg = useCallback(() => {
    const svgElement = getPreviewSvgElement();

    if (!svgElement) {
      return;
    }

    const svgString = serializeSvgElement(svgElement);
    const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const objectUrl = URL.createObjectURL(svgBlob);
    const image = new Image();

    image.onload = () => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      canvas.width = QR_EXPORT_SIZE;
      canvas.height = QR_EXPORT_SIZE;

      if (!context) {
        URL.revokeObjectURL(objectUrl);
        return;
      }

      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            downloadBlob(blob, `qr-meja-${code || "table"}.jpg`);
          }

          URL.revokeObjectURL(objectUrl);
        },
        "image/jpeg",
        0.98,
      );
    };

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
    };

    image.src = objectUrl;
  }, [code, getPreviewSvgElement]);

  if (!scanUrl) {
    return <span className="text-xs text-muted-foreground">Tidak ada URL</span>;
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center  transition-colors border rounded-md bg-background border-border hover:bg-muted"
        aria-label={`Lihat QR meja ${code}`}
      >
        <QRCodeSVG value={scanUrl} size={42} level="M" includeMargin bgColor="transparent" fgColor="currentColor" className="size-10 text-foreground" />
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="w-[min(92vw,28rem)] gap-5" showCloseButton={false}>
          <DialogHeader className="items-center text-center">
            <DialogTitle className="text-lg">QR Meja {code}</DialogTitle>
          </DialogHeader>

          <div ref={previewQrRef} className="flex items-center justify-center p-6 border rounded-2xl bg-white">
            <QRCodeSVG value={scanUrl} size={QR_PREVIEW_SIZE} level="M" includeMargin bgColor="#ffffff" fgColor="#111111" className="text-foreground" />
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Button type="button" variant="outline" className="gap-2 flex-1" onClick={handleDownloadSvg}>
              <Download className="size-4" />
              Unduh SVG
            </Button>
            <Button type="button" variant="default" className="gap-2 flex-1" onClick={handleDownloadJpg}>
              <Download className="size-4" />
              Unduh JPG
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
});

export default DiningTableQrCode;
