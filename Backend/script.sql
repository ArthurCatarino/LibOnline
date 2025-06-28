CREATE DATABASE  IF NOT EXISTS `libonline` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `libonline`;
-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: libonline
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
-- Table structure for table `emprestimo`
--

DROP TABLE IF EXISTS `emprestimo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emprestimo` (
  `idEmprestimo` int NOT NULL AUTO_INCREMENT,
  `idUsuario` int NOT NULL,
  `idExemplar` int unsigned NOT NULL,
  `dataEmprestimo` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dataDevolucaoPrevista` datetime NOT NULL,
  `dataDevolucaoReal` datetime DEFAULT NULL,
  `statusEmprestimo` enum('ativo','atrasado','devolvido') DEFAULT 'ativo',
  `idFuncionario` int NOT NULL,
  PRIMARY KEY (`idEmprestimo`),
  KEY `emprestimos_usuarios_FK` (`idUsuario`),
  KEY `emprestimos_exemplares_FK` (`idExemplar`),
  KEY `emprestimos_funcionario_FK` (`idFuncionario`),
  CONSTRAINT `emprestimos_exemplares_FK` FOREIGN KEY (`idExemplar`) REFERENCES `exemplar` (`idExemplar`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `emprestimos_funcionario_FK` FOREIGN KEY (`idFuncionario`) REFERENCES `funcionario` (`idFuncionario`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `emprestimos_usuarios_FK` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emprestimo`
--

LOCK TABLES `emprestimo` WRITE;
/*!40000 ALTER TABLE `emprestimo` DISABLE KEYS */;
INSERT INTO `emprestimo` VALUES (15,2,15,'2025-06-27 23:13:01','2026-05-03 23:17:54','2025-06-27 23:29:05','devolvido',1);
/*!40000 ALTER TABLE `emprestimo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exemplar`
--

DROP TABLE IF EXISTS `exemplar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exemplar` (
  `idExemplar` int unsigned NOT NULL AUTO_INCREMENT,
  `idLivro` int unsigned NOT NULL,
  `numeroRegistro` varchar(10) NOT NULL,
  `tipo` enum('disponivel','emprestado','reservado','danificado') NOT NULL,
  PRIMARY KEY (`idExemplar`),
  UNIQUE KEY `exemplares_unique` (`numeroRegistro`),
  KEY `exemplares_livro_FK` (`idLivro`),
  CONSTRAINT `exemplares_livro_FK` FOREIGN KEY (`idLivro`) REFERENCES `livro` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exemplar`
--

LOCK TABLES `exemplar` WRITE;
/*!40000 ALTER TABLE `exemplar` DISABLE KEYS */;
INSERT INTO `exemplar` VALUES (12,1,'EX123456','disponivel'),(13,2,'EX123457','emprestado'),(14,6,'EX123458','reservado'),(15,10,'EX123459','danificado'),(16,1,'EX123460','disponivel'),(17,2,'EX123461','emprestado'),(18,6,'EX123462','disponivel'),(19,10,'EX123463','emprestado'),(20,1,'EX123464','danificado'),(21,6,'EX123465','reservado');
/*!40000 ALTER TABLE `exemplar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `funcionario`
--

DROP TABLE IF EXISTS `funcionario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `funcionario` (
  `idFuncionario` int NOT NULL AUTO_INCREMENT,
  `idUsuario` int NOT NULL,
  `cargo` enum('BIBLIOTECARIO','ADMIN') NOT NULL,
  `salario` int NOT NULL,
  PRIMARY KEY (`idFuncionario`),
  KEY `funcionario_usuarios_FK` (`idUsuario`),
  CONSTRAINT `funcionario_usuarios_FK` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `funcionario`
--

LOCK TABLES `funcionario` WRITE;
/*!40000 ALTER TABLE `funcionario` DISABLE KEYS */;
INSERT INTO `funcionario` VALUES (1,6,'ADMIN',2500),(2,7,'BIBLIOTECARIO',2000);
/*!40000 ALTER TABLE `funcionario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `livro`
--

DROP TABLE IF EXISTS `livro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `livro` (
  `titulo` varchar(100) NOT NULL,
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `autor` varchar(100) NOT NULL,
  `genero` varchar(100) NOT NULL,
  `editora` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `livro`
--

LOCK TABLES `livro` WRITE;
/*!40000 ALTER TABLE `livro` DISABLE KEYS */;
INSERT INTO `livro` VALUES ('PrimeiroLivro',1,'Arthur','Sem genero','MeuComputador'),('Pinoquio',2,'Geppeto','Fantasia','Livre'),('Culinaria bacana',6,'Chefe chique','Brastemp','Gastronomia'),('Um novo teste',10,'Testador','Testes','Teste Ja');
/*!40000 ALTER TABLE `livro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `idUsuario` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `endereco` varchar(255) DEFAULT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `dataCadastro` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idUsuario`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'Ana Costa','ana.costa@email.com','hash1234abc','Rua das Flores, 123','11991234567','2025-06-27 14:58:00'),(2,'Bruno Lima','bruno.lima@email.com','hash5678def','Av. Paulista, 999','11998765432','2025-06-27 14:58:00'),(3,'Carla Silva','carla.silva@email.com','hashabcd4567','Rua Verde, 456','11999887766','2025-06-27 14:58:00'),(4,'Diego Rocha','diego.rocha@email.com','hashxyze890','Rua Azul, 321','11991112233','2025-06-27 14:58:00'),(5,'Eduarda Souza','eduarda.souza@email.com','hashqwe12345','Rua do Sol, 789','11993334455','2025-06-27 14:58:00'),(6,'Fernanda Ribeiro','fernanda.ribeiro@email.com','hashmno789gh','Rua das Laranjeiras, 456','11990011223','2025-06-27 14:59:28'),(7,'Gustavo Martins','gustavo.martins@email.com','hashzxc456lkj','Av. Central, 852','11995556677','2025-06-27 14:59:28');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'libonline'
--

--
-- Dumping routines for database 'libonline'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-28 11:46:43
