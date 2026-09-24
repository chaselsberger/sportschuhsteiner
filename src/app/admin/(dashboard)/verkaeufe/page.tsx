import type { Metadata } from "next";
import { listOrders } from "@/lib/orders";
import { euro } from "@/lib/product-types";
import { VerkaeufeList } from "@/components/admin/VerkaeufeList";

export const metadata: Metadata = { title: "Verkäufe" };
export const dynamic = "force-dynamic";

export default async function AdminVerkaeufePage() {
  const orders = await listOrders();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let openShipments = 0;
  let openVouchers = 0;
  let todayRevenueCents = 0;

  for (const o of orders) {
    const hasShipping = Boolean(o.shippingAddressLine1);
    if (o.status === "bezahlt" && hasShipping && !o.shipped) openShipments++;
    if (o.status === "bezahlt" && o.type === "gutschein" && !o.voucherRedeemed) openVouchers++;
    if (o.status === "bezahlt" && o.createdAt >= today) todayRevenueCents += o.amountTotal;
  }

  const items = orders.map((o) => ({
    id: o.id,
    orderNumber: o.orderNumber,
    productTitle: o.productTitle,
    amountLabel: euro(o.amountTotal / 100),
    customerEmail: o.customerEmail,
    customerName: o.customerName,
    customerPhone: o.customerPhone,
    status: o.status,
    createdAt: o.createdAt.toISOString(),
    type: o.type,
    voucherCode: o.voucherCode,
    voucherRecipientName: o.voucherRecipientName,
    voucherMessage: o.voucherMessage,
    voucherRedeemed: o.voucherRedeemed,
    voucherRedeemedAt: o.voucherRedeemedAt?.toISOString() ?? null,
    billingAddress: {
      line1: o.billingAddressLine1,
      line2: o.billingAddressLine2,
      city: o.billingCity,
      postalCode: o.billingPostalCode,
      country: o.billingCountry,
    },
    shippingName: o.shippingName,
    shippingAddress: {
      line1: o.shippingAddressLine1,
      line2: o.shippingAddressLine2,
      city: o.shippingCity,
      postalCode: o.shippingPostalCode,
      country: o.shippingCountry,
    },
    shipped: o.shipped,
    shippedAt: o.shippedAt?.toISOString() ?? null,
    trackingNumber: o.trackingNumber,
    note: o.note,
    receiptUrl: o.receiptUrl,
    invoiceUrl: o.invoiceUrl,
    invoicePdfUrl: o.invoicePdfUrl,
    stripeSessionId: o.stripeSessionId,
    stripePaymentIntentId: o.stripePaymentIntentId,
  }));

  return (
    <VerkaeufeList
      orders={items}
      stats={{
        total: orders.length,
        openShipments,
        openVouchers,
        todayRevenueLabel: euro(todayRevenueCents / 100),
      }}
    />
  );
}
