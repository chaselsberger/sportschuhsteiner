-- AlterTable
ALTER TABLE "Order" ADD COLUMN "billingAddressLine1" TEXT;
ALTER TABLE "Order" ADD COLUMN "billingAddressLine2" TEXT;
ALTER TABLE "Order" ADD COLUMN "billingCity" TEXT;
ALTER TABLE "Order" ADD COLUMN "billingCountry" TEXT;
ALTER TABLE "Order" ADD COLUMN "billingPostalCode" TEXT;
ALTER TABLE "Order" ADD COLUMN "customerPhone" TEXT;
ALTER TABLE "Order" ADD COLUMN "invoicePdfUrl" TEXT;
ALTER TABLE "Order" ADD COLUMN "invoiceUrl" TEXT;
ALTER TABLE "Order" ADD COLUMN "receiptUrl" TEXT;
ALTER TABLE "Order" ADD COLUMN "shippingAddressLine1" TEXT;
ALTER TABLE "Order" ADD COLUMN "shippingAddressLine2" TEXT;
ALTER TABLE "Order" ADD COLUMN "shippingCity" TEXT;
ALTER TABLE "Order" ADD COLUMN "shippingCountry" TEXT;
ALTER TABLE "Order" ADD COLUMN "shippingName" TEXT;
ALTER TABLE "Order" ADD COLUMN "shippingPostalCode" TEXT;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN "description" TEXT;
ALTER TABLE "Product" ADD COLUMN "detailsMaterial" TEXT;
ALTER TABLE "Product" ADD COLUMN "fitTip" TEXT;
