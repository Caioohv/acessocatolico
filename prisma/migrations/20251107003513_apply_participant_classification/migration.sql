-- AlterTable
ALTER TABLE `events` ALTER COLUMN `category` DROP DEFAULT,
    ALTER COLUMN `slug` DROP DEFAULT;

-- AlterTable
ALTER TABLE `ministry_members` ALTER COLUMN `updatedAt` DROP DEFAULT;
