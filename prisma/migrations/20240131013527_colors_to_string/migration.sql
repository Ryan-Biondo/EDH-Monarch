/*
  Warnings:

  - You are about to drop the column `isBlack` on the `commander` table. All the data in the column will be lost.
  - You are about to drop the column `isBlue` on the `commander` table. All the data in the column will be lost.
  - You are about to drop the column `isGreen` on the `commander` table. All the data in the column will be lost.
  - You are about to drop the column `isRed` on the `commander` table. All the data in the column will be lost.
  - You are about to drop the column `isWhite` on the `commander` table. All the data in the column will be lost.
  - Added the required column `colors` to the `Commander` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `commander` DROP COLUMN `isBlack`,
    DROP COLUMN `isBlue`,
    DROP COLUMN `isGreen`,
    DROP COLUMN `isRed`,
    DROP COLUMN `isWhite`,
    ADD COLUMN `colors` VARCHAR(191) NOT NULL;
