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
  `username` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES (1,'admin','$2a$10$uXlsWabNySi/ZJZN.OcxYeicZhc3RBY4aN7o.2e.ZNcMn4sJvps0.','admin@gmail.com','ADMIN','2025-10-31 18:00:00',NULL,0),(2,'user1','$2a$10$uXlsWabNySi/ZJZN.OcxYeicZhc3RBY4aN7o.2e.ZNcMn4sJvps0.','user1@example.com','USER','2025-11-01 19:15:00',NULL,0),(3,'user2','$2a$10$uXlsWabNySi/ZJZN.OcxYeicZhc3RBY4aN7o.2e.ZNcMn4sJvps0.','user2@example.com','USER','2025-11-02 20:30:00',NULL,0),(4,'user3','$2a$10$uXlsWabNySi/ZJZN.OcxYeicZhc3RBY4aN7o.2e.ZNcMn4sJvps0.','user3@example.com','USER','2025-11-03 21:45:00',NULL,0),(5,'user4','$2a$10$uXlsWabNySi/ZJZN.OcxYeicZhc3RBY4aN7o.2e.ZNcMn4sJvps0.','user4@example.com','USER','2025-11-04 22:00:00',NULL,0),(6,'user5','$2a$10$uXlsWabNySi/ZJZN.OcxYeicZhc3RBY4aN7o.2e.ZNcMn4sJvps0.','user5@example.com','USER','2025-11-05 23:20:00',NULL,0),(7,'user6','$2a$10$uXlsWabNySi/ZJZN.OcxYeicZhc3RBY4aN7o.2e.ZNcMn4sJvps0.','user6@example.com','USER','2025-11-07 00:35:00',NULL,0),(8,'user7','$2a$10$uXlsWabNySi/ZJZN.OcxYeicZhc3RBY4aN7o.2e.ZNcMn4sJvps0.','user7@example.com','USER','2025-11-08 01:50:00',NULL,0),(9,'user8','$2a$10$uXlsWabNySi/ZJZN.OcxYeicZhc3RBY4aN7o.2e.ZNcMn4sJvps0.','user8@example.com','USER','2025-11-09 02:05:00',NULL,0),(10,'user9','$2a$10$uXlsWabNySi/ZJZN.OcxYeicZhc3RBY4aN7o.2e.ZNcMn4sJvps0.','user9@example.com','USER','2025-11-10 03:25:00',NULL,0),(11,'user10','$2a$10$uXlsWabNySi/ZJZN.OcxYeicZhc3RBY4aN7o.2e.ZNcMn4sJvps0.','user10@example.com','USER','2025-10-15 04:40:00',NULL,0),(12,'user11','$2a$10$uXlsWabNySi/ZJZN.OcxYeicZhc3RBY4aN7o.2e.ZNcMn4sJvps0.','user11@example.com','USER','2025-09-20 05:55:00',NULL,0),(13,'user12','$2a$10$uXlsWabNySi/ZJZN.OcxYeicZhc3RBY4aN7o.2e.ZNcMn4sJvps0.','user12@example.com','USER','2025-08-25 06:10:00',NULL,0),(14,'user13','$2a$10$uXlsWabNySi/ZJZN.OcxYeicZhc3RBY4aN7o.2e.ZNcMn4sJvps0.','user13@example.com','USER','2025-07-30 07:30:00',NULL,0),(15,'user14','$2a$10$uXlsWabNySi/ZJZN.OcxYeicZhc3RBY4aN7o.2e.ZNcMn4sJvps0.','user14@example.com','USER','2025-06-10 08:45:00',NULL,0);
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
  `fullname` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `account_id` (`account_id`),
  CONSTRAINT `admins_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (1,1,'Admin System','Hà Nội, Việt Nam',NULL);
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `line_total` decimal(38,2) DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `unit_price` decimal(38,2) DEFAULT NULL,
  `cart_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKpcttvuq4mxppo8sxggjtn5i2c` (`cart_id`),
  CONSTRAINT `FKpcttvuq4mxppo8sxggjtn5i2c` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_items`
--

LOCK TABLES `cart_items` WRITE;
/*!40000 ALTER TABLE `cart_items` DISABLE KEYS */;
INSERT INTO `cart_items` VALUES (1,35000000.00,1,1,35000000.00,1),(2,28000000.00,2,1,28000000.00,2),(3,65000000.00,3,1,65000000.00,3),(4,22000000.00,4,1,22000000.00,4),(5,18000000.00,5,1,18000000.00,5),(6,45000000.00,6,1,45000000.00,6),(7,28000000.00,7,1,28000000.00,7),(8,6500000.00,8,1,6500000.00,8),(9,3500000.00,9,1,3500000.00,9),(10,12000000.00,10,1,12000000.00,10),(11,42000000.00,11,1,42000000.00,11),(12,25000000.00,12,1,25000000.00,12),(13,15000000.00,13,1,15000000.00,13),(14,12000000.00,14,1,12000000.00,14),(15,11000000.00,15,1,11000000.00,15);
/*!40000 ALTER TABLE `cart_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `grand_total` decimal(38,2) DEFAULT NULL,
  `subtotal` decimal(38,2) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
INSERT INTO `carts` VALUES (1,35000000.00,35000000.00,1),(2,28000000.00,28000000.00,2),(3,65000000.00,65000000.00,3),(4,22000000.00,22000000.00,4),(5,18000000.00,18000000.00,5),(6,45000000.00,45000000.00,6),(7,28000000.00,28000000.00,7),(8,6500000.00,6500000.00,8),(9,3500000.00,3500000.00,9),(10,12000000.00,12000000.00,10),(11,42000000.00,42000000.00,11),(12,25000000.00,25000000.00,12),(13,15000000.00,15000000.00,13),(14,12000000.00,12000000.00,14),(15,11000000.00,11000000.00,15);
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cate_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Điện Thoại'),(2,'Laptop'),(3,'Tablet'),(4,'Tai Nghe'),(5,'Loa'),(6,'Đồng Hồ'),(7,'Máy Ảnh'),(8,'TV'),(9,'Tủ Lạnh'),(10,'Máy Giặt'),(11,'Điều Hòa'),(12,'Máy Tính Bảng'),(13,'Phụ Kiện'),(14,'Thời Trang'),(15,'Sách');
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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,1,1,5,'Sản phẩm tuyệt vời, giao hàng nhanh','2025-11-01 03:00:00',NULL),(2,2,1,4,'Sản phẩm tốt, đóng gói cẩn thận','2025-11-02 04:00:00',NULL),(3,3,2,5,'Điện thoại đẹp, chụp ảnh siêu nét','2025-11-03 05:00:00',NULL),(4,4,3,5,'Laptop mượt, thiết kế sang trọng','2025-11-04 06:00:00',NULL),(5,5,4,4,'Pin trâu, hiệu năng mạnh mẽ','2025-11-05 07:00:00',NULL),(6,6,5,5,'Thiết kế đẹp, giá cả hợp lý','2025-11-06 08:00:00',NULL),(7,7,6,4,'Màn hình đẹp, cấu hình khủng','2025-11-07 09:00:00',NULL),(8,8,7,5,'Tablet nhẹ, pin lâu','2025-11-08 10:00:00',NULL),(9,9,8,5,'Tai nghe âm thanh sống động','2025-11-09 11:00:00',NULL),(10,10,9,4,'Loa âm thanh hay, thiết kế đẹp','2025-11-10 12:00:00',NULL),(11,11,10,5,'Đồng hồ nhiều tính năng hữu ích','2025-11-11 13:00:00',NULL),(12,12,11,5,'Máy ảnh chuyên nghiệp, ống kính sắc nét','2025-11-12 14:00:00',NULL),(13,13,12,4,'TV màu sắc chân thực, âm thanh hay','2025-11-13 15:00:00',NULL),(14,14,13,5,'Tủ lạnh tiết kiệm điện, nhiều ngăn','2025-11-14 16:00:00',NULL),(15,15,14,4,'Máy giặt êm, giặt sạch','2025-11-15 01:00:00',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (1,1,1,1,35000000),(2,2,2,1,28000000),(3,3,3,1,65000000),(4,4,4,1,22000000),(5,5,5,1,18000000),(6,6,6,1,45000000),(7,7,7,1,28000000),(8,8,8,1,6500000),(9,9,9,1,3500000),(10,10,10,1,12000000),(11,11,11,1,42000000),(12,12,12,1,25000000),(13,13,13,1,15000000),(14,14,14,1,12000000),(15,15,15,1,11000000);
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
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `note` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,1,35000000,'Hà Nội, Việt Nam','0912345678','Giao giờ hành chính','2025-11-25 03:00:00',NULL,0),(2,2,28000000,'TP HCM, Việt Nam','0912345679','Gọi điện trước khi giao','2025-11-25 04:00:00',NULL,0),(3,3,65000000,'Đà Nẵng, Việt Nam','0912345680','Giao cuối tuần','2025-11-26 05:00:00',NULL,0),(4,4,22000000,'Hải Phòng, Việt Nam','0912345681','Không có ghi chú','2025-11-27 06:00:00',NULL,0),(5,5,18000000,'Cần Thơ, Việt Nam','0912345682','Giao nhanh','2025-11-28 07:00:00',NULL,0),(6,6,45000000,'Nha Trang, Việt Nam','0912345683','Đóng gói cẩn thận','2025-11-29 08:00:00',NULL,0),(7,7,28000000,'Huế, Việt Nam','0912345684','Kiểm tra kỹ hàng','2025-11-26 09:00:00',NULL,0),(8,8,6500000,'Vũng Tàu, Việt Nam','0912345685','Giao buổi sáng','2025-11-08 10:00:00',NULL,0),(9,9,3500000,'Quy Nhơn, Việt Nam','0912345686','Không ghi chú','2025-11-09 11:00:00',NULL,0),(10,10,12000000,'Hạ Long, Việt Nam','0912345687','Giao hàng tiết kiệm','2025-11-10 12:00:00',NULL,0),(11,11,42000000,'Buôn Ma Thuột, Việt Nam','0912345688','Gọi xác nhận','2025-10-15 03:00:00',NULL,0),(12,12,25000000,'Thanh Hóa, Việt Nam','0912345689','Giao cuối ngày','2025-10-20 04:00:00',NULL,0),(13,13,15000000,'Nghệ An, Việt Nam','0912345690','Không ghi chú','2025-09-25 05:00:00',NULL,0),(14,14,12000000,'Hà Tĩnh, Việt Nam','0912345691','Giao hàng nhanh','2025-09-30 06:00:00',NULL,0),(15,15,11000000,'Hà Nội, Việt Nam','0912345692','Giao giờ hành chính','2025-08-15 07:00:00',NULL,0);
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
  `method` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `transaction_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `paid_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES (1,1,'BANK','PAID','TXN001','2025-11-01 03:30:00'),(2,2,'COD','PENDING',NULL,NULL),(3,3,'BANK','PAID','TXN002','2025-11-03 05:30:00'),(4,4,'COD','PENDING',NULL,NULL),(5,5,'BANK','PAID','TXN003','2025-11-05 07:30:00'),(6,6,'COD','PENDING',NULL,NULL),(7,7,'BANK','PAID','TXN004','2025-11-07 09:30:00'),(8,8,'COD','PENDING',NULL,NULL),(9,9,'BANK','PAID','TXN005','2025-11-09 11:30:00'),(10,10,'COD','PENDING',NULL,NULL),(11,11,'BANK','PAID','TXN006','2025-10-15 03:30:00'),(12,12,'COD','PENDING',NULL,NULL),(13,13,'BANK','PAID','TXN007','2025-09-25 05:30:00'),(14,14,'COD','PENDING',NULL,NULL),(15,15,'BANK','PAID','TXN008','2025-08-15 07:30:00');
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
  `image_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `prod_id` (`prod_id`),
  CONSTRAINT `product_images_ibfk_1` FOREIGN KEY (`prod_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_images`
--

LOCK TABLES `product_images` WRITE;
/*!40000 ALTER TABLE `product_images` DISABLE KEYS */;
INSERT INTO `product_images` VALUES (1,1,'/images/products/iphone15-1.jpg'),(2,1,'/images/products/iphone15-2.jpg'),(3,2,'/images/products/samsung-s24-1.jpg'),(4,2,'/images/products/samsung-s24-2.jpg'),(5,3,'/images/products/macbook-pro-1.jpg'),(6,3,'/images/products/macbook-pro-2.jpg'),(7,4,'/images/products/xiaomi-14-1.jpg'),(8,4,'/images/products/xiaomi-14-2.jpg'),(9,5,'/images/products/oppo-findx7-1.jpg'),(10,5,'/images/products/oppo-findx7-2.jpg'),(11,6,'/images/products/dell-xps-1.jpg'),(12,6,'/images/products/dell-xps-2.jpg'),(13,7,'/images/products/ipad-pro-1.jpg'),(14,7,'/images/products/ipad-pro-2.jpg'),(15,8,'/images/products/airpods-pro-1.jpg'),(16,8,'/images/products/airpods-pro-2.jpg');
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
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `product_info` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,1,1,'iPhone 15 Pro Max 1TB','Điện thoại Apple chính hãng',35000000,5,'2025-11-01 01:00:00','2025-11-01 01:00:00',0),(2,2,1,'Samsung Galaxy S24 Ultra','Điện thoại Samsung cao cấp',28000000,3,'2025-11-02 02:00:00','2025-11-02 02:00:00',0),(3,3,2,'MacBook Pro 16 inch M3','Laptop Apple cao cấp',65000000,2,'2025-11-03 03:00:00','2025-11-03 03:00:00',0),(4,4,1,'Xiaomi 14 Ultra','Điện thoại flagship Xiaomi',22000000,7,'2025-11-04 04:00:00','2025-11-04 04:00:00',0),(5,5,1,'OPPO Find X7','Điện thoại OPPO cao cấp',18000000,4,'2025-11-05 05:00:00','2025-11-05 05:00:00',0),(6,1,2,'Dell XPS 15','Laptop cao cấp Dell',45000000,15,'2025-11-06 06:00:00','2025-11-06 06:00:00',0),(7,2,3,'iPad Pro 13 inch M2','Tablet Apple cao cấp',28000000,20,'2025-11-07 07:00:00','2025-11-07 07:00:00',0),(8,3,4,'AirPods Pro 2','Tai nghe không dây Apple',6500000,25,'2025-11-08 08:00:00','2025-11-08 08:00:00',0),(9,4,5,'Loa JBL Charge 5','Loa bluetooth chống nước',3500000,30,'2025-11-09 09:00:00','2025-11-09 09:00:00',0),(10,5,6,'Apple Watch Series 9','Đồng hồ thông minh Apple',12000000,18,'2025-11-10 10:00:00','2025-11-10 10:00:00',0),(11,6,7,'Sony A7IV','Máy ảnh full-frame',42000000,8,'2025-11-11 11:00:00','2025-11-11 11:00:00',0),(12,7,8,'Samsung QLED 4K 65 inch','Smart TV cao cấp',25000000,12,'2025-11-12 12:00:00','2025-11-12 12:00:00',0),(13,8,9,'Toshiba Inverter 550 lít','Tủ lạnh thông minh',15000000,9,'2025-11-13 13:00:00','2025-11-13 13:00:00',0),(14,9,10,'LG Inverter 10 kg','Máy giặt cửa trước',12000000,11,'2025-11-14 14:00:00','2025-11-14 14:00:00',0),(15,10,11,'Daikin Inverter 12000 BTU','Điều hòa 2 chiều',11000000,6,'2025-11-15 15:00:00','2025-11-15 15:00:00',0);
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
  `seller_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `seller_info` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sellers`
--

LOCK TABLES `sellers` WRITE;
/*!40000 ALTER TABLE `sellers` DISABLE KEYS */;
INSERT INTO `sellers` VALUES (1,'Điện Máy Xanh','Chuyên cung cấp thiết bị điện tử, điện lạnh'),(2,'Thế Giới Di Động','Chuyên điện thoại, laptop, tablet'),(3,'FPT Shop','Chuyên Apple, điện thoại, laptop'),(4,'CellphoneS','Chuyên điện thoại, phụ kiện chính hãng'),(5,'Hoàng Hà Mobile','Chuyên điện thoại di động'),(6,'Nhà Sách Phương Nam','Chuyên sách, văn phòng phẩm'),(7,'Tiki Trading','Sàn thương mại điện tử đa ngành'),(8,'Lazada Vietnam','Sàn thương mại điện tử'),(9,'Shopee Vietnam','Sàn mua sắm trực tuyến'),(10,'Sendo','Sàn thương mại điện tử'),(11,'Adayroi','Sàn thương mại điện tử'),(12,'Bách Hóa Xanh','Chuyên thực phẩm, hàng tiêu dùng'),(13,'Điện Máy Chợ Lớn','Chuyên đồ gia dụng, điện máy'),(14,'Meta Sport','Chuyên dụng cụ thể thao'),(15,'Thể Thao T&T','Chuyên giày dép, quần áo thể thao');
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
  `fullname` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `account_id` (`account_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,2,'Nguyễn Văn An','Hà Nội, Việt Nam',NULL),(2,3,'Trần Thị Bình','TP Hồ Chí Minh, Việt Nam',NULL),(3,4,'Lê Văn Cường','Đà Nẵng, Việt Nam',NULL),(4,5,'Phạm Thị Dung','Hải Phòng, Việt Nam',NULL),(5,6,'Hoàng Văn Đức','Cần Thơ, Việt Nam',NULL),(6,7,'Vũ Thị Hương','Nha Trang, Việt Nam',NULL),(7,8,'Đặng Văn Hải','Huế, Việt Nam',NULL),(8,9,'Bùi Thị Lan','Vũng Tàu, Việt Nam',NULL),(9,10,'Ngô Văn Minh','Quy Nhơn, Việt Nam',NULL),(10,11,'Phan Thị Nga','Hạ Long, Việt Nam',NULL),(11,12,'Trịnh Văn Phong','Buôn Ma Thuột, Việt Nam',NULL),(12,13,'Đỗ Thị Quỳnh','Thanh Hóa, Việt Nam',NULL),(13,14,'Mai Văn Sơn','Nghệ An, Việt Nam',NULL),(14,15,'Lý Thị Tuyết','Hà Tĩnh, Việt Nam',NULL),(15,1,'Admin User','Hà Nội, Việt Nam',NULL);
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

-- Dump completed on 2025-11-27  8:37:19
