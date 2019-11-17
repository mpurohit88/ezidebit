-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 17, 2019 at 06:00 PM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.2.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rentronicnew_auce`
--

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `bankFailedReason` text NOT NULL,
  `bankReceiptID` varchar(50) NOT NULL,
  `bankReturnCode` varchar(5) NOT NULL,
  `customerName` int(100) NOT NULL,
  `debitDate` datetime NOT NULL,
  `eziDebitCustomerID` varchar(10) NOT NULL,
  `invoiceID` varchar(10) NOT NULL,
  `paymentAmount` double NOT NULL,
  `paymentID` varchar(10) NOT NULL,
  `paymentMethod` varchar(3) NOT NULL,
  `paymentReference` varchar(50) NOT NULL,
  `paymentSource` varchar(10) NOT NULL,
  `paymentStatus` varchar(2) NOT NULL,
  `settlementDate` datetime NOT NULL,
  `scheduledAmount` double NOT NULL,
  `transactionFeeClient` double NOT NULL,
  `transactionFeeCustomer` double NOT NULL,
  `transactionTime` time NOT NULL,
  `yourGeneralReference` varchar(50) NOT NULL,
  `yourSystemReference` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
