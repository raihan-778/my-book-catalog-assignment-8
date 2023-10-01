/*
  Warnings:

  - Added the required column `orderedBookId` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "orderedBooks" DROP CONSTRAINT "orderedBooks_orderId_fkey";

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "orderedBookId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_orderedBookId_fkey" FOREIGN KEY ("orderedBookId") REFERENCES "orderedBooks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
