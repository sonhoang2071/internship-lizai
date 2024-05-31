CREATE DATABASE crawl;

USE crawl;

CREATE TABLE `task`(
    `task_id` VARCHAR(255) NOT NULL  PRIMARY KEY,
    `search_url` VARCHAR(255) NOT NULL
);

CREATE TABLE `url`(
    `url_id` VARCHAR(255) NOT NULL  PRIMARY KEY,
    `title` TEXT NULL,
    `description` TEXT NULL,
    `text` TEXT NULL,
    `html` TEXT NULL,
    `is_crawled` TINYINT(1) NOT NULL DEFAULT '0',
    `parent_id` VARCHAR(255) NULL
);

CREATE TABLE `task_url`(
    `task_id` VARCHAR(255) NOT NULL,
    `url_id` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`task_id`, `url_id`)
);

ALTER TABLE
    `url` ADD CONSTRAINT `url_parent_id_foreign` FOREIGN KEY(`parent_id`) REFERENCES `url`(`url_id`);
ALTER TABLE
    `task_url` ADD CONSTRAINT `task_url_url_id_foreign` FOREIGN KEY(`url_id`) REFERENCES `url`(`url_id`);
ALTER TABLE
    `task_url` ADD CONSTRAINT `task_url_task_id_foreign` FOREIGN KEY(`task_id`) REFERENCES `task`(`task_id`);



