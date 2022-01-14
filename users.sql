-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 14, 2022 at 08:07 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_usermanagementsystem`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `address` varchar(150) NOT NULL,
  `postCode` varchar(10) NOT NULL,
  `contactNumber` varchar(15) NOT NULL,
  `email` varchar(100) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(80) NOT NULL,
  `accountType` varchar(25) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `address`, `postCode`, `contactNumber`, `email`, `username`, `password`, `accountType`, `createdAt`, `updatedAt`) VALUES
(1, 'John', 'Doe', '123 Test City', '1234', '09991234567', 'john.doe@example.com', 'johndoe123', 'password123', 'admin', '2022-01-13 22:11:19', '2022-01-13 22:11:19'),
(2, 'Jane', 'Doe', '456 Test City', '4567', '09991234567', 'jane.doe@example.com', 'janedoe456', 'password456', 'user', '2022-01-13 23:02:24', '2022-01-13 23:02:24'),
(4, 'Samuel', 'Serif', '123 Test City', '1234', '12345678910', 'samuel.serif@example.com', 'samuelserif123', 'password123', 'user', '2022-01-14 00:55:58', '2022-01-14 00:55:58'),
(5, 'Joss', 'Sticks', '123 Test City', '1234', '12345678910', 'joss.sticks@example.come', 'joss.sticks123', 'password123', 'user', '2022-01-14 01:01:31', '2022-01-14 01:01:31'),
(6, 'asjdygasjy', 'askjdhaskhdsa', 'asiuhdsa', '83246823', '3294872398', 'test@example.com', 'test123', 'password123', 'user', '2022-01-14 06:46:11', '2022-01-14 06:46:11');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
