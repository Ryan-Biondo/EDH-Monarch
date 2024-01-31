/*
  Warnings:

  - You are about to alter the column `manaCost` on the `commander` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `colors` on the `commander` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.
  - Made the column `imageUrl` on table `commander` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `commander` MODIFY `manaCost` INTEGER NOT NULL,
    MODIFY `colors` JSON NOT NULL,
    MODIFY `imageUrl` VARCHAR(191) NOT NULL;
