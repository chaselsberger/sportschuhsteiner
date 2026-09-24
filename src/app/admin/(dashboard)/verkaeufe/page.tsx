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
            status={o.status}
            createdAt={o.createdAt.toISOString()}
          />
        ))}
        {orders.length === 0 && (
          <p className="m-0 text-sm text-text-muted">Noch keine Verkäufe.</p>
        )}
      </div>
    </div>
  );
}
