-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Athlete" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "athleteId" TEXT,
    "gender" TEXT NOT NULL,
    "sport" TEXT NOT NULL
);
INSERT INTO "new_Athlete" ("athleteId", "gender", "id", "sport") SELECT "athleteId", "gender", "id", "sport" FROM "Athlete";
DROP TABLE "Athlete";
ALTER TABLE "new_Athlete" RENAME TO "Athlete";
CREATE UNIQUE INDEX "Athlete_athleteId_key" ON "Athlete"("athleteId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
