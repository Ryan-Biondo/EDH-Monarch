/*
  Warnings:

  - Made the column `manaCost` on table `commander` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `commander` MODIFY `manaCost` VARCHAR(191) NOT NULL;
