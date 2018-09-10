CREATE DATABASE IF NOT EXISTS homedb;

CREATE TABLE IF NOT EXISTS `transactions` (
	`id` bigint NOT NULL AUTO_INCREMENT,
	`type` bigint NOT NULL,
	`date` DATE NOT NULL,
	`amount` DECIMAL NOT NULL,
	`card` bigint NOT NULL,
	`notes` varchar(5000),
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `transaction_types` (
	`id` bigint NOT NULL AUTO_INCREMENT,
	`name` varchar(500) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `accounts` (
	`id` bigint NOT NULL AUTO_INCREMENT,
	`name` varchar(500) NOT NULL,
	`routing_number` varchar(9),
	`account_number` varchar(10),
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `monthly_expenses` (
	`id` bigint NOT NULL AUTO_INCREMENT,
	`type` bigint NOT NULL,
	`planned` DECIMAL NOT NULL,
	`actual` DECIMAL NOT NULL,
	`month` DATE NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `expense_type` (
	`id` bigint NOT NULL AUTO_INCREMENT,
	`name` varchar(500) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `paychecks` (
	`id` bigint NOT NULL AUTO_INCREMENT,
	`date` DATE NOT NULL,
	`account` bigint NOT NULL,
	`amount` DECIMAL NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `debts` (
	`id` bigint NOT NULL AUTO_INCREMENT,
	`amount` DECIMAL NOT NULL,
	`account` bigint,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `meals` (
	`id` bigint NOT NULL AUTO_INCREMENT,
	`name` varchar(500) NOT NULL,
	`notes` varchar(5000) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `groceries` (
	`id` bigint NOT NULL AUTO_INCREMENT,
	`name` varchar(500) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `meal_groceries` (
	`id` bigint NOT NULL AUTO_INCREMENT,
	`meal` bigint NOT NULL,
	`item` bigint NOT NULL,
	`amount` varchar(500) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `default_groceries` (
	`id` bigint NOT NULL AUTO_INCREMENT,
	`grocery` bigint NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `grocery_list` (
	`id` bigint NOT NULL AUTO_INCREMENT,
	`grocery` bigint NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `todo` (
	`id` bigint NOT NULL AUTO_INCREMENT,
	`notes` varchar(5000) NOT NULL,
	`completed` bool NOT NULL DEFAULT '0',
	`date` DATETIME NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `home_items` (
	`id` bigint NOT NULL AUTO_INCREMENT,
	`name` varchar(500) NOT NULL,
	`note` varchar(5000) NOT NULL,
	`obtained` bool NOT NULL DEFAULT '0',
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `deposits` (
	`id` bigint NOT NULL AUTO_INCREMENT,
	`name` varchar(500) NOT NULL,
	`amount` DECIMAL NOT NULL,
	`account` bigint,
	`note` varchar(5000) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `users` (
	`id` bigint NOT NULL AUTO_INCREMENT,
	`name` varchar(500) NOT NULL,
	`username` varchar(500) NOT NULL,
	`password` varchar(500) NOT NULL,
	`email` varchar(500) NOT NULL,
	`phone_number` varchar(10) NOT NULL,
	PRIMARY KEY (`id`)
);

ALTER TABLE `transactions` ADD CONSTRAINT `transactions_fk0` FOREIGN KEY (`type`) REFERENCES `transaction_types`(`id`);

ALTER TABLE `transactions` ADD CONSTRAINT `transactions_fk1` FOREIGN KEY (`card`) REFERENCES `accounts`(`id`);

ALTER TABLE `paychecks` ADD CONSTRAINT `paychecks_fk0` FOREIGN KEY (`account`) REFERENCES `accounts`(`id`);

ALTER TABLE `debts` ADD CONSTRAINT `debts_fk0` FOREIGN KEY (`account`) REFERENCES `accounts`(`id`);

ALTER TABLE `meal_groceries` ADD CONSTRAINT `meal_groceries_fk0` FOREIGN KEY (`meal`) REFERENCES `meals`(`id`);

ALTER TABLE `meal_groceries` ADD CONSTRAINT `meal_groceries_fk1` FOREIGN KEY (`item`) REFERENCES `groceries`(`id`);

ALTER TABLE `default_groceries` ADD CONSTRAINT `default_groceries_fk0` FOREIGN KEY (`grocery`) REFERENCES `groceries`(`id`);

ALTER TABLE `grocery_list` ADD CONSTRAINT `grocery_list_fk0` FOREIGN KEY (`grocery`) REFERENCES `groceries`(`id`);

ALTER TABLE `deposits` ADD CONSTRAINT `deposits_fk0` FOREIGN KEY (`account`) REFERENCES `accounts`(`id`);
