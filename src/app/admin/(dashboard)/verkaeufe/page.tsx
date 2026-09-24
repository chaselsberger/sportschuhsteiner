import type { Metadata } from "next";
import { listOrders } from "@/lib/orders";
import { euro } from "@/lib/product-types";
import { OrderRow } from "@/components/admin/OrderRow";

export const metadata: Metadata = { title: "Verkäufe" };
export const dynamic = "force-dynamic";

export default async function AdminVerkaeufePage() {
  const orders = await listOrders();

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between gap-4">
        <h1 className="t-h3 text-nachtblau">Verkäufe</h1>
        <span className="text-sm text-text-muted">{orders.length} gesamt</span>
      </div>

      <div className="flex flex-col gap-2.5">
        {orders.map((o) => (
          <OrderRow
            key={o.id}
            id={o.id}
            orderNumber={o.orderNumber}
            productTitle={o.productTitle}
            amountLabel={euro(o.amountTotal / 100)}
            customerEmail={o.customerEmail}
            customerName={o.customerName}
            customerPhone={o.customerPhone}
            status={o.status}
            createdAt={o.createdAt.toISOString()}
            type={o.type}
            voucherCode={o.voucherCode}
            voucherRecipientName={o.voucherRecipientName}
            voucherMessage={o.voucherMessage}
            voucherRedeemed={o.voucherRedeemed}
            voucherRedeemedAt={o.voucherRedeemedAt?.toISOString() ?? null}
            billingAddress={{
              line1: o.billingAddressLine1,
              line2: o.billingAddressLine2,
              city: o.billingCity,
              postalCode: o.billingPostalCode,
              country: o.billingCountry,
            }}
            shippingName={o.shippingName}
            shippingAddress={{
              line1: o.shippingAddressLine1,
              line2: o.shippingAddressLine2,
              city: o.shippingCity,
              postalCode: o.shippingPostalCode,
              country: o.shippingCountry,
            }}
            receiptUrl={o.receiptUrl}
            invoiceUrl={o.invoiceUrl}
            invoicePdfUrl={o.invoicePdfUrl}
            stripeSessionId={o.stripeSessionId}
            stripePaymentIntentId={o.stripePaymentIntentId}
          />
        ))}
        {orders.length === 0 && (
          <p className="m-0 text-sm text-text-muted">Noch keine Verkäufe.</p>
        )}
      </div>
    </div>
  );
}
