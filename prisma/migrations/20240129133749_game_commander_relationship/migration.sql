-- CreateTable
CREATE TABLE `GameCommander` (
    `gameId` INTEGER NOT NULL,
    `commanderId` INTEGER NOT NULL,

    PRIMARY KEY (`gameId`, `commanderId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `GameCommander` ADD CONSTRAINT `GameCommander_gameId_fkey` FOREIGN KEY (`gameId`) REFERENCES `Game`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GameCommander` ADD CONSTRAINT `GameCommander_commanderId_fkey` FOREIGN KEY (`commanderId`) REFERENCES `Commander`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
