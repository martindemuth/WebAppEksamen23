/*
  Warnings:

  - The primary key for the `Meta` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Athlete" ADD COLUMN "metaId" TEXT;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Meta" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "athleteId" TEXT NOT NULL,
    "heartrate" INTEGER NOT NULL,
    "watt" INTEGER NOT NULL,
    "speed" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Meta_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "Athlete" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Meta" ("athleteId", "createdAt", "heartrate", "id", "speed", "updatedAt", "watt") SELECT "athleteId", "createdAt", "heartrate", "id", "speed", "updatedAt", "watt" FROM "Meta";
DROP TABLE "Meta";
ALTER TABLE "new_Meta" RENAME TO "Meta";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
