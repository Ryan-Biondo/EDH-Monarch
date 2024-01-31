/*
  Warnings:

  - The primary key for the `commander` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `commander` table. All the data in the column will be lost.
  - The primary key for the `gamecommander` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `scryfallId` to the `Commander` table without a default value. This is not possible if the table is not empty.
  - Made the column `imageUrl` on table `commander` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `gamecommander` DROP FOREIGN KEY `GameCommander_commanderId_fkey`;

-- AlterTable
ALTER TABLE `commander` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `scryfallId` VARCHAR(191) NOT NULL,
    MODIFY `imageUrl` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`scryfallId`);

-- AlterTable
ALTER TABLE `gamecommander` DROP PRIMARY KEY,
    MODIFY `commanderId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`gameId`, `commanderId`);

-- AddForeignKey
ALTER TABLE `GameCommander` ADD CONSTRAINT `GameCommander_commanderId_fkey` FOREIGN KEY (`commanderId`) REFERENCES `Commander`(`scryfallId`) ON DELETE RESTRICT ON UPDATE CASCADE;
