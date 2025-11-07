/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `events` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `category` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ministry_members` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `events` ADD COLUMN `address` VARCHAR(191) NULL,
    ADD COLUMN `ageMax` INTEGER NULL,
    ADD COLUMN `ageMin` INTEGER NULL,
    ADD COLUMN `attachments` JSON NULL,
    ADD COLUMN `category` VARCHAR(191) NOT NULL DEFAULT 'geral',
    ADD COLUMN `coordinates` VARCHAR(191) NULL,
    ADD COLUMN `coverImage` VARCHAR(191) NULL,
    ADD COLUMN `currency` VARCHAR(191) NOT NULL DEFAULT 'BRL',
    ADD COLUMN `customForm` JSON NULL,
    ADD COLUMN `gallery` JSON NULL,
    ADD COLUMN `isFeatured` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `isOnline` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `isPublic` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `metaDescription` VARCHAR(191) NULL,
    ADD COLUMN `metaTitle` VARCHAR(191) NULL,
    ADD COLUMN `minParticipants` INTEGER NULL DEFAULT 1,
    ADD COLUMN `onlineUrl` VARCHAR(191) NULL,
    ADD COLUMN `publishedAt` DATETIME(3) NULL,
    ADD COLUMN `registrationEnd` DATETIME(3) NULL,
    ADD COLUMN `registrationRequired` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `registrationStart` DATETIME(3) NULL,
    ADD COLUMN `requiresApproval` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `shareCount` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `slug` VARCHAR(191) NOT NULL DEFAULT 'evento-default',
    ADD COLUMN `tags` JSON NULL,
    ADD COLUMN `targetAudience` JSON NULL,
    ADD COLUMN `timezone` VARCHAR(191) NOT NULL DEFAULT 'America/Sao_Paulo',
    ADD COLUMN `viewCount` INTEGER NOT NULL DEFAULT 0;

-- Update existing events with proper values
UPDATE `events` SET `category` = 'geral' WHERE `category` = 'geral';
UPDATE `events` SET `slug` = CONCAT('evento-', `id`) WHERE `slug` = 'evento-default';

-- AlterTable
ALTER TABLE `ministries` ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `leaderId` VARCHAR(191) NULL,
    ADD COLUMN `minLevel` ENUM('NOVICE', 'SERVANT', 'LEADER') NOT NULL DEFAULT 'NOVICE',
    ADD COLUMN `requiresApproval` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `ministry_members` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `leftAt` DATETIME(3) NULL,
    ADD COLUMN `participantId` VARCHAR(191) NULL,
    ADD COLUMN `participantRole` ENUM('MEMBER', 'SERVANT', 'LEADER', 'MINISTRY_HEAD') NOT NULL DEFAULT 'MEMBER',
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `parishes` ADD COLUMN `latitude` DOUBLE NULL,
    ADD COLUMN `longitude` DOUBLE NULL;

-- CreateTable
CREATE TABLE `priest_registrations` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `birthDate` DATETIME(3) NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `bio` TEXT NULL,
    `ordinationNumber` VARCHAR(191) NOT NULL,
    `ordinationDate` DATETIME(3) NOT NULL,
    `ordinationDioceseId` VARCHAR(191) NOT NULL,
    `seminary` VARCHAR(191) NULL,
    `specializations` JSON NULL,
    `languages` JSON NULL,
    `status` ENUM('PENDING', 'UNDER_REVIEW', 'APPROVED', 'REJECTED', 'REQUIRES_DOCUMENTATION') NOT NULL DEFAULT 'PENDING',
    `statusUpdatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `statusUpdatedBy` VARCHAR(191) NULL,
    `reviewComments` TEXT NULL,
    `internalNotes` TEXT NULL,
    `emailVerified` BOOLEAN NOT NULL DEFAULT false,
    `emailVerificationToken` VARCHAR(191) NULL,
    `emailVerificationSentAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `priest_registrations_userId_key`(`userId`),
    UNIQUE INDEX `priest_registrations_email_key`(`email`),
    UNIQUE INDEX `priest_registrations_cpf_key`(`cpf`),
    UNIQUE INDEX `priest_registrations_ordinationNumber_key`(`ordinationNumber`),
    UNIQUE INDEX `priest_registrations_emailVerificationToken_key`(`emailVerificationToken`),
    INDEX `priest_registrations_status_idx`(`status`),
    INDEX `priest_registrations_email_idx`(`email`),
    INDEX `priest_registrations_cpf_idx`(`cpf`),
    INDEX `priest_registrations_ordinationNumber_idx`(`ordinationNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `priest_documents` (
    `id` VARCHAR(191) NOT NULL,
    `registrationId` VARCHAR(191) NOT NULL,
    `type` ENUM('ORDINATION_CERTIFICATE', 'IDENTITY_DOCUMENT', 'RESIDENCE_PROOF', 'RECOMMENDATION_LETTER', 'OTHER') NOT NULL,
    `fileName` VARCHAR(191) NOT NULL,
    `originalFileName` VARCHAR(191) NOT NULL,
    `filePath` VARCHAR(191) NOT NULL,
    `fileSize` INTEGER NOT NULL,
    `mimeType` VARCHAR(191) NOT NULL,
    `status` ENUM('PENDING', 'APPROVED', 'REJECTED', 'REQUIRES_REPLACEMENT') NOT NULL DEFAULT 'PENDING',
    `statusUpdatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `statusUpdatedBy` VARCHAR(191) NULL,
    `reviewComments` TEXT NULL,
    `uploadedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `priest_documents_registrationId_idx`(`registrationId`),
    INDEX `priest_documents_type_idx`(`type`),
    INDEX `priest_documents_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `priest_approval_history` (
    `id` VARCHAR(191) NOT NULL,
    `registrationId` VARCHAR(191) NOT NULL,
    `fromStatus` ENUM('PENDING', 'UNDER_REVIEW', 'APPROVED', 'REJECTED', 'REQUIRES_DOCUMENTATION') NOT NULL,
    `toStatus` ENUM('PENDING', 'UNDER_REVIEW', 'APPROVED', 'REJECTED', 'REQUIRES_DOCUMENTATION') NOT NULL,
    `comments` TEXT NULL,
    `adminId` VARCHAR(191) NULL,
    `adminEmail` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `priest_approval_history_registrationId_idx`(`registrationId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `event_comments` (
    `id` VARCHAR(191) NOT NULL,
    `eventId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `content` TEXT NOT NULL,
    `isPublic` BOOLEAN NOT NULL DEFAULT true,
    `isApproved` BOOLEAN NOT NULL DEFAULT true,
    `moderatedBy` VARCHAR(191) NULL,
    `moderatedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `event_comments_eventId_idx`(`eventId`),
    INDEX `event_comments_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `event_forms` (
    `id` VARCHAR(191) NOT NULL,
    `eventId` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL DEFAULT 'Formulário de Inscrição',
    `description` TEXT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `allowMultipleSubmissions` BOOLEAN NOT NULL DEFAULT false,
    `requiresApproval` BOOLEAN NOT NULL DEFAULT false,
    `opensAt` DATETIME(3) NULL,
    `closesAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `event_forms_eventId_key`(`eventId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `event_form_fields` (
    `id` VARCHAR(191) NOT NULL,
    `formId` VARCHAR(191) NOT NULL,
    `type` ENUM('TEXT', 'EMAIL', 'PHONE', 'NUMBER', 'DATE', 'DATETIME', 'TIME', 'SELECT', 'RADIO', 'CHECKBOX', 'MULTISELECT', 'TEXTAREA', 'FILE', 'BOOLEAN', 'CPF', 'RG', 'CEP') NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `label` VARCHAR(191) NOT NULL,
    `placeholder` VARCHAR(191) NULL,
    `helpText` VARCHAR(191) NULL,
    `isRequired` BOOLEAN NOT NULL DEFAULT false,
    `minLength` INTEGER NULL,
    `maxLength` INTEGER NULL,
    `pattern` VARCHAR(191) NULL,
    `options` JSON NULL,
    `showIfField` VARCHAR(191) NULL,
    `showIfValue` VARCHAR(191) NULL,
    `order` INTEGER NOT NULL DEFAULT 0,
    `group` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `event_form_fields_formId_idx`(`formId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `event_form_submissions` (
    `id` VARCHAR(191) NOT NULL,
    `formId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `name` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `status` ENUM('PENDING', 'APPROVED', 'REJECTED', 'INCOMPLETE') NOT NULL DEFAULT 'PENDING',
    `approvedBy` VARCHAR(191) NULL,
    `approvedAt` DATETIME(3) NULL,
    `rejectedReason` VARCHAR(191) NULL,
    `registrationId` VARCHAR(191) NULL,
    `submittedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `event_form_submissions_registrationId_key`(`registrationId`),
    INDEX `event_form_submissions_formId_idx`(`formId`),
    INDEX `event_form_submissions_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `event_form_responses` (
    `id` VARCHAR(191) NOT NULL,
    `submissionId` VARCHAR(191) NOT NULL,
    `fieldId` VARCHAR(191) NOT NULL,
    `value` JSON NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `event_form_responses_submissionId_fieldId_key`(`submissionId`, `fieldId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `event_waiting_list` (
    `id` VARCHAR(191) NOT NULL,
    `eventId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `position` INTEGER NOT NULL,
    `priority` INTEGER NOT NULL DEFAULT 0,
    `notifyEmail` BOOLEAN NOT NULL DEFAULT true,
    `notifySms` BOOLEAN NOT NULL DEFAULT false,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `promotedAt` DATETIME(3) NULL,
    `joinedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `event_waiting_list_eventId_position_idx`(`eventId`, `position`),
    UNIQUE INDEX `event_waiting_list_eventId_userId_key`(`eventId`, `userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `event_notification_templates` (
    `id` VARCHAR(191) NOT NULL,
    `eventId` VARCHAR(191) NOT NULL,
    `type` ENUM('REGISTRATION_CONFIRMATION', 'REGISTRATION_APPROVED', 'REGISTRATION_REJECTED', 'EVENT_REMINDER', 'EVENT_UPDATE', 'EVENT_CANCELLED', 'WAITING_LIST_PROMOTION', 'CUSTOM') NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `subject` VARCHAR(191) NULL,
    `htmlContent` TEXT NULL,
    `textContent` TEXT NULL,
    `smsContent` VARCHAR(191) NULL,
    `title` VARCHAR(191) NULL,
    `message` TEXT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `sendAt` ENUM('IMMEDIATE', 'HOURS_BEFORE', 'DAYS_BEFORE', 'WEEKS_BEFORE', 'AT_EVENT_TIME', 'HOURS_AFTER', 'DAYS_AFTER') NOT NULL,
    `hoursOffset` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `event_notification_logs` (
    `id` VARCHAR(191) NOT NULL,
    `templateId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `error` VARCHAR(191) NULL,
    `metadata` JSON NULL,
    `sentAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `participant_profiles` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `level` ENUM('NOVICE', 'SERVANT', 'LEADER') NOT NULL DEFAULT 'NOVICE',
    `role` ENUM('MEMBER', 'SERVANT', 'LEADER', 'MINISTRY_HEAD') NOT NULL DEFAULT 'MEMBER',
    `totalEvents` INTEGER NOT NULL DEFAULT 0,
    `totalHours` INTEGER NOT NULL DEFAULT 0,
    `joinedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `lastActivity` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `points` INTEGER NOT NULL DEFAULT 0,
    `rank` INTEGER NULL,
    `bio` TEXT NULL,
    `skills` TEXT NULL,
    `interests` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `participant_profiles_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `badges` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `type` ENUM('PARTICIPATION', 'ACHIEVEMENT', 'LEADERSHIP', 'SERVICE', 'SPECIAL') NOT NULL,
    `iconUrl` VARCHAR(191) NULL,
    `color` VARCHAR(191) NOT NULL DEFAULT '#6B7280',
    `criteria` TEXT NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `isAutoAwarded` BOOLEAN NOT NULL DEFAULT false,
    `totalAwarded` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `participant_badges` (
    `id` VARCHAR(191) NOT NULL,
    `participantId` VARCHAR(191) NOT NULL,
    `badgeId` VARCHAR(191) NOT NULL,
    `awardedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `awardedBy` VARCHAR(191) NULL,
    `reason` TEXT NULL,

    UNIQUE INDEX `participant_badges_participantId_badgeId_key`(`participantId`, `badgeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `services` (
    `id` VARCHAR(191) NOT NULL,
    `ministryId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `requiredLevel` ENUM('NOVICE', 'SERVANT', 'LEADER') NOT NULL DEFAULT 'NOVICE',
    `requiredSkills` TEXT NULL,
    `maxAssignments` INTEGER NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `duration` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `service_assignments` (
    `id` VARCHAR(191) NOT NULL,
    `serviceId` VARCHAR(191) NOT NULL,
    `participantId` VARCHAR(191) NOT NULL,
    `ministryId` VARCHAR(191) NOT NULL,
    `scheduledFor` DATETIME(3) NOT NULL,
    `duration` INTEGER NULL,
    `status` ENUM('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED') NOT NULL DEFAULT 'PENDING',
    `isConfirmed` BOOLEAN NOT NULL DEFAULT false,
    `confirmedAt` DATETIME(3) NULL,
    `notes` TEXT NULL,
    `feedback` TEXT NULL,
    `rating` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `availability_slots` (
    `id` VARCHAR(191) NOT NULL,
    `participantId` VARCHAR(191) NOT NULL,
    `dayOfWeek` INTEGER NOT NULL,
    `startTime` VARCHAR(191) NOT NULL,
    `endTime` VARCHAR(191) NOT NULL,
    `status` ENUM('AVAILABLE', 'UNAVAILABLE', 'MAYBE') NOT NULL DEFAULT 'AVAILABLE',
    `isRecurring` BOOLEAN NOT NULL DEFAULT true,
    `specificDate` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `participation_history` (
    `id` VARCHAR(191) NOT NULL,
    `participantId` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `referenceId` VARCHAR(191) NOT NULL,
    `referenceName` VARCHAR(191) NOT NULL,
    `hoursParticipated` INTEGER NULL,
    `pointsEarned` INTEGER NOT NULL DEFAULT 0,
    `participatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `events_slug_key` ON `events`(`slug`);

-- CreateIndex
CREATE INDEX `events_status_idx` ON `events`(`status`);

-- CreateIndex
CREATE INDEX `events_category_idx` ON `events`(`category`);

-- CreateIndex
CREATE INDEX `events_startDate_idx` ON `events`(`startDate`);

-- AddForeignKey
ALTER TABLE `priest_registrations` ADD CONSTRAINT `priest_registrations_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `priest_registrations` ADD CONSTRAINT `priest_registrations_ordinationDioceseId_fkey` FOREIGN KEY (`ordinationDioceseId`) REFERENCES `dioceses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `priest_documents` ADD CONSTRAINT `priest_documents_registrationId_fkey` FOREIGN KEY (`registrationId`) REFERENCES `priest_registrations`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `priest_approval_history` ADD CONSTRAINT `priest_approval_history_registrationId_fkey` FOREIGN KEY (`registrationId`) REFERENCES `priest_registrations`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `event_comments` ADD CONSTRAINT `event_comments_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `events`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `event_comments` ADD CONSTRAINT `event_comments_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ministries` ADD CONSTRAINT `ministries_leaderId_fkey` FOREIGN KEY (`leaderId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ministry_members` ADD CONSTRAINT `ministry_members_participantId_fkey` FOREIGN KEY (`participantId`) REFERENCES `participant_profiles`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `event_forms` ADD CONSTRAINT `event_forms_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `events`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `event_form_fields` ADD CONSTRAINT `event_form_fields_formId_fkey` FOREIGN KEY (`formId`) REFERENCES `event_forms`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `event_form_submissions` ADD CONSTRAINT `event_form_submissions_formId_fkey` FOREIGN KEY (`formId`) REFERENCES `event_forms`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `event_form_submissions` ADD CONSTRAINT `event_form_submissions_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `event_form_submissions` ADD CONSTRAINT `event_form_submissions_registrationId_fkey` FOREIGN KEY (`registrationId`) REFERENCES `event_registrations`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `event_form_responses` ADD CONSTRAINT `event_form_responses_submissionId_fkey` FOREIGN KEY (`submissionId`) REFERENCES `event_form_submissions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `event_form_responses` ADD CONSTRAINT `event_form_responses_fieldId_fkey` FOREIGN KEY (`fieldId`) REFERENCES `event_form_fields`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `event_waiting_list` ADD CONSTRAINT `event_waiting_list_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `events`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `event_waiting_list` ADD CONSTRAINT `event_waiting_list_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `event_notification_templates` ADD CONSTRAINT `event_notification_templates_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `events`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `event_notification_logs` ADD CONSTRAINT `event_notification_logs_templateId_fkey` FOREIGN KEY (`templateId`) REFERENCES `event_notification_templates`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `event_notification_logs` ADD CONSTRAINT `event_notification_logs_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `participant_profiles` ADD CONSTRAINT `participant_profiles_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `participant_badges` ADD CONSTRAINT `participant_badges_participantId_fkey` FOREIGN KEY (`participantId`) REFERENCES `participant_profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `participant_badges` ADD CONSTRAINT `participant_badges_badgeId_fkey` FOREIGN KEY (`badgeId`) REFERENCES `badges`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `participant_badges` ADD CONSTRAINT `participant_badges_awardedBy_fkey` FOREIGN KEY (`awardedBy`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `services` ADD CONSTRAINT `services_ministryId_fkey` FOREIGN KEY (`ministryId`) REFERENCES `ministries`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `service_assignments` ADD CONSTRAINT `service_assignments_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `services`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `service_assignments` ADD CONSTRAINT `service_assignments_participantId_fkey` FOREIGN KEY (`participantId`) REFERENCES `participant_profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `service_assignments` ADD CONSTRAINT `service_assignments_ministryId_fkey` FOREIGN KEY (`ministryId`) REFERENCES `ministries`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `availability_slots` ADD CONSTRAINT `availability_slots_participantId_fkey` FOREIGN KEY (`participantId`) REFERENCES `participant_profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `participation_history` ADD CONSTRAINT `participation_history_participantId_fkey` FOREIGN KEY (`participantId`) REFERENCES `participant_profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `events` RENAME INDEX `events_organizerId_fkey` TO `events_organizerId_idx`;

-- RenameIndex
ALTER TABLE `events` RENAME INDEX `events_parishId_fkey` TO `events_parishId_idx`;
