-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: addjorney
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `achivers`
--

DROP TABLE IF EXISTS `achivers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `achivers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `image` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `achivers`
--

LOCK TABLES `achivers` WRITE;
/*!40000 ALTER TABLE `achivers` DISABLE KEYS */;
/*!40000 ALTER TABLE `achivers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `adminsettings`
--

DROP TABLE IF EXISTS `adminsettings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `adminsettings` (
  `setlevel` int NOT NULL DEFAULT '1',
  `setdirect` int DEFAULT '1',
  `setreward` int DEFAULT '1',
  `setregister` int DEFAULT '1',
  `setlogin` int DEFAULT '1',
  `setwithdrawal` int DEFAULT '1',
  `setdeposite` int DEFAULT '1',
  `setroi` int DEFAULT '1',
  `setsupport` int DEFAULT '1',
  `settopup` int DEFAULT '1',
  PRIMARY KEY (`setlevel`)
) ENGINE=InnoDB DEFAULT CHARSET=utf32;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adminsettings`
--

LOCK TABLES `adminsettings` WRITE;
/*!40000 ALTER TABLE `adminsettings` DISABLE KEYS */;
INSERT INTO `adminsettings` VALUES (1,1,1,1,1,1,1,1,1,1);
/*!40000 ALTER TABLE `adminsettings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bonuses`
--

DROP TABLE IF EXISTS `bonuses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bonuses` (
  `id` int DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `bonus_type` text,
  `status` text,
  `created_at` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bonuses`
--

LOCK TABLES `bonuses` WRITE;
/*!40000 ALTER TABLE `bonuses` DISABLE KEYS */;
INSERT INTO `bonuses` VALUES (1,20,'roi_income','approved','2025-04-04 11:16:41'),(2,20,'sponsor_income','approved','2025-04-04 11:16:41'),(3,20,'telegram_income','approved','2025-04-04 11:16:41'),(4,100,'add_income','approved','2025-04-04 11:16:41');
/*!40000 ALTER TABLE `bonuses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cto`
--

DROP TABLE IF EXISTS `cto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cto` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `paid` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'unpaid',
  `amount` float DEFAULT '0',
  `gift` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'unpaid',
  `paid_at` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'qualified',
  `category` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `monthly_amount` float DEFAULT '10',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cto`
--

LOCK TABLES `cto` WRITE;
/*!40000 ALTER TABLE `cto` DISABLE KEYS */;
/*!40000 ALTER TABLE `cto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cto_transaction`
--

DROP TABLE IF EXISTS `cto_transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cto_transaction` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `amount` float DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cto_transaction`
--

LOCK TABLES `cto_transaction` WRITE;
/*!40000 ALTER TABLE `cto_transaction` DISABLE KEYS */;
/*!40000 ALTER TABLE `cto_transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `direct_transaction`
--

DROP TABLE IF EXISTS `direct_transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `direct_transaction` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `amount` float DEFAULT NULL,
  `userby_id` int DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `percent` float DEFAULT NULL,
  `onamount` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf32;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `direct_transaction`
--

LOCK TABLES `direct_transaction` WRITE;
/*!40000 ALTER TABLE `direct_transaction` DISABLE KEYS */;
INSERT INTO `direct_transaction` VALUES (1,1,4,92,'2025-03-19 11:09:05',4,100),(2,1,22,92,'2025-04-07 09:50:12',4,550),(3,92,2.5,93,'2025-04-07 11:15:36',5,50),(4,92,27.5,93,'2025-04-07 11:15:41',5,550);
/*!40000 ALTER TABLE `direct_transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invest_level`
--

DROP TABLE IF EXISTS `invest_level`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invest_level` (
  `id` int NOT NULL AUTO_INCREMENT,
  `level_1` float DEFAULT '0',
  `level_2` float DEFAULT '0',
  `level_3` float DEFAULT '0',
  `level_4` float DEFAULT '0',
  `level_5` float DEFAULT '0',
  `level_6` float DEFAULT '0',
  `level_7` float DEFAULT '0',
  `level_8` float DEFAULT '0',
  `level_9` float DEFAULT '0',
  `level_10` float DEFAULT '0',
  `level_11` float DEFAULT '0',
  `level_12` float DEFAULT '0',
  `level_13` float DEFAULT '0',
  `level_14` float DEFAULT '0',
  `level_15` float DEFAULT '0',
  `level_16` float DEFAULT '0',
  `level_17` float DEFAULT '0',
  `level_18` float DEFAULT '0',
  `level_19` float DEFAULT '0',
  `level_20` float DEFAULT '0',
  `level_21` float DEFAULT '0',
  `level_22` float DEFAULT '0',
  `level_23` float DEFAULT '0',
  `level_24` float DEFAULT '0',
  `level_25` float DEFAULT '0',
  `level_26` float DEFAULT '0',
  `level_27` float DEFAULT '0',
  `level_28` float DEFAULT '0',
  `level_29` float DEFAULT '0',
  `level_30` float DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf32;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invest_level`
--

LOCK TABLES `invest_level` WRITE;
/*!40000 ALTER TABLE `invest_level` DISABLE KEYS */;
INSERT INTO `invest_level` VALUES (1,10,5,4,3,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
/*!40000 ALTER TABLE `invest_level` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invest_level_transaction`
--

DROP TABLE IF EXISTS `invest_level_transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invest_level_transaction` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `amount` float DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  `onamount` float DEFAULT NULL,
  `percent` float DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `userby_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf32;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invest_level_transaction`
--

LOCK TABLES `invest_level_transaction` WRITE;
/*!40000 ALTER TABLE `invest_level_transaction` DISABLE KEYS */;
/*!40000 ALTER TABLE `invest_level_transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification_recipients`
--

DROP TABLE IF EXISTS `notification_recipients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification_recipients` (
  `recipient_id` int NOT NULL AUTO_INCREMENT,
  `notification_id` int NOT NULL,
  `user_id` int NOT NULL,
  `seen` int NOT NULL DEFAULT '0',
  `seen_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`recipient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification_recipients`
--

LOCK TABLES `notification_recipients` WRITE;
/*!40000 ALTER TABLE `notification_recipients` DISABLE KEYS */;
/*!40000 ALTER TABLE `notification_recipients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `message` text,
  `created_by` int DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(100) NOT NULL DEFAULT 'pending',
  `type` varchar(100) NOT NULL DEFAULT 'notification',
  `users` int NOT NULL DEFAULT '0',
  `image` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `otp_requests`
--

DROP TABLE IF EXISTS `otp_requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `otp_requests` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `otp` varchar(6) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `expires_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `otp_requests`
--

LOCK TABLES `otp_requests` WRITE;
/*!40000 ALTER TABLE `otp_requests` DISABLE KEYS */;
/*!40000 ALTER TABLE `otp_requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plans`
--

DROP TABLE IF EXISTS `plans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plans` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `monthly_price` float DEFAULT NULL,
  `description` text,
  `ROI_day` float DEFAULT NULL,
  `ROI_overall` float DEFAULT NULL,
  `Sponser_bonus` float DEFAULT NULL,
  `plan_period` int DEFAULT NULL,
  `max` int DEFAULT NULL,
  `min` int DEFAULT NULL,
  `working_max` int DEFAULT NULL,
  `roi_max` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf32;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plans`
--

LOCK TABLES `plans` WRITE;
/*!40000 ALTER TABLE `plans` DISABLE KEYS */;
INSERT INTO `plans` VALUES (1,'bronze',2000,'$2000-4999',2,2,5,24,4999,2000,3,2),(2,'silver',5000,'$5000-9999',4,4,5,24,9999,5000,4,2),(3,'gold',10000,'$10000-above',8,8,5,24,10000000,10000,5,2);
/*!40000 ALTER TABLE `plans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `qr`
--

DROP TABLE IF EXISTS `qr`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `qr` (
  `id` int NOT NULL AUTO_INCREMENT,
  `BEB20` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `TRC20` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `qr`
--

LOCK TABLES `qr` WRITE;
/*!40000 ALTER TABLE `qr` DISABLE KEYS */;
/*!40000 ALTER TABLE `qr` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resetpass`
--

DROP TABLE IF EXISTS `resetpass`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `resetpass` (
  `id` int NOT NULL AUTO_INCREMENT,
  `token` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `user_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resetpass`
--

LOCK TABLES `resetpass` WRITE;
/*!40000 ALTER TABLE `resetpass` DISABLE KEYS */;
/*!40000 ALTER TABLE `resetpass` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reward_transaction`
--

DROP TABLE IF EXISTS `reward_transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reward_transaction` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `amount` float DEFAULT '0',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf32;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reward_transaction`
--

LOCK TABLES `reward_transaction` WRITE;
/*!40000 ALTER TABLE `reward_transaction` DISABLE KEYS */;
/*!40000 ALTER TABLE `reward_transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roi_transaction`
--

DROP TABLE IF EXISTS `roi_transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roi_transaction` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `amount` float DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `onamount` float DEFAULT NULL,
  `percent` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf32;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roi_transaction`
--

LOCK TABLES `roi_transaction` WRITE;
/*!40000 ALTER TABLE `roi_transaction` DISABLE KEYS */;
/*!40000 ALTER TABLE `roi_transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `salary_transaction`
--

DROP TABLE IF EXISTS `salary_transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `salary_transaction` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `type` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `salary_transaction`
--

LOCK TABLES `salary_transaction` WRITE;
/*!40000 ALTER TABLE `salary_transaction` DISABLE KEYS */;
/*!40000 ALTER TABLE `salary_transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `support`
--

DROP TABLE IF EXISTS `support`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `support` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `title` text,
  `message` text,
  `status` varchar(10) DEFAULT 'pending',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf32;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `support`
--

LOCK TABLES `support` WRITE;
/*!40000 ALTER TABLE `support` DISABLE KEYS */;
/*!40000 ALTER TABLE `support` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `topup`
--

DROP TABLE IF EXISTS `topup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `topup` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userby_id` int DEFAULT NULL,
  `userto_id` int DEFAULT NULL,
  `amount` float DEFAULT '0',
  `createdAT` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(45) DEFAULT 'complete',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf32;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topup`
--

LOCK TABLES `topup` WRITE;
/*!40000 ALTER TABLE `topup` DISABLE KEYS */;
INSERT INTO `topup` VALUES (1,92,92,100,'2025-03-19 11:09:05','complete'),(2,92,92,550,'2025-04-07 09:50:12','complete'),(3,93,93,50,'2025-04-07 11:15:36','complete'),(4,93,93,550,'2025-04-07 11:15:41','complete');
/*!40000 ALTER TABLE `topup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactions` (
  `transaction_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `transaction_type` text,
  `source` text,
  `status` text,
  `created_at` text,
  `updated_at` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES (1,3,200,'credit','sponsor_income','completed','2025-04-04 10:52:31','2025-04-04 10:52:31'),(2,3,500,'credit','telegram_income','completed','2025-04-04 10:54:19','2025-04-04 10:54:19'),(3,3,100,'credit','add_income','completed','2025-04-04 10:55:17','2025-04-04 10:55:17'),(4,3,1.5,'credit','roi_income','completed','2025-04-04 10:55:17','2025-04-04 10:55:17'),(5,3,20,'credit','sponsor_income','completed','2025-04-04 12:10:13','2025-04-04 12:10:13'),(6,3,20,'credit','telegram_income','completed','2025-04-04 12:12:41','2025-04-04 12:12:41'),(7,3,20,'credit','telegram_income','completed','2025-04-04 12:13:11','2025-04-04 12:13:11'),(8,3,100,'credit','add_income','completed','2025-04-04 12:13:51','2025-04-04 12:13:51'),(9,3,20,'credit','sponsor_income','completed','2025-04-04 12:17:47','2025-04-04 12:17:47'),(10,3,20,'credit','sponsor_income','completed','2025-04-04 14:35:49','2025-04-04 14:35:49'),(11,3,100,'credit','add_income','completed','2025-04-04 14:36:05','2025-04-04 14:36:05'),(12,2,100,'credit','add_income','completed','2025-04-04 17:04:47','2025-04-04 17:04:47'),(13,2,100,'credit','add_income','completed','2025-04-04 17:06:34','2025-04-04 17:06:34'),(14,2,50,'credit','roi_income','completed','2025-04-05 12:58:35','2025-04-05 12:58:35'),(15,2,20,'credit','sponsor_income','completed','2025-04-05 14:54:12','2025-04-05 14:54:12'),(16,2,20,'credit','sponsor_income','completed','2025-04-05 14:59:00','2025-04-05 14:59:00'),(NULL,92,20,'credit','telegram_income','completed',NULL,NULL),(NULL,92,100,'credit','add_income','completed',NULL,NULL),(NULL,92,100,'credit','add_income','completed',NULL,NULL),(NULL,92,50,'credit','roi_income','completed',NULL,NULL),(NULL,92,20,'credit','sponsor_income','completed',NULL,NULL),(NULL,92,50,'credit','roi_income','completed',NULL,NULL);
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transfer`
--

DROP TABLE IF EXISTS `transfer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transfer` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userby_id` int NOT NULL,
  `userto_id` int NOT NULL,
  `amount` float NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `description` text NOT NULL COMMENT 'NA',
  `status` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transfer`
--

LOCK TABLES `transfer` WRITE;
/*!40000 ALTER TABLE `transfer` DISABLE KEYS */;
/*!40000 ALTER TABLE `transfer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_deposite`
--

DROP TABLE IF EXISTS `user_deposite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_deposite` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `amount` float DEFAULT NULL,
  `status` varchar(10) DEFAULT 'complete',
  `createdAT` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `image_name` text,
  `currency` varchar(45) DEFAULT NULL,
  `acceptat` varchar(45) DEFAULT NULL,
  `hash` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf32;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_deposite`
--

LOCK TABLES `user_deposite` WRITE;
/*!40000 ALTER TABLE `user_deposite` DISABLE KEYS */;
INSERT INTO `user_deposite` VALUES (1,92,1000,'TRN-ADM002','2025-03-19 11:07:51',NULL,NULL,'2025-03-19 16:37:51',NULL),(2,92,500,'TRN-ADM002','2025-04-07 10:50:11',NULL,NULL,'2025-04-07 16:20:11',NULL),(3,93,1000,'TRN-ADM002','2025-04-07 11:15:23',NULL,NULL,'2025-04-07 16:45:23',NULL);
/*!40000 ALTER TABLE `user_deposite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) DEFAULT NULL,
  `fullname` varchar(255) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `phone` bigint DEFAULT NULL,
  `role` varchar(10) DEFAULT 'user',
  `status` varchar(10) DEFAULT 'unblock',
  `is_active` varchar(10) DEFAULT 'inactive',
  `reffer_by` varchar(45) DEFAULT NULL,
  `refferal_code` varchar(45) DEFAULT NULL,
  `total_team` int unsigned DEFAULT '0',
  `plan_id` int unsigned DEFAULT '0',
  `active_plan` float unsigned DEFAULT '0',
  `business` float unsigned DEFAULT '0',
  `roi_income` float unsigned DEFAULT '0',
  `roi_income_day` float unsigned DEFAULT '0',
  `level_income_day` float unsigned DEFAULT '0',
  `level_income` float unsigned DEFAULT '0',
  `reward` float unsigned DEFAULT '0',
  `reward_level` int unsigned DEFAULT '0',
  `activation_date` varchar(20) DEFAULT NULL,
  `last_login` varchar(45) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `bep20` varchar(255) DEFAULT NULL,
  `trc20` varchar(255) DEFAULT NULL,
  `roi_status` varchar(100) NOT NULL DEFAULT 'open',
  `level_status` varchar(45) NOT NULL DEFAULT 'open',
  `max_amount` float unsigned NOT NULL DEFAULT '0',
  `updated_at` varchar(255) DEFAULT NULL,
  `month_salary` int unsigned DEFAULT '0',
  `total_salary` int unsigned DEFAULT '0',
  `month_duration` int unsigned DEFAULT '0',
  `salary_start` varchar(45) DEFAULT NULL,
  `salary_level` int DEFAULT NULL,
  `working` float unsigned DEFAULT '0',
  `non_working` float unsigned DEFAULT '0',
  `cto` varchar(45) DEFAULT 'false',
  `entry_fees` varchar(45) DEFAULT '0',
  `max` int DEFAULT '2',
  `tokens` varchar(255) DEFAULT '0',
  `roi_percentage` int DEFAULT '10',
  `direct_income` float unsigned DEFAULT '0',
  `roi_max` int DEFAULT NULL,
  `wallet` float unsigned DEFAULT '0',
  `sponsor_income` float unsigned DEFAULT '0',
  `add_income` float unsigned DEFAULT '0',
  `telegram_income` float unsigned DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=utf32;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','','admin@gmail.com','123',1234567890,'admin','unblock','active',NULL,'ABCDEF01',10,1,100,200,2.582,0.2,0,0.774,0,0,NULL,'2025-03-17 13:01:13','2024-08-30 06:11:26',NULL,NULL,'open','open',65.495,NULL,0,0,0,NULL,NULL,4.562,1.165,'false','0',2,NULL,0,57,2,0,0,0,0),(92,'TRC819593','Aidan Hart','vihivud@mailinator.com','12345678',92,'user','unblock','active','ABCDEF01','TRC819593',1,2,650,850,100,0,0,0,0,0,'2025-04-07 15:20:12','2025-04-07 16:47:28','2025-03-19 11:07:40',NULL,NULL,'open','open',30,NULL,0,0,0,NULL,NULL,0,0,'false','0',4,'0',10,30,2,320,120,500,109),(93,'TRC953539','Karleigh Bass','tahijudi@mailinator.com','K@1owazawo',8909909090,'user','unblock','active','TRC819593','TRC953539',0,2,600,400,0,0,0,0,0,0,'2025-04-07 16:45:41',NULL,'2025-04-07 11:15:01',NULL,NULL,'open','open',0,NULL,0,0,0,NULL,NULL,0,0,'false','0',4,'0',10,0,2,0,0,0,0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `withdrawal_request`
--

DROP TABLE IF EXISTS `withdrawal_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `withdrawal_request` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `amount` float DEFAULT NULL,
  `status` varchar(45) DEFAULT 'pending',
  `createdAT` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `acceptat` varchar(45) DEFAULT NULL,
  `type` varchar(50) NOT NULL,
  `deduction` float NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf32;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `withdrawal_request`
--

LOCK TABLES `withdrawal_request` WRITE;
/*!40000 ALTER TABLE `withdrawal_request` DISABLE KEYS */;
/*!40000 ALTER TABLE `withdrawal_request` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-08 10:37:40
