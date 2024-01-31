/*
  Warnings:

  - You are about to drop the column `colors` on the `commander` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `commander` DROP COLUMN `colors`,
    ADD COLUMN `isBlack` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `isBlue` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `isGreen` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `isRed` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `isWhite` BOOLEAN NOT NULL DEFAULT false;
