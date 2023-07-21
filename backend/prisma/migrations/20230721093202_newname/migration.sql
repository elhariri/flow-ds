/*
  Warnings:

  - You are about to drop the `StockPrice` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "StockPrice";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "DailyStockPrice" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "lowestPrice" REAL NOT NULL,
    "highestPrice" REAL NOT NULL,
    "companyId" INTEGER NOT NULL,
    CONSTRAINT "DailyStockPrice_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "DailyStockPrice_companyId_idx" ON "DailyStockPrice"("companyId");
