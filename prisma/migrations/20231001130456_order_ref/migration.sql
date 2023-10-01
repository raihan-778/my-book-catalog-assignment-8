/*
  Warnings:

  - You are about to drop the column `orderedBookId` on the `orders` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_orderedBookId_fkey";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "orderedBookId";

-- AddForeignKey
ALTER TABLE "orderedBooks" ADD CONSTRAINT "orderedBooks_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
