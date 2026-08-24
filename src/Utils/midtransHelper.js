const MIDTRANS_SNAP_URL = "https://app.sandbox.midtrans.com/snap/snap.js";

export const loadMidtransSnapScript = (clientKey = "") => {
  return new Promise((resolve, reject) => {
    if (window.snap) {
      resolve(window.snap);
      return;
    }

    const existingScript = document.getElementById("midtrans-snap-script");
    if (existingScript) {
      existingScript.onload = () => resolve(window.snap);
      existingScript.onerror = (err) => reject(err);
      return;
    }

    const script = document.createElement("script");
    script.src = MIDTRANS_SNAP_URL;
    script.id = "midtrans-snap-script";
    if (clientKey) {
      script.setAttribute("data-client-key", clientKey);
    }
    script.onload = () => resolve(window.snap);
    script.onerror = () => reject(new Error("Gagal memuat script Midtrans Snap"));
    document.body.appendChild(script);
  });
};
