/*
  Warnings:

  - You are about to drop the column `athleteId` on the `Meta` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Meta` table. All the data in the column will be lost.
  - Made the column `metaId` on table `Athlete` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateTable
CREATE TABLE "MetaArchive" (
    "metaId" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    "archivedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "heartrate" INTEGER NOT NULL,
    "watt" INTEGER NOT NULL,
    "speed" INTEGER NOT NULL,

    PRIMARY KEY ("metaId", "updatedAt"),
    CONSTRAINT "MetaArchive_metaId_fkey" FOREIGN KEY ("metaId") REFERENCES "Meta" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Meta" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "heartrate" INTEGER NOT NULL,
    "watt" INTEGER NOT NULL,
    "speed" INTEGER NOT NULL,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Meta" ("heartrate", "id", "speed", "watt") SELECT "heartrate", "id", "speed", "watt" FROM "Meta";
DROP TABLE "Meta";
ALTER TABLE "new_Meta" RENAME TO "Meta";
CREATE TABLE "new_Athlete" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "sportId" INTEGER NOT NULL,
    "metaId" TEXT NOT NULL,
    CONSTRAINT "Athlete_sportId_fkey" FOREIGN KEY ("sportId") REFERENCES "Sport" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Athlete_metaId_fkey" FOREIGN KEY ("metaId") REFERENCES "Meta" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Athlete" ("gender", "id", "metaId", "sportId", "userId") SELECT "gender", "id", "metaId", "sportId", "userId" FROM "Athlete";
DROP TABLE "Athlete";
ALTER TABLE "new_Athlete" RENAME TO "Athlete";
CREATE UNIQUE INDEX "Athlete_userId_key" ON "Athlete"("userId");
CREATE UNIQUE INDEX "Athlete_metaId_key" ON "Athlete"("metaId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
