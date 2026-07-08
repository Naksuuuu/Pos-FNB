import { ReceiptBuilder } from "@/Utils/EscPosHelper";
import { rupiah } from "@/Utils/rupiahHelper";

const formatRupiah = (val) => {
  return rupiah(val).replace(/\s+/g, " ");
};

export const buildReceiptBytes = ({ order, tenant, paymentMethod, parsedCashAmount = 0, changeAmount = 0 }) => {
  const builder = new ReceiptBuilder();

  builder
    .init()
    .alignCenter()
    .doubleFont(true)
    .bold(true)
    .addLine(tenant?.restaurant_name || "TENANT")
    .doubleFont(false)
    .bold(false);

  if (tenant?.address) {
    builder.addLine(tenant.address);
  }
  if (tenant?.phone_number) {
    builder.addLine(`Telp: ${tenant.phone_number}`);
  }
  if (tenant?.instagram) {
    builder.addLine(`IG: @${tenant.instagram.replace(/^@/, "")}`);
  }

  builder.divider();

  // Order info
  const paymentMethodLabel = paymentMethod === "tunai" ? "Tunai" : "Non Tunai";
  builder
    .alignLeft()
    .addLine(`Order: ${order.order_no || order.code || "-"}`)
    .addLine(`Pelanggan: ${order.customer_name || "-"}`)
    .addLine(`Meja: ${order.table?.code || "Take Away"}`)
    .addLine(`Jenis: ${paymentMethodLabel}`)
    .addLine(`Waktu: ${new Date().toLocaleString("id-ID")}`)
    .divider();

  // Items list
  order.items?.forEach((item) => {
    const itemLine = `${item.qty}x ${item.menu?.name || "Item"}`;
    const subtotalStr = formatRupiah(item.subtotal || 0);
    builder.row(itemLine, subtotalStr);
  });

  builder.divider();

  // Total info
  const paymentTotal = Number(order.total_amount || 0);
  const taxPercentage = Number(order.tax_percentage) || 0;
  const orderSubtotal = paymentTotal / (1 + taxPercentage / 100);
  const taxAmount = paymentTotal - orderSubtotal;

  builder.row("Subtotal", formatRupiah(orderSubtotal));

  if (taxAmount > 0) {
    builder.row(`Pajak (${taxPercentage}%)`, formatRupiah(taxAmount));
  }

  builder.row("Total Tagihan", formatRupiah(paymentTotal));

  // Payment details
  if (paymentMethod === "tunai") {
    builder.divider();
    builder.row("Dibayar", formatRupiah(parsedCashAmount || paymentTotal));
    builder.row("Kembalian", formatRupiah(changeAmount));
  }

  builder.divider().alignCenter();

  if (tenant?.wifi_password) {
    builder.addLine(`Wifi Pass: ${tenant.wifi_password}`).addLine("");
  }

  builder
    .addLine("Terima Kasih")
    .addLine("Silakan Datang Kembali")
    .addLine("")
    .addLine("Powered By Kodingin.id")
    .feedAndCut();

  return builder.build();
};
