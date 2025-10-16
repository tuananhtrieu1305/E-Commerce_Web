-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: e_commerce_2
-- ------------------------------------------------------
-- Server version	8.0.43

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
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'USER',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=120 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES (1,'super_admin','adminpass','admin1@example.com','ADMIN','2025-08-25 07:50:52','2025-09-16 12:45:32',0),(2,'toi la 1','userpass1','user1@example.com','USER','2025-08-25 07:50:52','2025-09-16 12:46:21',0),(3,'user2update','userpass2','user2@example.com','USER','2025-08-25 07:50:52','2025-09-16 12:10:20',0),(4,'toi la 3','userpass3','user3@example.com','USER','2025-08-25 07:50:52','2025-09-16 13:04:26',0),(6,'johndoe','123456','john@example.com','USER','2025-09-11 00:02:57','2025-09-11 00:02:57',0),(7,'johndoe222','123456','john222@example.com','USER','2025-09-11 00:06:53','2025-09-16 12:58:18',0),(9,'testBcrypt','$2a$10$dnmVpi6xl0yiN8abm.zlae0jLiiIiZK28CKrywtkkNXqXRnZGUZTy','bcrypt@example.com','USER','2025-09-11 00:51:50','2025-09-16 12:57:43',0),(10,'le hti câcca','passUser10','lethic@example.com','USER','2025-09-12 01:02:00','2025-09-16 13:32:19',0),(11,'nguyenv','passUser11','nguyenv@example.com','USER','2025-09-12 01:04:00',NULL,1),(12,'phamthu','passUser12','phamthu@example.com','USER','2025-09-12 01:06:00',NULL,1),(13,'hoangnam','passUser13','hoangnam@example.com','USER','2025-09-12 01:08:00',NULL,1),(14,'ngoclan','passUser14','ngoclan@example.com','USER','2025-09-12 01:10:00',NULL,1),(15,'minhduydghgfh','passUser15','minhduy@example.com','USER','2025-09-12 01:12:00','2025-09-16 23:19:12',1),(16,'thuynga','passUser16','thuynga@example.com','USER','2025-09-12 01:14:00',NULL,1),(17,'anhkhoahgsshh','passUser17','anhkhoa@example.com','USER','2025-09-12 01:16:00','2025-09-16 23:26:55',1),(18,'huynhmai','passUser18','huynhmai@example.com','USER','2025-09-12 01:18:00',NULL,0),(19,'quanghuy','passUser19','quanghuy@example.com','USER','2025-09-12 01:20:00',NULL,0),(20,'thanhhoa','passUser20','thanhhoa@example.com','USER','2025-09-12 01:22:00',NULL,0),(21,'nguyenk','passUser21','nguyenk@example.com','USER','2025-09-12 01:24:00',NULL,0),(22,'phamlinh','passUser22','phamlinh@example.com','USER','2025-09-12 01:26:00',NULL,0),(23,'doantruong','passUser23','doantruong@example.com','USER','2025-09-12 01:28:00',NULL,0),(24,'trinhmai','passUser24','trinhmai@example.com','USER','2025-09-12 01:30:00',NULL,0),(25,'admin2','AdminPass25','admin2@example.com','ADMIN','2025-09-12 01:32:00',NULL,0),(26,'seller1','sellerPass26','seller1@example.com','USER','2025-09-12 01:34:00',NULL,0),(27,'seller2','sellerPass27','seller2@example.com','USER','2025-09-12 01:36:00',NULL,0),(28,'luonganh','passUser28','luonganh@example.com','USER','2025-09-12 01:38:00',NULL,0),(29,'admin2','$2a$10$sPqoTcpWCLZK2eK1XwbtNuig0drPB9oNMoSXb1Yk2UoZUKkSQj5aC','adin@gmail.com','ADMIN','2025-09-17 00:36:00','2025-09-17 12:10:21',0),(30,'admin3','$2a$10$4rnOrrbDQURGpxmyYEl/C.t7JGYw0nOYZAdqT4B93MXxBDyir8Xx6','dakfja@gmail.com','ADMIN','2025-09-17 00:42:03','2025-09-17 00:42:03',1),(31,'admin3','$2a$10$5zpbclHZ.DIfRG/xdjFL9eAsKvEGmPpKWHxOczKfyAg88qDFECbeK','adaadla@gmail.com','ADMIN','2025-09-17 12:09:37','2025-09-17 12:09:37',1),(32,'anh01','$2a$10$YimTGNXGon3rgvDE0/v8d.vvCC40KuQjP.gVyw6NUczmiQXo3eNWq','anh01@example.com','User','2025-09-17 23:39:56','2025-09-17 23:39:56',0),(33,'bao02','$2a$10$v43ggEi8.c5D3UvNcGjW3O3gIntAIUTC6pV/4Nt5t.tqWHSSE61r.','bao02@example.com','User','2025-09-17 23:39:56','2025-09-17 23:39:56',0),(34,'chi03','$2a$10$dg9.8B31cryaal0m9zjW6Ocsv/91bwYxBe7jzLAZYQ9SDCzSJq.Hy','chi03@example.com','User','2025-09-17 23:39:56','2025-09-17 23:39:56',0),(35,'duy04','$2a$10$PUYFZEkNyQE4YqBsPOpSZ.U9kaJWQ3w1VrcBHBbgOW6WjphXnrdmC','duy04@example.com','User','2025-09-17 23:39:56','2025-09-17 23:39:56',0),(36,'hieu05','$2a$10$B7WpaduLhdPydJkAWoexfe93eRJ72IDLJYUaROdLCT16nnTtieAGi','hieu05@example.com','User','2025-09-17 23:39:56','2025-09-17 23:39:56',0),(37,'hong06','$2a$10$A3uu4gP9ca88blwhtQhlIupCn2JKzO0dFyOGI9LvqInpnT3ZFhuuO','hong06@example.com','User','2025-09-17 23:39:56','2025-09-17 23:39:56',0),(38,'khanh07','$2a$10$6VgnBh2XGzl96kEMZOg8quvujmABfYPqwuAScJT/HSqlFNYkmXmLu','khanh07@example.com','User','2025-09-17 23:39:56','2025-09-17 23:39:56',0),(39,'linh08','$2a$10$TTm/.1vzD8YkbqEUpXkLce.gFyIZPLMCpDuCoKQvbD4LFfWf/y2Hm','linh08@example.com','User','2025-09-17 23:39:56','2025-09-17 23:39:56',0),(40,'minh09','$2a$10$75/BB2MbO8DNZV1JY/izUe1Ccp6eYtngYHwOT1.QtfyYUxfj7NkH6','minh09@example.com','User','2025-09-17 23:39:56','2025-09-17 23:39:56',0),(41,'nga10','$2a$10$aDBDI5IDevTKOZZx4tz9ZODu9lrnRaWVn7Haj.ZidaVxMjjcjotBK','nga10@example.com','User','2025-09-17 23:39:57','2025-09-17 23:39:57',0),(42,'ngoc11','$2a$10$A3J9i0UifxtcIpapINSSluZWV5xg1BEwbZzb.D0zMAYAN72Lw2rHW','ngoc11@example.com','User','2025-09-17 23:39:57','2025-09-17 23:39:57',0),(43,'nhat12','$2a$10$Hqhd2HoVNZwv7y8Sv8IQZ.OoDvh5JVhBDTmDYE5BXR7i8QvvuWXfS','nhat12@example.com','User','2025-09-17 23:39:57','2025-09-17 23:39:57',0),(44,'phuc13','$2a$10$SZfuhnj7cbuT95Ivg37.5.2OFFV1rBEhatdltWUUrpWy/7nds/Pdy','phuc13@example.com','User','2025-09-17 23:39:57','2025-09-17 23:39:57',0),(45,'quang14','$2a$10$V4UR8Zxf5mp1F6e8Arsrm.klMDDJTV5W50/z2nijr5xnj0U7Fc.8e','quang14@example.com','User','2025-09-17 23:39:57','2025-09-17 23:39:57',0),(46,'thanh15','$2a$10$1.XAt87lwu2hbbxYLLG3a..jwOchvOtfskaExo/Rzq8Ma8usgoRuK','thanh15@example.com','User','2025-09-17 23:39:57','2025-09-17 23:39:57',0),(47,'thao16','$2a$10$HhpzBuInfTicf2jaIsTO5.Y4AVc44YlwpTepKrrdMfJJVNlebmcpO','thao16@example.com','User','2025-09-17 23:39:57','2025-09-17 23:39:57',0),(48,'trang17','$2a$10$gA6VRyDcnPo6OL0yJ65y2ejl1TwnNiwlVDTSRst3iZWqN0ryRfMK.','trang17@example.com','User','2025-09-17 23:39:57','2025-09-17 23:39:57',0),(49,'trinh18','$2a$10$RVm1XTZUaK7UTldLzXUQqO8OORcxUa9h3Gb75Fomo8dFreDkf/aiC','trinh18@example.com','User','2025-09-17 23:39:57','2025-09-17 23:39:57',0),(50,'viet19','$2a$10$S7WT6CBlu.j7U44CUunC8OHG6tpZNDyipfds919Sy5JqqQ/7OHHne','viet19@example.com','User','2025-09-17 23:39:57','2025-09-17 23:39:57',0),(51,'yến20','$2a$10$zOlsoRpRgTkYDaaXJWtjluRLsvu/N6oosbYvl6xRFnAcLyTBlcNDO','yến20@example.com','User','2025-09-17 23:39:57','2025-09-17 23:39:57',0),(52,'test create one','$2a$10$Kc9s7VFT/q7/3oL0mWeQhOkTY8gndPRxmKDuL/9NYCDE.pUmuhw0e','tsdjaf@gamail.com','USER','2025-09-18 00:10:45','2025-09-18 00:10:45',0),(53,'dfasdfaf','$2a$10$svCq1/th2LJUx5OSZT0du.mKy4rjHxdFnJcj8Cg2Im96rFMpkWstK','aadfadf@gmail.com','USER','2025-09-18 00:11:15','2025-09-18 00:11:15',0),(54,'àddafaf','$2a$10$xXc830tB3iyxhNFdStWzn.ig3t133DyTil4UX1kKdoDqLZGb6Onbm','adsfhgoo@gmail.com','USER','2025-09-18 00:12:37','2025-09-18 00:12:37',0),(55,'tetsktsjtslkt','$2a$10$hbPjicwgIhlQH1XuWTUbbev4hwgrE3zPj8jF1rmUx5ujGJ1L3L3v6','uartiauty@gmail.com','USER','2025-09-18 00:13:49','2025-09-18 00:13:49',0),(56,'anh.phan01','$2a$10$47qNoBgvcM57Jh9pUTqUVe.cAEB.0oVfpu3ORQz8gFU/m3qCsPK4u','anh.phan01@gmail.com','User','2025-09-18 00:23:04','2025-09-18 00:23:04',0),(57,'bảo.phan02','$2a$10$.k9T7QMffnM3YyQ40bgxlOEI8.2KhVW37KArHNgxMR4qOnIA0E.xW','bảo.phan02@gmail.com','User','2025-09-18 00:23:04','2025-09-18 00:23:04',0),(58,'chí.nguyen03','$2a$10$SkrY0nDIxM8ODLRTk58r5.lZfw5ae4OfVOdlGHuGI8uPshO68fryu','chí.nguyen03@gmail.com','User','2025-09-18 00:23:04','2025-09-18 00:23:04',0),(59,'duy.bui04','$2a$10$gNvHP07mIDMNImjfvjxgb.TT0FCPM4ZR0M9nx1OjYY5DSK2bX0tkC','duy.bui04@gmail.com','User','2025-09-18 00:23:05','2025-09-18 00:23:05',0),(60,'hiếu.do05','$2a$10$aoIkzJRAiBrvUXcLeFsIAeLD1GJ4uKSQCVDPYj2rY6hDiMhGr9/CC','hiếu.do05@gmail.com','User','2025-09-18 00:23:05','2025-09-18 00:23:05',0),(61,'hồng.le06','$2a$10$ojcJV9Q812t4pgPXRBelM.vFLV/DcovOBuE5k.u74egvszRrMRwgu','hồng.le06@gmail.com','User','2025-09-18 00:23:05','2025-09-18 00:23:05',0),(62,'khánh.do07','$2a$10$tpyUUOVjoRSN4kg6cDMBZ.3CbnRO/EmZQ62483qwyu4CQ06XdBiCG','khánh.do07@gmail.com','User','2025-09-18 00:23:05','2025-09-18 00:23:05',0),(63,'linh.do08','$2a$10$GRHqYVrXJieYtKtM2/HSNuCtao.LYGNy5pBydy57w10BcJIthLczy','linh.do08@gmail.com','User','2025-09-18 00:23:05','2025-09-18 00:23:05',0),(64,'minh.vu09','$2a$10$Vfso2YLtxExhiQ/jpnllwOyLW6bYlcoL6HpZKmNW/9BvDRVYmKh76','minh.vu09@gmail.com','User','2025-09-18 00:23:05','2025-09-18 00:23:05',0),(65,'nga.do10','$2a$10$qovTeuPNC.p.ibtk02GcVutbHyq2/qAd5TVf/y3xYa/tNydq2HrbO','nga.do10@gmail.com','User','2025-09-18 00:23:05','2025-09-18 00:23:05',0),(66,'ngọc.tran11','$2a$10$Me1a7r93vJ6.Z6.2mGX70usDI2sCh1smVjSKJt5gkYOFknbQG7rKC','ngọc.tran11@gmail.com','User','2025-09-18 00:23:05','2025-09-18 00:23:05',0),(67,'nhật.le12','$2a$10$U0/zze.FYzXkt89Ix0Cxd.JuqodJOjWaanHmvUhIup39CBTPV7uSG','nhật.le12@gmail.com','User','2025-09-18 00:23:05','2025-09-18 00:23:05',0),(68,'phúc.bui13','$2a$10$uLg1SocB6bnLurFuRKB2oe9e2Op9iJcQSHEj5oje3y6hIb7ywho9m','phúc.bui13@gmail.com','User','2025-09-18 00:23:05','2025-09-18 00:23:05',0),(69,'quang.nguyen14','$2a$10$ix5GwujPbLCODe3z/3uxuO.6q5Ga0e6FzGmUrpD8oAX9ssfPft5IW','quang.nguyen14@gmail.com','User','2025-09-18 00:23:05','2025-09-18 00:23:05',0),(70,'thanh.phan15','$2a$10$sEEScoVTlLC4lUB9U5ca8.3CKZelb6oJR2GIP3zobFt691u2W.5hC','thanh.phan15@gmail.com','User','2025-09-18 00:23:05','2025-09-18 00:23:05',0),(71,'thảo.pham16','$2a$10$ME8vTxGRiYoX7agGuMOth.cAOfdhBC6LJ2.lNe8q/R/Ec8kxc7ppO','thảo.pham16@gmail.com','User','2025-09-18 00:23:05','2025-09-18 00:23:05',0),(72,'trâm.dang17','$2a$10$9sx./AUXkQr5DJI7gwUr5eDpNS38m/Q1g8rK.qkbUy/dGd8Or70gG','trâm.dang17@gmail.com','User','2025-09-18 00:23:05','2025-09-18 00:23:05',0),(73,'trinh.do18','$2a$10$rBWS/lSFOb/ADgdw17IJVun7U4Y4/tP9jybGUGDtp0GpgEK7JjIJa','trinh.do18@gmail.com','User','2025-09-18 00:23:06','2025-09-18 00:23:06',0),(74,'việt.vu19','$2a$10$MI4TZDOcFbpVf491mv5LJeV2dU/qShAU/E4qOlriv/a8a/9lAuQmW','việt.vu19@gmail.com','User','2025-09-18 00:23:06','2025-09-18 00:23:06',0),(75,'yến.le20','$2a$10$sSNQBeyZJJaB/Dr9k0MZ4.5INColSBn5pn7xh7u6WxQ9VYVMZB0Fm','yến.le20@gmail.com','User','2025-09-18 00:23:06','2025-09-18 00:23:06',0),(76,'testath jkh','$2a$10$56m0.U0gFqFY29O4rSKQme8HhxUHyNwL.JMQKjJ1NhSgDlid3C4v6','adfsaet@gmail.com.com','USER','2025-09-18 00:34:00','2025-09-18 00:34:00',0),(77,'user01','$2a$10$QUh/tEuEGK1H/OE4fVCyJuebQtit5Hp3RHq2RM3kxSgYducJiPKsC','user01@example.com','USER','2025-09-18 00:34:16','2025-09-18 00:34:16',0),(78,'user02','$2a$10$vx9fh0Q4r/3bSg71jGziD.ghCca8U6ZvYGBnJfXTBDzL1.Mk7NaMW','user02@example.com','USER','2025-09-18 00:34:16','2025-09-18 00:34:16',0),(79,'user03','$2a$10$XikZC67eOikTpqWDvwF.RespzSTi1LLxJHcS3T2QTsI8kbBOmZ8KC','user03@example.com','USER','2025-09-18 00:34:16','2025-09-18 00:34:16',0),(80,'user04','$2a$10$Qvlu2DHhQLWNyV1GsuRq7OT1fu.nSrAsXby3yBscaZK2E20rYm/Yq','user04@example.com','USER','2025-09-18 00:34:16','2025-09-18 00:34:16',0),(81,'user05','$2a$10$REtewHWGJF/dxD9tJyBBT.xd18HhzvSXJj5rgFcbdDSJxOKHz8xYK','user05@example.com','USER','2025-09-18 00:34:16','2025-09-18 00:34:16',0),(82,'user06','$2a$10$8PWeBlriUjwMwL/ZRsmzJ.s2YUmDejvckvH7JVmrMFxk0x1S6hBei','user06@example.com','USER','2025-09-18 00:34:16','2025-09-18 00:34:16',0),(83,'user07','$2a$10$Wt9xU0ZPI281ewOOELMTQOnK7sGPZydoexXXFZMTphZbwYYASQl2u','user07@example.com','USER','2025-09-18 00:34:16','2025-09-18 00:34:16',0),(84,'user08','$2a$10$s7tikUS/JOQoFcPAi6ZAi.OR2iXgHYMszYUnMabsCYfNBtv5FjFvi','user08@example.com','USER','2025-09-18 00:34:16','2025-09-18 00:34:16',0),(85,'user09','$2a$10$fpIo.G0vgYVd83bEVWo25eiTsfzOau8uQkLf8xppoSSE.AvN1VLSW','user09@example.com','USER','2025-09-18 00:34:16','2025-09-18 00:34:16',0),(86,'user10','$2a$10$B.xvlSrWmh0C7YOZhNoqEOJslN8KDl4eLUVGV.gSVG/1cx75rB5fe','user10@example.com','USER','2025-09-18 00:34:16','2025-09-18 00:34:16',0),(87,'user11','$2a$10$0NS1GthHuB23z91CMJbEte8OGCRbBiBPuyMDXkBnZmxYKtXm8T66S','user11@example.com','USER','2025-09-18 00:34:16','2025-09-18 00:34:16',0),(88,'user12','$2a$10$AJQxVQcW4N/3uSXlcynbWuc7r402uYtVXbbB8mDWmz8TF1vQhiYzu','user12@example.com','USER','2025-09-18 00:34:16','2025-09-18 00:34:16',0),(89,'user13','$2a$10$NwI7oT9Q3cds1iNBtX1XKuzZjg7e7fbBGoBDqOt0W4rWz8CNUxBsy','user13@example.com','USER','2025-09-18 00:34:17','2025-09-18 00:34:17',0),(90,'user14','$2a$10$c57lYPCTZ6CpEgQXWvlUJ.B0TzyN.PPdTXkw/a8lCKNZTmyFZTbnK','user14@example.com','USER','2025-09-18 00:34:17','2025-09-18 00:34:17',0),(91,'user15','$2a$10$ymbJb.IRUKQAaUdD2gKc2up9rYnLF/eolfpunHXcJ0uv7QZZaWbJG','user15@example.com','USER','2025-09-18 00:34:17','2025-09-18 00:34:17',0),(92,'user16','$2a$10$gt/XVnG2q1.EPA1rDVBbCu.fgMFWa2WoP9nAssetLzknT6bT2wK5u','user16@example.com','USER','2025-09-18 00:34:17','2025-09-18 00:34:17',0),(93,'user17','$2a$10$URgCDZ7finCrc5/7V.2Hbu.USKD8u./sqda58bpjoqvPsFUdWIrey','user17@example.com','USER','2025-09-18 00:34:17','2025-09-18 00:34:17',0),(94,'user18','$2a$10$1FKYpVI1y7.VK9byJ79hWea2ci/P1QZo.f5h5MttZqMLeU.kAKcVi','user18@example.com','USER','2025-09-18 00:34:17','2025-09-18 00:34:17',0),(95,'user19','$2a$10$T7VSMYQP8HTosFUgYY055eGYkRXmDZGUzUO9NBzipzKK/ZpHlyyvi','user19@example.com','USER','2025-09-18 00:34:17','2025-09-18 00:34:17',0),(96,'user20','$2a$10$57zozSsS8xfns7b6LgCGW.XMzBb.KkpRKKursLuSXtMVsr6RmHKBe','user20@example.com','USER','2025-09-18 00:34:17','2025-09-18 00:34:17',0),(97,'sdfgasgasghasd','$2a$10$CS1TKFuVuW8kdpol5WTTwuUYCdV3ZXrlEehKIQEe1U2zi8fgduKV.','jghiasfjghliu2!@gmail.com','USER','2025-09-18 00:51:42','2025-09-18 00:51:42',0),(98,'đâsfadsfasdf','$2a$10$g5sutFeSWlBtTLeedA7lROoE8rqB49ymGItT.hIpEas1END2rdQiS','tytytyytytowqo@gmail.com','USER','2025-09-19 01:47:49','2025-09-19 01:47:49',0),(99,'anh_le','$2a$10$F2uDt.wXbBvPgpoz33ZJJuAIvSPtyNQ6MZD1USPoLbAMFCgUsM7iq','anh.le1@mailinator.com','USER','2025-09-19 01:49:38','2025-09-19 01:49:38',0),(100,'bao_nguyen','$2a$10$bE2FU88cjIMi7odewF5GiuXQeq2OlD748V2KQpEjFpIyANVdPaonG','bao.nguyen2@mailinator.com','USER','2025-09-19 01:49:38','2025-09-19 01:49:38',0),(101,'cuong_tran','$2a$10$3fWQIzvKVoFxAbcTYYuLg.keguOPtQxR3flH6Dia6Vf7vJFG1Yt.K','cuong.tran3@mailinator.com','USER','2025-09-19 01:49:38','2025-09-19 01:49:38',0),(102,'dung_pham','$2a$10$Q44fhe3zApM4MNJrJvjZyuasQky8n5ST.EmZHcr86VjV7I3P0OCW.','dung.pham4@mailinator.com','USER','2025-09-19 01:49:38','2025-09-19 01:49:38',0),(103,'huyen_vo','$2a$10$95sMSqrJUj3ETckwf9AU2uf/TxYEkvjgKFyOMVNSt/HgO5C5Ash9i','huyen.vo5@mailinator.com','USER','2025-09-19 01:49:38','2025-09-19 01:49:38',0),(104,'khanh_do','$2a$10$U1yGhrimDY1khVytF3Eeb.8TPSOg0TWQ5WFrNW8oLPxJ.99RFvI9O','khanh.do6@mailinator.com','USER','2025-09-19 01:49:38','2025-09-19 01:49:38',0),(105,'linh_ng','$2a$10$FaQh1RcJRgfjMM5BugFNs.mqNOyCLqpWefUiYTKAV1P8gp0ZO8qB2','linh.ng7@mailinator.com','USER','2025-09-19 01:49:38','2025-09-19 01:49:38',0),(106,'minh_phan','$2a$10$BHf5OpETKf78KO9pnG8MJ..Cr9ApSPWkVndpAaey1LS3xiRrVQVVW','minh.phan8@mailinator.com','USER','2025-09-19 01:49:38','2025-09-19 01:49:38',0),(107,'nga_trieu','$2a$10$09AZIlJIuRHeuufEj6icJe4YfiOiyqO1Lx3w1LaFDqVbvbL8tIFH2','nga.trieu9@mailinator.com','USER','2025-09-19 01:49:38','2025-09-19 01:49:38',0),(108,'oan_mai','$2a$10$/MJYJ/AW5snE2sEqK2Y7yeDiwm/IYUuFQyEN6jRXv/0J6zChqW8DS','oan.mai10@mailinator.com','USER','2025-09-19 01:49:39','2025-09-19 01:49:39',0),(109,'phuc_bui','$2a$10$YjQruISNImbQDfvAWS0oN.Nr1tv5CPPJJWCAm7dw9ty9Xk.V30F/6','phuc.bui11@mailinator.com','USER','2025-09-19 01:49:39','2025-09-19 01:49:39',0),(110,'quang_huynh','$2a$10$X3U2xEdFyX/uGkI.bQwR3.lTz9f7zv/PnM9SQrSDHl9DEpuiR.o0q','quang.huynh12@mailinator.com','USER','2025-09-19 01:49:39','2025-09-19 01:49:39',0),(111,'rong_ngo','$2a$10$YRYEAIaPTnJfF7fBMU3Tje.4gJQDf454ITIH1h/EEr8NFoXxzYayu','rong.ngo13@mailinator.com','USER','2025-09-19 01:49:39','2025-09-19 01:49:39',0),(112,'son_ha','$2a$10$U.CIqjhmg8ndaBDktwEII.LqMiNpcN/NzUZGPiAODateZ97jZlEt.','son.ha14@mailinator.com','USER','2025-09-19 01:49:39','2025-09-19 01:49:39',0),(113,'thao_tran','$2a$10$UDD7F9OIkKyxCfWv0MkrrOYiB3k3TtQmv/de9ISmiocdEt.Hdy68m','thao.tran15@mailinator.com','USER','2025-09-19 01:49:39','2025-09-19 01:49:39',0),(114,'uyet_ly','$2a$10$/vzjyZkFcxhX6eN3c3K82OA9XShosi3tmfuMDwajNG8J.Cb2A1M/q','uyet.ly16@mailinator.com','USER','2025-09-19 01:49:39','2025-09-19 01:49:39',0),(115,'viet_nguyen','$2a$10$ndbxdzNHeuqTkJvhH1Z3zOHQl4YkvrGWVtUjdEqg48gEzKMrODnpa','viet.nguyen17@mailinator.com','USER','2025-09-19 01:49:39','2025-09-19 01:49:39',0),(116,'xuan_hoang','$2a$10$fO7vTPJttVcvRZY9Mhjxr.jSnCNsXTb59Gafw8DQoqULyPFyBSmK2','xuan.hoang18@mailinator.com','USER','2025-09-19 01:49:39','2025-09-19 01:49:39',0),(117,'yen_ho','$2a$10$nfcan8eXYS2NTg/IA0wocen6bK74yuMxd3DUEWGGw5dLomoHu4N/W','yen.ho19@mailinator.com','USER','2025-09-19 01:49:39','2025-09-19 01:49:39',0),(118,'zminh','$2a$10$gcsKA3fl9FjkGnjzJfaiUeNm9kVofNS1BZPHWsCNL23nBHeEQaV3K','zminh20@mailinator.com','USER','2025-09-19 01:49:39','2025-09-19 01:49:39',1),(119,'test update update ','$2a$10$PwfRJzQWjPr3SbDaWVGc5.woF.cP1MCLjAshr6g7W8keA/383U2/u','tututuutpoqwppwpw@gaill.com','USER','2025-09-20 06:24:44','2025-09-20 06:25:26',0);
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `account_id` int DEFAULT NULL,
  `fullname` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `account_id` (`account_id`),
  CONSTRAINT `admins_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (1,1,'Nguyễn Văn Admin','Hà Nội, Việt Nam','/uploads/c35f092c-8039-4b0f-af7d-d815cea01324.png'),(2,29,'admin BBBB','Ha Loi VN','/uploads/6759873c-64f0-4e47-9734-3028878c0fe3.png');
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cate_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Electronics'),(2,'Books'),(3,'Fashion'),(4,'Sports'),(5,'Education'),(6,'test'),(7,'test2'),(8,'test3');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `prod_id` int DEFAULT NULL,
  `star` int NOT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `prod_id` (`prod_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`prod_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,1,1,5,'Điện thoại dùng rất mượt, pin trâu','2025-08-25 07:50:52',NULL),(2,2,3,4,'Sách hay, giao hàng nhanh','2025-08-25 07:50:52',NULL),(3,3,7,5,'Giày đẹp, vừa chân, chất lượng tốt','2025-08-25 07:50:52',NULL);
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int DEFAULT NULL,
  `prod_id` int DEFAULT NULL,
  `item_quantity` int NOT NULL,
  `item_price` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `prod_id` (`prod_id`),
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`prod_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (1,1,1,1,30000000),(2,1,3,1,90000),(4,3,7,1,2500000),(17,5,1,2,30000000),(18,5,6,3,400000),(19,4,1,2,30000000),(20,4,3,4,90000),(21,2,7,3,2500000),(22,2,8,2,1200000),(23,7,2,2,28000000),(24,7,3,1,90000),(25,8,1,1,30000000),(26,8,9,3,2000000),(31,10,10,2,150000),(32,10,9,1,2000000);
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `total_cost` int NOT NULL DEFAULT '0',
  `address` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `note` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,1,30900000,'TP. Hồ Chí Minh','0901234567','Giao giờ hành chính','2025-08-25 07:50:52',NULL,0),(2,2,9900000,'Đà Nẵng','0912345678','Gói quà giúp mình','2025-08-25 07:50:52','2025-10-04 05:36:21',0),(3,3,2500000,'Hải Phòng','0923456789',NULL,'2025-08-25 07:50:52',NULL,0),(4,3,60360000,'Thanh Hóa','0999999999','Đơn hàng bổ sung vip heheh ','2025-09-24 12:16:34','2025-10-04 01:42:55',0),(5,4,61200000,'Hồ Chí Minh','078523985','Đơn hàng bổ sung siêu vip pro 222222','2025-09-24 13:07:13','2025-10-04 01:35:21',0),(6,7,390000,'Đà Nẵng','21516171','Đơn hàng bổ sung siêu vip pro','2025-09-25 00:01:09','2025-09-25 00:02:03',1),(7,7,56090000,'Hà Nội','0372647821','Đơn hàng bổ sung','2025-10-04 07:10:18','2025-10-04 07:10:18',0),(8,16,36000000,'Bình Dương, Việt Nam','0918171371','sieu cap vip pro don hang hehehe','2025-10-04 07:12:24','2025-10-04 07:12:24',0),(9,24,4150000,'Đà Nẵng, Việt Nam','087464272','don hang to hehehehehhe','2025-10-04 07:13:55','2025-10-04 07:13:55',1),(10,19,2300000,'Bình Thuận, Việt Nam','0128726723','dat them hang hehehehehe','2025-10-04 07:17:13','2025-10-04 07:17:36',0),(11,6,630000,'fadfafaf','1254145151','hfffffffffffffffffffffffff','2025-10-07 00:34:50','2025-10-07 00:35:00',1);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `method` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'QR CODE',
  `status` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PENDING',
  `transaction_id` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `paid_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES (1,1,'QR CODE','SUCCESS','TXN123456','2025-08-25 07:50:52'),(2,2,'QR CODE','PENDING',NULL,NULL),(3,3,'QR CODE','FAILED','TXN789123','2025-08-25 07:50:52');
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_images`
--

DROP TABLE IF EXISTS `product_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `prod_id` int NOT NULL,
  `image_path` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `prod_id` (`prod_id`),
  CONSTRAINT `product_images_ibfk_1` FOREIGN KEY (`prod_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_images`
--

LOCK TABLES `product_images` WRITE;
/*!40000 ALTER TABLE `product_images` DISABLE KEYS */;
INSERT INTO `product_images` VALUES (1,11,'test1'),(2,11,'test2'),(3,12,'test1'),(4,12,'test2');
/*!40000 ALTER TABLE `product_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `seller_id` int DEFAULT NULL,
  `cate_id` int DEFAULT NULL,
  `title` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_info` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` int NOT NULL,
  `stock` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `seller_id` (`seller_id`),
  KEY `cate_id` (`cate_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`seller_id`) REFERENCES `sellers` (`id`),
  CONSTRAINT `products_ibfk_2` FOREIGN KEY (`cate_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,1,1,'iPhone 15 Pro Max','Điện thoại Apple chính hãng',30000000,5,'2025-08-25 07:50:52','2025-09-20 00:14:51',0),(2,1,1,'Samsung Galaxy S24 Ultra','Điện thoại Samsung cao cấp',28000000,13,'2025-08-25 07:50:52','2025-09-20 00:14:51',0),(3,2,2,'Đắc Nhân Tâm','Sách kỹ năng sống nổi tiếng',90000,94,'2025-08-25 07:50:52','2025-09-20 00:14:51',0),(4,2,2,'Harry Potter và Hòn Đá Phù Thủy','Tiểu thuyết fantasy',150000,50,'2025-08-25 07:50:52','2025-09-20 00:14:51',0),(5,3,3,'Áo sơ mi nam trắng','Thời trang công sở nam',250000,30,'2025-08-25 07:50:52','2025-09-20 00:14:51',0),(6,3,3,'Váy hoa mùa hè','Thời trang nữ',400000,17,'2025-08-25 07:50:52','2025-09-20 00:14:51',0),(7,4,4,'Giày đá bóng Nike Mercurial','Giày thể thao chính hãng',2500000,9,'2025-08-25 07:50:52','2025-09-20 00:14:51',0),(8,4,4,'Bóng rổ Spalding','Bóng rổ tiêu chuẩn NBA',1200000,23,'2025-08-25 07:50:52','2025-09-20 00:14:51',0),(9,5,5,'Khóa học Lập trình Java','Khóa học online cho sinh viên IT',2000000,196,'2025-08-25 07:50:52','2025-09-20 00:14:51',0),(10,5,5,'Giáo trình Tiếng Anh Cơ Bản','Tài liệu học ngoại ngữ',150000,68,'2025-08-25 07:50:52','2025-09-20 00:14:51',0),(11,6,6,'test','test',1000000,10000000,'2025-10-06 06:55:27','2025-10-06 06:55:27',0),(12,7,7,'test2','test2',1000000,10000000,'2025-10-06 07:02:08','2025-10-06 07:02:08',0),(13,8,8,'test5','testkkk',1000000,10000000,'2025-10-07 07:20:42','2025-10-07 07:20:42',0);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sellers`
--

DROP TABLE IF EXISTS `sellers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sellers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `seller_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `seller_info` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sellers`
--

LOCK TABLES `sellers` WRITE;
/*!40000 ALTER TABLE `sellers` DISABLE KEYS */;
INSERT INTO `sellers` VALUES (1,'Công ty TNHH Điện Máy Xanh','Chuyên đồ điện tử'),(2,'Nhà sách Fahasa','Cung cấp sách Việt và quốc tế'),(3,'Shop Thời Trang ABC','Quần áo, giày dép'),(4,'Thể Thao XYZ','Dụng cụ và quần áo thể thao'),(5,'Trung tâm Giáo dục Online','Khóa học và tài liệu học tập'),(6,'test','Auto-created seller'),(7,'test2','Auto-created seller'),(8,'test3','Auto-created seller');
/*!40000 ALTER TABLE `sellers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `account_id` int DEFAULT NULL,
  `fullname` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `account_id` (`account_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,2,'Trần Văn An','TP. Đà Nẵng, Việt Nam','/uploads/f403ff2d-c7e5-4ed7-be12-26f86d85c2fb.png'),(2,3,'Lê Thị Banh','Thanh Hóa, Việt Nam','/uploads/ee19caaa-ce80-432d-8240-1c94c308aa74.png'),(3,4,'3 la toi','Thanh Hóa, Việt Nam','/uploads/76f1ac26-de6e-4362-a812-2575744dc3f6.png'),(4,7,'john nneeeeee','HOa Thanh Que','/uploads/1d44a9b5-6d60-4338-856c-dcfbb1aebbc3.png'),(6,9,'toi la bcrypt',NULL,NULL),(7,10,'Lê Thị C','Đà Nẵng, Việt Nam',NULL),(15,18,'Huỳnh Mai K','Nghệ An, Việt Nam',NULL),(16,19,'Quang Huy L','Bình Dương, Việt Nam',NULL),(17,20,'Thanh Hoa M','Hải Dương, Việt Nam',NULL),(18,21,'Nguyễn Khánh N','Long An, Việt Nam',NULL),(19,22,'Phạm Linh O','Bình Thuận, Việt Nam',NULL),(20,23,'Đoàn Trường P','Phú Thọ, Việt Nam',NULL),(21,24,'Trịnh Mai Q','Kiên Giang, Việt Nam',NULL),(22,25,'Quản Trị Viên 2','Hà Nội, Việt Nam',NULL),(23,26,'Shop Điện Tử 1','TP. Hồ Chí Minh, Việt Nam',NULL),(24,27,'Shop Thời Trang 2','Đà Nẵng, Việt Nam',NULL),(25,28,'Lương Anh R','Thanh Hóa, Việt Nam',NULL),(26,52,NULL,NULL,NULL),(27,53,NULL,NULL,NULL),(28,54,NULL,NULL,NULL),(29,55,NULL,NULL,NULL),(30,76,NULL,NULL,NULL),(31,97,NULL,NULL,NULL),(32,98,NULL,NULL,NULL),(33,99,NULL,NULL,NULL),(34,100,NULL,NULL,NULL),(35,101,NULL,NULL,NULL),(36,102,NULL,NULL,NULL),(37,103,NULL,NULL,NULL),(38,104,NULL,NULL,NULL),(39,105,NULL,NULL,NULL),(40,106,NULL,NULL,NULL),(41,107,NULL,NULL,NULL),(42,108,NULL,NULL,NULL),(43,109,NULL,NULL,NULL),(44,110,NULL,NULL,NULL),(45,111,NULL,NULL,NULL),(46,112,NULL,NULL,NULL),(47,113,NULL,NULL,NULL),(48,114,NULL,NULL,NULL),(49,115,NULL,NULL,NULL),(50,116,NULL,NULL,NULL),(51,117,NULL,NULL,NULL),(53,119,'toi la test update','viet namm','/uploads/a41d3591-99a1-4fda-8e14-acca62a90dbe.png');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-07 16:06:31
