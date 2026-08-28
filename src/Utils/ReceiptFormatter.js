import { ReceiptBuilder } from "@/Utils/EscPosHelper";
import { rupiah } from "@/Utils/rupiahHelper";

const formatRupiah = (val) => {
  return rupiah(val).replace(/\s+/g, " ");
};

/**
 * Normalizes an order from any endpoint (Cashier, Order List, etc.)
 * into a single unified format for receipt printing.
 */
export const normalizeReceiptOrder = (order = {}, details = null) => {
  const payment = order.payment || {};

  // 1. Table code (handle both flat string `table_code` and nested `table.code` or object)
  const isTakeAway = order.order_type === "TAKE_AWAY";
  const rawTable = order.table_code || order.table?.code || (typeof order.table === "string" ? order.table : null);
  const tableCode = isTakeAway ? "-" : rawTable || "-";

  // 2. Payment method
  const method = details?.method || payment.method || order.payment_method || order.payment_type || "tunai";
  const isCash = method === "tunai" || method === "cash";

  // 3. Amounts
  const paymentTotal = Number(order.total_amount || payment.amount || 0);
  const discountAmount = Number(order.discount_amount || 0);
  const taxPercentage = Number(order.tax_percentage || 0);

  // Use backend subtotal_amount if present; otherwise fallback to math
  const subtotalAmount =
    order.subtotal_amount != null
      ? Number(order.subtotal_amount)
      : (paymentTotal + discountAmount) / (1 + taxPercentage / 100);

  const taxAmount = paymentTotal + discountAmount - subtotalAmount;

  // Cash and change
  const cashAmount =
    details?.cashAmount != null
      ? Number(details.cashAmount)
      : Number(payment.payment_amount ?? order.cash_amount ?? order.cash_received ?? paymentTotal);

  const changeAmount =
    details?.changeAmount != null
      ? Number(details.changeAmount)
      : Number(payment.amount_change ?? order.change_amount ?? order.change ?? 0);

  // 4. Items (accurately separates base menu price from custom options)
  const items = (order.items || []).map((item) => {
    const qty = Number(item.qty || 1);
    const menuName = item.menu?.name || item.name || "Item";

    // Total harga satuan opsi kustom
    const totalCustomsUnitPrice = (item.customs || []).reduce(
      (sum, c) => sum + Number(c.price || 0),
      0,
    );

    // Harga satuan dasar menu murni (dikurangi opsi kustom jika item.price sudah include custom)
    const baseUnitPrice =
      item.menu?.price != null
        ? Number(item.menu.price)
        : Math.max(Number(item.price || 0) - totalCustomsUnitPrice, 0);

    // Subtotal untuk menu dasar saja (misal: 3x 20.000 = 60.000)
    const baseSubtotal = baseUnitPrice * qty;

    const customs = (item.customs || []).map((c) => {
      const cName = c.custom_name || c.name || "Opsi";
      const cUnitPrice = Number(c.price || 0);
      const cTotal = cUnitPrice * qty;
      return {
        name: cName,
        unitPrice: cUnitPrice,
        price: cTotal,
      };
    });

    const totalItemSubtotal = Number(item.subtotal || baseSubtotal + totalCustomsUnitPrice * qty);

    return {
      qty,
      menuName,
      baseUnitPrice,
      baseSubtotal,
      customs,
      totalItemSubtotal,
    };
  });

  return {
    orderNo: order.order_no || order.code || "-",
    orderTypeLabel: isTakeAway ? "Take Away" : "Dine In",
    customerName: order.customer_name || "-",
    tableCode,
    notes: order.notes || null,
    method,
    isCash,
    paymentMethodLabel: isCash ? "Tunai" : "Non Tunai",
    items,
    subtotalAmount,
    discountAmount,
    taxPercentage,
    taxAmount,
    paymentTotal,
    cashAmount,
    changeAmount,
  };
};

export const buildReceiptBytes = ({ order, tenant, paymentMethod, parsedCashAmount = 0, changeAmount = 0 }) => {
  const details = {
    method: paymentMethod,
    cashAmount: parsedCashAmount,
    changeAmount: changeAmount,
  };

  const normalized = normalizeReceiptOrder(order, details);
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

  // 1. Order info (Tipe Pesanan, Meja, Pelanggan, Waktu, dll)
  builder
    .alignLeft()
    .addLine(`Order: ${normalized.orderNo}`)
    .addLine(`Pelanggan: ${normalized.customerName}`)
    .addLine(`Tipe: ${normalized.orderTypeLabel}`)
    .addLine(`Meja: ${normalized.tableCode}`)
    .addLine(`Jenis: ${normalized.paymentMethodLabel}`)
    .addLine(`Waktu: ${new Date().toLocaleString("id-ID")}`);

  if (normalized.notes) {
    builder.addLine(`Catatan: ${normalized.notes}`);
  }

  builder.divider();

  // 2. Items list with Custom Options
  normalized.items.forEach((item) => {
    // Menu dasar dicetak dengan harga dasar murni (misal: 3x Lumpia Goreng Rp 60.000)
    const itemLine = `${item.qty}x ${item.menuName}`;
    const baseSubtotalStr = formatRupiah(item.baseSubtotal);
    builder.row(itemLine, baseSubtotalStr);

    // Opsi kustom dicetak di bawahnya dengan total penambahan harga (misal: + keju +Rp 3.000)
    item.customs.forEach((c) => {
      if (c.price > 0) {
        builder.row(`  + ${c.name}`, `+${formatRupiah(c.price)}`);
      } else {
        builder.addLine(`  + ${c.name}`);
      }
    });
  });

  builder.divider();

  // 3. Pricing breakdown: Subtotal, Diskon, Pajak, Total Tagihan
  builder.row("Subtotal", formatRupiah(normalized.subtotalAmount));

  if (normalized.discountAmount > 0) {
    builder.row("Diskon", `-${formatRupiah(normalized.discountAmount)}`);
  }

  if (normalized.taxAmount > 0) {
    builder.row(`Pajak (${normalized.taxPercentage}%)`, formatRupiah(normalized.taxAmount));
  }

  builder.row("Total Tagihan", formatRupiah(normalized.paymentTotal));

  // 4. Payment details (Tunai vs Non-Tunai)
  if (normalized.isCash) {
    builder.divider();
    builder.row("Dibayar", formatRupiah(normalized.cashAmount || normalized.paymentTotal));
    builder.row("Kembalian", formatRupiah(normalized.changeAmount));
  } else {
    builder.divider();
    builder.row("Status", "LUNAS");
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
