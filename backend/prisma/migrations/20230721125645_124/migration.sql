/*
  Warnings:

  - You are about to alter the column `date` on the `DailyStockPrice` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DailyStockPrice" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" INTEGER NOT NULL,
    "lowestPrice" REAL NOT NULL,
    "highestPrice" REAL NOT NULL,
    "companyId" INTEGER NOT NULL,
    CONSTRAINT "DailyStockPrice_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_DailyStockPrice" ("companyId", "date", "highestPrice", "id", "lowestPrice") SELECT "companyId", "date", "highestPrice", "id", "lowestPrice" FROM "DailyStockPrice";
DROP TABLE "DailyStockPrice";
ALTER TABLE "new_DailyStockPrice" RENAME TO "DailyStockPrice";
CREATE INDEX "DailyStockPrice_companyId_idx" ON "DailyStockPrice"("companyId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
