-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "orderNumber" TEXT NOT NULL,
    "stripeSessionId" TEXT NOT NULL,
    "stripePaymentIntentId" TEXT,
    "productId" TEXT,
    "productTitle" TEXT NOT NULL,
    "amountTotal" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'eur',
    "customerEmail" TEXT,
    "customerName" TEXT,
    "customerPhone" TEXT,
    "billingAddressLine1" TEXT,
    "billingAddressLine2" TEXT,
    "billingCity" TEXT,
    "billingPostalCode" TEXT,
    "billingCountry" TEXT,
    "shippingName" TEXT,
    "shippingAddressLine1" TEXT,
    "shippingAddressLine2" TEXT,
    "shippingCity" TEXT,
    "shippingPostalCode" TEXT,
    "shippingCountry" TEXT,
    "receiptUrl" TEXT,
    "invoiceUrl" TEXT,
    "invoicePdfUrl" TEXT,
    "status" TEXT NOT NULL DEFAULT 'bezahlt',
    "type" TEXT NOT NULL DEFAULT 'produkt',
    "voucherCode" TEXT,
    "voucherRecipientName" TEXT,
    "voucherMessage" TEXT,
    "voucherRedeemed" BOOLEAN NOT NULL DEFAULT false,
    "voucherRedeemedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Order_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("amountTotal", "billingAddressLine1", "billingAddressLine2", "billingCity", "billingCountry", "billingPostalCode", "createdAt", "currency", "customerEmail", "customerName", "customerPhone", "id", "invoicePdfUrl", "invoiceUrl", "orderNumber", "productId", "productTitle", "receiptUrl", "shippingAddressLine1", "shippingAddressLine2", "shippingCity", "shippingCountry", "shippingName", "shippingPostalCode", "status", "stripePaymentIntentId", "stripeSessionId") SELECT "amountTotal", "billingAddressLine1", "billingAddressLine2", "billingCity", "billingCountry", "billingPostalCode", "createdAt", "currency", "customerEmail", "customerName", "customerPhone", "id", "invoicePdfUrl", "invoiceUrl", "orderNumber", "productId", "productTitle", "receiptUrl", "shippingAddressLine1", "shippingAddressLine2", "shippingCity", "shippingCountry", "shippingName", "shippingPostalCode", "status", "stripePaymentIntentId", "stripeSessionId" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
CREATE UNIQUE INDEX "Order_orderNumber_key" ON "Order"("orderNumber");
CREATE UNIQUE INDEX "Order_stripeSessionId_key" ON "Order"("stripeSessionId");
CREATE UNIQUE INDEX "Order_voucherCode_key" ON "Order"("voucherCode");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
