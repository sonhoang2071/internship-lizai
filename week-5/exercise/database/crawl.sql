CREATE DATABASE crawl;

USE crawl;

CREATE TABLE `task`(
    `taskId` VARCHAR(255) NOT NULL  PRIMARY KEY,
    `searchUrl` VARCHAR(255) NOT NULL,
    `keyword` VARCHAR(255) NOT NULL
);

CREATE TABLE `url`(
    `urlId` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `urlString` VARCHAR(255) NOT NULL,
    `title` TEXT NULL,
    `description` TEXT NULL,
    `text` LONGTEXT NULL,
    `html` LONGTEXT NULL,
    `time` DATETIME NOT NULL
);

CREATE TABLE `task_url` (
    `taskId` VARCHAR(255) NOT NULL,
    `urlId` BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY (`taskId`, `urlId`)
);


ALTER TABLE
    `task_url` ADD CONSTRAINT `task_url_url_id_foreign` FOREIGN KEY(`urlId`) REFERENCES `url`(`urlId`);
ALTER TABLE
    `task_url` ADD CONSTRAINT `task_url_task_id_foreign` FOREIGN KEY(`taskId`) REFERENCES `task`(`taskId`);
