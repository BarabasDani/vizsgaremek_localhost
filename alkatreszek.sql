-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Ápr 30. 08:16
-- Kiszolgáló verziója: 10.4.28-MariaDB
-- PHP verzió: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `alkatreszek`
--
CREATE DATABASE IF NOT EXISTS `alkatreszek` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `alkatreszek`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `alkatresz`
--

CREATE TABLE `alkatresz` (
  `productid` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `alkatresz`
--

INSERT INTO `alkatresz` (`productid`, `name`, `price`, `stock`, `image`) VALUES
(5, 'Samsung 870 EVO 250GB SATA SSD', 17690, 17, '2024_02_20_ssd.jpg'),
(6, 'ASUS ROG Strix 1000W tápegység ', 79590, 41, '2024_03_22_2024_01_30_tap.jpg'),
(7, 'Kolink Void RGB üveg ablakos fekete számítógépház', 22790, 102, '2024_02_20_gephaz.jpg'),
(8, 'ASUS ROG Strix B550-F Gaming alaplap', 64999, 10, '2024_02_20_alaplap.jpg'),
(9, 'Intel Core i9-9900K processzor', 56000, 15, '2024_02_20_processzor.jpg'),
(10, 'Kingston Fury 32GB Beast RGB ram', 49570, 21, '2024_02_20_ram.jpg'),
(11, 'Noctua NH-D15 processzorhűtő', 23990, 22, '2024_03_26_2024_03_05_huto.jpg'),
(16, 'MSI GeForce RTX 4060 Ti Ventus edition videókártya', 165000, 21, '2024_02_27_2024_01_30_4060.jpg'),
(18, 'BarraCuda 3.5 2TB 7200rpm 256MB SATA3', 15890, 30, '2024_03_21_hdd2.jpg'),
(22, 'AMD Ryzen 5 3600 processzor', 69990, 15, '2024_03_26_ryzen 5 3600 processzor.jpg'),
(23, 'Intel i5-12400F processzor', 54000, 13, '2024_03_26_i5 12400f processzor.jpg'),
(24, 'Zalman I3 Neo gépház', 30000, 7, '2024_03_26_Zalman I3 Neo gephaz.jpg');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `ordering`
--

CREATE TABLE `ordering` (
  `orderid` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `productid` int(11) NOT NULL,
  `orderdate` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user`
--

CREATE TABLE `user` (
  `userid` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` tinyint(4) NOT NULL,
  `userImage` varchar(255) NOT NULL,
  `birthday` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `user`
--

INSERT INTO `user` (`userid`, `email`, `username`, `password`, `role`, `userImage`, `birthday`) VALUES
(1, 'admin@admin.hu', 'Admin1', '$2b$10$bJtICpv8lit0RQCCcKYEseLLGe6goM5eOeiOG29S6aDyNX1F3K8f2', 1, '2024_03_22_2024_02_20_profile.png', '1998-04-21'),
(2, 'teszt@teszt.hu', 'Teszt', '$2b$10$FHMan2tOO0ZXzljDYG03HeRM6cyjVHipt9gaHKKZmr9h.PCcwej8C', 0, '2024_03_22_2024_01_31_profile.png', '2023-09-12'),
(3, 'imi20040508@gmail.com', 'Imre0508', '$2b$10$PpnUz4mbT5M7KD9RXlgLweN25kB26ct5S2HhhWfW1RQNe8bKfzAJC', 1, 'no_image.png', '0000-00-00'),
(4, 'danibarabas08@gmail.com', 'Dani', '$2b$10$3PSA/nT6QiL3EJ0CCKedEOYxgtZafOvfOXNYMW85DxXKh6puzpyfu', 1, 'no_image.png', '2005-02-23'),
(6, 'Mark@gmail.com', 'Márk', '$2b$10$8LywjhcVyR3/UcMxnQ7YaOaaUYOdP.rOWZQy.7EZNLCmoqTMDCdUe', 0, 'no_image.png', '0000-00-00'),
(7, 'Balazs12@gmail.com', 'Balázs', '$2b$10$uw7DqzPJy7fzfW63Q8RoiOjnAnE/z1pl4EJR2ldLuTgRqCmISj18i', 0, 'no_image.png', '0000-00-00'),
(8, 'Joe5234@gmail.com', 'Joe', '$2b$10$pC7h7AunwoGI..RZ4AwV6OJe8/3khQ9oJYxozESso.ippz1Zyoknq', 0, 'no_image.png', '0000-00-00'),
(9, 'Teszt11@gmail.com', 'teszt11', '$2b$10$nz4gKRck18J7O6fQNVLW1uDTEB6jjjNEoyVypa.fKe2Zmlf.6Ia4S', 0, 'no_image.png', '0000-00-00'),
(10, 'Adam2134@gmail.com', 'Adam', '$2b$10$WfP6rvgyS35ezMCsD6emquCXiIuhguA3mUGlojLUtqa4sWg90w.OW', 0, 'no_image.png', '0000-00-00');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `alkatresz`
--
ALTER TABLE `alkatresz`
  ADD PRIMARY KEY (`productid`);

--
-- A tábla indexei `ordering`
--
ALTER TABLE `ordering`
  ADD PRIMARY KEY (`orderid`),
  ADD KEY `userid` (`userid`),
  ADD KEY `productid` (`productid`);

--
-- A tábla indexei `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userid`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `alkatresz`
--
ALTER TABLE `alkatresz`
  MODIFY `productid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT a táblához `ordering`
--
ALTER TABLE `ordering`
  MODIFY `orderid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT a táblához `user`
--
ALTER TABLE `user`
  MODIFY `userid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `ordering`
--
ALTER TABLE `ordering`
  ADD CONSTRAINT `ordering_ibfk_1` FOREIGN KEY (`productid`) REFERENCES `alkatresz` (`productid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ordering_ibfk_2` FOREIGN KEY (`userid`) REFERENCES `user` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
