-- --------------------------------------------------------
-- 호스트:                          127.0.0.1
-- 서버 버전:                        8.0.39 - MySQL Community Server - GPL
-- 서버 OS:                        Win64
-- HeidiSQL 버전:                  12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- tododb 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `tododb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `tododb`;

-- 테이블 tododb.events 구조 내보내기
CREATE TABLE IF NOT EXISTS `events` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `start` datetime DEFAULT NULL,
  `end` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=128 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 tododb.events:~3 rows (대략적) 내보내기
INSERT INTO `events` (`id`, `title`, `start`, `end`) VALUES
	(125, '출장', '2024-12-03 00:00:00', '2024-12-07 23:59:00'),
	(126, '여행', '2024-12-24 00:00:00', '2024-12-28 23:59:00'),
	(127, '휴가', '2024-12-08 00:00:00', '2024-12-10 23:59:00');

-- 테이블 tododb.todos 구조 내보내기
CREATE TABLE IF NOT EXISTS `todos` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `is_completed` tinyint(1) DEFAULT '0',
  `created_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=158 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 tododb.todos:~3 rows (대략적) 내보내기
INSERT INTO `todos` (`id`, `title`, `is_completed`, `created_at`) VALUES
	(155, '두부 사오기', 0, '2024-12-22 22:27:31.937067'),
	(156, '미용실 갔다오기', 0, '2024-12-22 22:27:35.282125'),
	(157, '인터넷 강의 듣기', 1, '2024-12-22 22:27:54.113126');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
