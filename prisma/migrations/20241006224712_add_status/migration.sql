/*
  Warnings:

  - You are about to drop the column `published` on the `products` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('CURRENT', 'ENDING', 'EXIRED');

-- AlterTable
ALTER TABLE "products" DROP COLUMN "published",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'CURRENT';
