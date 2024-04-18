/*
  Warnings:

  - You are about to drop the column `weekDays` on the `StandUp` table. All the data in the column will be lost.
  - Added the required column `weekDay` to the `StandUp` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StandUp" DROP COLUMN "weekDays",
ADD COLUMN     "paused" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "weekDay" INTEGER NOT NULL;
