-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 05, 2025 at 08:56 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `technopharms`
--

-- --------------------------------------------------------

--
-- Table structure for table `shopkeepers`
--

CREATE TABLE `shopkeepers` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `shopkeepers`
--

INSERT INTO `shopkeepers` (`id`, `email`, `password`, `created_at`) VALUES
(1, 'shopkeeper1@example.com', 'passhash1', '2025-06-04 20:41:50'),
(2, 'shopkeeper2@example.com', 'passhash2', '2025-06-04 20:41:50'),
(3, 'shopkeeper3@example.com', 'passhash3', '2025-06-04 20:41:50'),
(4, 'shopkeeper4@example.com', 'passhash4', '2025-06-04 20:41:50'),
(5, 'shopkeeper5@example.com', 'passhash5', '2025-06-04 20:41:50'),
(6, 'shopkeeper6@example.com', 'passhash6', '2025-06-04 20:41:50'),
(7, 'shopkeeper7@example.com', 'passhash7', '2025-06-04 20:41:50'),
(8, 'shopkeeper8@example.com', 'passhash8', '2025-06-04 20:41:50'),
(9, 'shopkeeper9@example.com', 'passhash9', '2025-06-04 20:41:50'),
(10, 'shopkeeper10@example.com', 'passhash10', '2025-06-04 20:41:50'),
(11, 'shopkeeper11@example.com', 'passhash11', '2025-06-04 20:41:50'),
(12, 'shopkeeper12@example.com', 'passhash12', '2025-06-04 20:41:50'),
(13, 'shopkeeper13@example.com', 'passhash13', '2025-06-04 20:41:50'),
(14, 'shopkeeper14@example.com', 'passhash14', '2025-06-04 20:41:50'),
(15, 'shopkeeper15@example.com', 'passhash15', '2025-06-04 20:41:50'),
(16, 'shopkeeper16@example.com', 'passhash16', '2025-06-04 20:41:50'),
(17, 'shopkeeper17@example.com', 'passhash17', '2025-06-04 20:41:50'),
(18, 'shopkeeper18@example.com', 'passhash18', '2025-06-04 20:41:50'),
(19, 'shopkeeper19@example.com', 'passhash19', '2025-06-04 20:41:50'),
(20, 'shopkeeper20@example.com', 'passhash20', '2025-06-04 20:41:50'),
(21, 'shopkeeper21@example.com', 'passhash21', '2025-06-04 20:41:50'),
(22, 'shopkeeper22@example.com', 'passhash22', '2025-06-04 20:41:50'),
(23, 'shopkeeper23@example.com', 'passhash23', '2025-06-04 20:41:50'),
(24, 'shopkeeper24@example.com', 'passhash24', '2025-06-04 20:41:50'),
(25, 'shopkeeper25@example.com', 'passhash25', '2025-06-04 20:41:50'),
(26, 'shopkeeper26@example.com', 'passhash26', '2025-06-04 20:41:50'),
(27, 'shopkeeper27@example.com', 'passhash27', '2025-06-04 20:41:50'),
(28, 'shopkeeper28@example.com', 'passhash28', '2025-06-04 20:41:50'),
(29, 'shopkeeper29@example.com', 'passhash29', '2025-06-04 20:41:50'),
(30, 'shopkeeper30@example.com', 'passhash30', '2025-06-04 20:41:50'),
(31, 'shopkeeper31@example.com', 'passhash31', '2025-06-04 20:41:50'),
(32, 'shopkeeper32@example.com', 'passhash32', '2025-06-04 20:41:50'),
(33, 'shopkeeper33@example.com', 'passhash33', '2025-06-04 20:41:50'),
(34, 'shopkeeper34@example.com', 'passhash34', '2025-06-04 20:41:50'),
(35, 'shopkeeper35@example.com', 'passhash35', '2025-06-04 20:41:50'),
(36, 'shopkeeper36@example.com', 'passhash36', '2025-06-04 20:41:50'),
(37, 'shopkeeper37@example.com', 'passhash37', '2025-06-04 20:41:50'),
(38, 'shopkeeper38@example.com', 'passhash38', '2025-06-04 20:41:50'),
(39, 'shopkeeper39@example.com', 'passhash39', '2025-06-04 20:41:50'),
(40, 'shopkeeper40@example.com', 'passhash40', '2025-06-04 20:41:50'),
(41, 'shopkeeper41@example.com', 'passhash41', '2025-06-04 20:41:50'),
(42, 'shopkeeper42@example.com', 'passhash42', '2025-06-04 20:41:50'),
(43, 'shopkeeper43@example.com', 'passhash43', '2025-06-04 20:41:50'),
(44, 'shopkeeper44@example.com', 'passhash44', '2025-06-04 20:41:50'),
(45, 'shopkeeper45@example.com', 'passhash45', '2025-06-04 20:41:50'),
(46, 'shopkeeper46@example.com', 'passhash46', '2025-06-04 20:41:50'),
(47, 'shopkeeper47@example.com', 'passhash47', '2025-06-04 20:41:50'),
(48, 'shopkeeper48@example.com', 'passhash48', '2025-06-04 20:41:50'),
(49, 'shopkeeper49@example.com', 'passhash49', '2025-06-04 20:41:50'),
(50, 'shopkeeper50@example.com', 'passhash50', '2025-06-04 20:41:50');

-- --------------------------------------------------------

--
-- Table structure for table `techshops`
--

CREATE TABLE `techshops` (
  `id` int(11) NOT NULL,
  `shopkeeper_id` int(11) NOT NULL,
  `shopkeeper_name` varchar(100) NOT NULL,
  `contact_number` varchar(15) NOT NULL,
  `shop_name` varchar(100) NOT NULL,
  `shop_latitude` decimal(10,7) NOT NULL,
  `shop_longitude` decimal(10,7) NOT NULL,
  `shop_time` varchar(50) DEFAULT NULL,
  `shop_description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `techshops`
--

INSERT INTO `techshops` (`id`, `shopkeeper_id`, `shopkeeper_name`, `contact_number`, `shop_name`, `shop_latitude`, `shop_longitude`, `shop_time`, `shop_description`, `created_at`) VALUES
(1, 1, 'Rajesh Patel', '9876543210', 'TechFix Ellis', 23.0852589, 72.6298634, '10', 'Mobile and laptop repairs', '2025-06-04 20:49:08'),
(2, 2, 'Mehul Shah', '9823456789', 'CompCare Maninagar', 22.9889850, 72.6170673, '9AM - 7PM', 'Computer servicing and accessories', '2025-06-04 20:49:08'),
(3, 3, 'Ankit Rana', '9845612370', 'RepairBay Satellite', 23.0293221, 72.5080911, '10AM - 9PM', 'Tablet, PC, Console repairs', '2025-06-04 20:49:08'),
(4, 4, 'Dinesh Mehta', '9812345678', 'NanoFix CG Road', 23.0368223, 72.5588372, '11AM - 7PM', 'Quick fix electronics', '2025-06-04 20:49:08'),
(5, 5, 'Jignesh Modi', '9978456123', 'DeviceCare Bopal', 23.0221119, 72.4563213, '10AM - 6PM', 'Mobile and tablet diagnostics', '2025-06-04 20:49:08'),
(6, 6, 'Bhavik Joshi', '9987456123', 'ElectroAid Paldi', 23.0123490, 72.5590080, '10AM - 8PM', 'Gaming console and TV service', '2025-06-04 20:49:08'),
(7, 7, 'Snehal Soni', '9871234567', 'CompClinic Shahibaug', 23.0634500, 72.6030011, '9AM - 6PM', 'All-in-one tech support', '2025-06-04 20:49:08'),
(8, 8, 'Dipesh Thakkar', '9822334455', 'QuickTech Navrangpura', 23.0411111, 72.5467890, '11AM - 8PM', 'Mobile and tablet repairs', '2025-06-04 20:49:08'),
(9, 9, 'Krishna Trivedi', '9845012345', 'Fixers Vastral', 23.0278121, 72.6750002, '10AM - 8PM', 'Budget friendly service center', '2025-06-04 20:49:08'),
(10, 10, 'Yashvi Desai', '9856567890', 'TechLab Gota', 23.1157331, 72.6116366, '10', 'Laptop screen and battery service', '2025-06-04 20:49:08'),
(11, 11, 'Karan Patel', '9871111111', 'Digital Fix Naranpura', 23.0598121, 72.5512341, '10AM - 8PM', 'Printer and monitor repair', '2025-06-04 20:49:08'),
(12, 12, 'Harsh Solanki', '9872222222', 'GadgetCare Odhav', 23.0645231, 72.6603453, '9AM - 7PM', 'Electronics diagnostics', '2025-06-04 20:49:08'),
(13, 13, 'Ramesh Chauhan', '9873333333', 'NextGen Naroda', 23.0799120, 72.6634561, '10AM - 6PM', 'Mobile battery and camera fixes', '2025-06-04 20:49:08'),
(14, 14, 'Tejas Gandhi', '9874444444', 'iCare Memnagar', 23.0570132, 72.5356783, '10AM - 8PM', 'iPhone and iPad repairs', '2025-06-04 20:49:08'),
(15, 15, 'Nidhi Verma', '9875555555', 'HelpDesk Bodakdev', 23.0400123, 72.5100123, '11AM - 9PM', 'Smartwatch, mobile, and laptop care', '2025-06-04 20:49:08'),
(16, 16, 'Jayesh Dave', '9876666666', 'TechMate Chandkheda', 23.1234567, 72.5400001, '10AM - 6PM', 'All digital gadget fixes', '2025-06-04 20:49:08'),
(17, 17, 'Manish Vora', '9877777777', 'RebootDrive Vejalpur', 23.0067891, 72.5287652, '10AM - 8PM', 'Mobile and desktop diagnostics', '2025-06-04 20:49:08'),
(18, 18, 'Komal Bhatt', '9878888888', 'SysFix Thaltej', 23.0700011, 72.4956789, '9AM - 7PM', 'Hardware and OS support', '2025-06-04 20:49:08'),
(19, 19, 'Nirav Gohil', '9879999999', 'MobileMend Vasna', 23.0081234, 72.5578912, '11AM - 8PM', 'Basic mobile repair', '2025-06-04 20:49:08'),
(20, 20, 'Vikas Shah', '9880000001', 'ElectroFix Motera', 23.1300451, 72.5813214, '10AM - 9PM', 'Laptop and console repair', '2025-06-04 20:49:08'),
(21, 21, 'Ronak Mehta', '9881111111', 'RapidTech Kalupur', 23.0331234, 72.6087654, '9AM - 6PM', 'PC repairs & accessories', '2025-06-04 20:49:08'),
(22, 22, 'Aarti Patel', '9882222222', 'TechNest Sabarmati', 23.0777890, 72.6043211, '10AM - 7PM', 'Battery replacement, display fixes', '2025-06-04 20:49:08'),
(23, 23, 'Hiren Joshi', '9883333333', 'ITServ Ashram Road', 23.0351230, 72.5714567, '10AM - 8PM', 'Network device repairs', '2025-06-04 20:49:08'),
(24, 24, 'Sneha Choksi', '9884444444', 'CoreFix RTO Circle', 23.0567891, 72.5867891, '9AM - 7PM', 'Motherboard repair specialists', '2025-06-04 20:49:08'),
(25, 25, 'Nimesh Parmar', '9885555555', 'LapKing Drive-In', 23.0456789, 72.5300002, '10AM - 9PM', 'Laptop screen, fan, charger fixes', '2025-06-04 20:49:08'),
(26, 26, 'Ritika Shah', '9886666666', 'TabLab Isanpur', 22.9901234, 72.6034567, '10AM - 7PM', 'Tablet repair and software update', '2025-06-04 20:49:08'),
(27, 27, 'Viraj Pathak', '9887777777', 'PixelFix Naroda GIDC', 23.0956789, 72.6800000, '11AM - 8PM', 'Screen and audio issues', '2025-06-04 20:49:08'),
(28, 28, 'Divya Kothari', '9888888888', 'GadgetGuys Usmanpura', 23.0512345, 72.5534123, '10AM - 6PM', 'Phone unlocking and software flash', '2025-06-04 20:49:08'),
(29, 29, 'Sameer Khan', '9889999999', 'FixHub Vastrapur', 23.0371234, 72.5181234, '9AM - 8PM', 'Laptop RAM and SSD upgrades', '2025-06-04 20:49:08'),
(30, 30, 'Rupal Mehta', '9890000000', 'RepairNest Jodhpur', 23.0267890, 72.5245678, '10AM - 8PM', 'Computer hardware troubleshooting', '2025-06-04 20:49:08'),
(31, 31, 'Yatin Chauhan', '9891111111', 'LaptopAid Vastral', 23.0312345, 72.6441234, '9AM - 6PM', 'Laptop and netbook servicing', '2025-06-04 20:49:08'),
(32, 32, 'Dipika Rana', '9892222222', 'PhoneFix Nikol', 23.0654321, 72.6523456, '10AM - 7PM', 'Mobile mic and speaker repair', '2025-06-04 20:49:08'),
(33, 33, 'Pratik Shah', '9893333333', 'GadgetZone Prahlad Nagar', 23.0300012, 72.5006789, '11AM - 9PM', 'High-end gadget service center', '2025-06-04 20:49:08'),
(34, 34, 'Kavita Shah', '9894444444', 'FixMart Vadaj', 23.0578912, 72.5567890, '10AM - 8PM', 'On-spot phone repair service', '2025-06-04 20:49:08'),
(35, 35, 'Dhruv Rana', '9895555555', 'SmartCare Ghodasar', 22.9981234, 72.6123456, '9AM - 6PM', 'Gadget cleaning and servicing', '2025-06-04 20:49:08'),
(36, 36, 'Tanvi Patel', '9896666666', 'ElectraFix Danilimda', 22.9972345, 72.5832100, '10AM - 7PM', 'Microelectronics repair', '2025-06-04 20:49:08'),
(37, 37, 'Rajvi Shah', '9897777777', 'SystemAid Amraiwadi', 23.0221234, 72.6345678, '10AM - 8PM', 'Desktops, printers, routers', '2025-06-04 20:49:08'),
(38, 38, 'Mitesh Bhatt', '9898888888', 'TechTonic Sola', 23.1004567, 72.5301234, '11AM - 7PM', 'Apple device repair and support', '2025-06-04 20:49:08'),
(39, 39, 'Sonal Vora', '9899999999', 'MobileSquad Anjali', 23.0134567, 72.5509876, '10AM - 6PM', 'Budget mobile repairs', '2025-06-04 20:49:08'),
(40, 40, 'Aakash Jain', '9900000000', 'FixAll Naranpura Cross', 23.0543210, 72.5412345, '10AM - 9PM', 'All device diagnostic', '2025-06-04 20:49:08'),
(41, 41, 'Ritika Mehta', '9901111111', 'EliteFix Vasna Barrage', 23.0112345, 72.5612345, '9AM - 7PM', 'Premium gadgets & support', '2025-06-04 20:49:08'),
(42, 42, 'Zubin Contractor', '9902222222', 'FastFix Shahpur', 23.0333456, 72.5781234, '10AM - 8PM', 'Low-cost laptop repairs', '2025-06-04 20:49:08'),
(43, 43, 'Kushal Shah', '9903333333', 'CarePoint Bhuyangdev', 23.0623456, 72.5345678, '10AM - 9PM', 'Network routers and switches', '2025-06-04 20:49:08'),
(44, 44, 'Aarav Joshi', '9904444444', 'SmartSupport Ranip', 23.1078123, 72.5681234, '9AM - 6PM', 'Camera and headphone repair', '2025-06-04 20:49:08'),
(45, 45, 'Reema Patel', '9905555555', 'Fixify Ambli', 23.0112345, 72.4976543, '11AM - 8PM', 'Screen protector & accessories', '2025-06-04 20:49:08'),
(46, 46, 'Mayur Modi', '9906666666', 'TabTech Jashodanagar', 22.9943210, 72.6287654, '10AM - 7PM', 'Smart tablets and OS repair', '2025-06-04 20:49:08'),
(47, 47, 'Ishita Shah', '9907777777', 'RepairKing Gomtipur', 23.0434567, 72.6181234, '10AM - 9PM', 'Speaker, port and battery care', '2025-06-04 20:49:08'),
(48, 48, 'Paras Rawal', '9908888888', 'MegaFix Meghaninagar', 23.0643210, 72.5932100, '9AM - 6PM', 'B2B repair services', '2025-06-04 20:49:08'),
(49, 49, 'Jinal Gohil', '9909999999', 'SysAid Hathijan', 22.9843210, 72.6700000, '10AM - 7PM', 'Bulk repairs and bulk inventory', '2025-06-04 20:49:08'),
(50, 50, 'Parth Pandya', '9910000000', 'CityTech Narol', 22.9578123, 72.6000001, '10AM - 6PM', 'Repairing all smart devices', '2025-06-04 20:49:08');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `shopkeepers`
--
ALTER TABLE `shopkeepers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `techshops`
--
ALTER TABLE `techshops`
  ADD PRIMARY KEY (`id`),
  ADD KEY `shopkeeper_id` (`shopkeeper_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `shopkeepers`
--
ALTER TABLE `shopkeepers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `techshops`
--
ALTER TABLE `techshops`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `techshops`
--
ALTER TABLE `techshops`
  ADD CONSTRAINT `techshops_ibfk_1` FOREIGN KEY (`shopkeeper_id`) REFERENCES `shopkeepers` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
