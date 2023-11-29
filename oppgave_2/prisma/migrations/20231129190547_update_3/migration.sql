/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Meta` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Meta` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Meta" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "athleteId" TEXT NOT NULL,
    "heartrate" INTEGER NOT NULL,
    "watt" INTEGER NOT NULL,
    "speed" INTEGER NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Meta_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "Athlete" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Meta" ("athleteId", "heartrate", "id", "speed", "watt") SELECT "athleteId", "heartrate", "id", "speed", "watt" FROM "Meta";
DROP TABLE "Meta";
ALTER TABLE "new_Meta" RENAME TO "Meta";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
