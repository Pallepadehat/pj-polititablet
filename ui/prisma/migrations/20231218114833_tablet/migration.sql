-- CreateTable
CREATE TABLE `TabletUser` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `admin` BOOLEAN NULL DEFAULT true,
    `pnummer` VARCHAR(191) NULL,
    `onDuty` BOOLEAN NULL DEFAULT false,
    `notifications` BOOLEAN NULL DEFAULT false,

    UNIQUE INDEX `TabletUser_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TabletSager` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sagsNr` VARCHAR(191) NOT NULL,
    `personNr` VARCHAR(191) NOT NULL,
    `pNummer` VARCHAR(191) NOT NULL,
    `beskrivelse` VARCHAR(191) NULL,
    `boede` VARCHAR(191) NULL,
    `faengsel` VARCHAR(191) NULL,
    `klip` VARCHAR(191) NULL,
    `oprettet` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `opdateret` DATETIME(3) NOT NULL,

    UNIQUE INDEX `TabletSager_sagsNr_key`(`sagsNr`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TabletEfterlysninger` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `beskrivelse` VARCHAR(191) NOT NULL,
    `oprettet` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `lukket` BOOLEAN NOT NULL DEFAULT false,
    `opdateret` DATETIME(3) NOT NULL,
    `createdById` INTEGER NOT NULL,

    INDEX `TabletEfterlysninger_createdById_idx`(`createdById`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_participatingOfficers` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_participatingOfficers_AB_unique`(`A`, `B`),
    INDEX `_participatingOfficers_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
