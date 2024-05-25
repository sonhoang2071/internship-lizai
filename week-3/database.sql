CREATE DATABASE basic_api;

use basic_api;

CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO posts(title, content)
VALUES("Post 1", "This is post 1"), ("Post 2", "This is post 2");


