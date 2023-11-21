/*
  Warnings:

  - You are about to drop the column `year` on the `Competition` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `Goal` table. All the data in the column will be lost.
  - Added the required column `comment` to the `Competition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `competitionGoal` to the `Competition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Competition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Competition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priority` to the `Competition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `comment` to the `Goal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Goal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `goalTarget` to the `Goal` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Competition" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "location" TEXT NOT NULL,
    "competitionGoal" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "athleteId" TEXT NOT NULL,
    CONSTRAINT "Competition_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "Athlete" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Competition" ("athleteId", "id") SELECT "athleteId", "id" FROM "Competition";
DROP TABLE "Competition";
ALTER TABLE "new_Competition" RENAME TO "Competition";
CREATE TABLE "new_Goal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "goalTarget" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "athleteId" TEXT NOT NULL,
    CONSTRAINT "Goal_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "Athlete" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Goal" ("athleteId", "id") SELECT "athleteId", "id" FROM "Goal";
DROP TABLE "Goal";
ALTER TABLE "new_Goal" RENAME TO "Goal";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
