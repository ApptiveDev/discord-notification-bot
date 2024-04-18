/*
  Warnings:

  - Added the required column `authorId` to the `StandUp` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StandUp" ADD COLUMN     "authorId" TEXT NOT NULL;
