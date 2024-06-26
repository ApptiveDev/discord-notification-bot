/*
  Warnings:

  - You are about to drop the column `serverId` on the `StandUp` table. All the data in the column will be lost.
  - You are about to drop the `Server` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `guildId` to the `StandUp` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "StandUp" DROP CONSTRAINT "StandUp_serverId_fkey";

-- AlterTable
ALTER TABLE "StandUp" DROP COLUMN "serverId",
ADD COLUMN     "guildId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Server";

-- CreateTable
CREATE TABLE "Guild" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "managerRole" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Guild_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Guild_managerRole_key" ON "Guild"("managerRole");

-- AddForeignKey
ALTER TABLE "StandUp" ADD CONSTRAINT "StandUp_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
