CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`email` varchar(128),
	`password` varchar(256));

CREATE UNIQUE INDEX `email_idx` ON `users` (`email`);