-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-06-2025 a las 21:42:58
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bdpruebas`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id_categoria` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id_categoria`, `nombre`, `descripcion`, `created_at`, `updated_at`) VALUES
(1, 'Electrónicos', 'Dispositivos electrónicos y gadgets', '2025-06-01 19:28:00', '2025-06-01 19:28:00'),
(2, 'Ropa', 'Prendas de vestir para todas las edades', '2025-06-01 19:28:00', '2025-06-01 19:28:00'),
(3, 'Hogar', 'Artículos para el hogar y decoración', '2025-06-01 19:28:00', '2025-06-01 19:28:00'),
(4, 'Deportes', 'Equipamiento y accesorios deportivos', '2025-06-01 19:28:00', '2025-06-01 19:28:00'),
(5, 'Alimentos', 'Productos alimenticios y bebidas', '2025-06-01 19:28:00', '2025-06-01 19:28:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id_producto` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL,
  `cantidad` int(11) NOT NULL DEFAULT 0,
  `id_categoria` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id_producto`, `nombre`, `descripcion`, `precio`, `cantidad`, `id_categoria`, `created_at`, `updated_at`) VALUES
(1, 'Smartphone X', 'Último modelo con cámara de 108MP', 899.99, 50, 1, '2025-06-01 19:28:00', '2025-06-01 19:28:00'),
(2, 'Laptop Pro', '16GB RAM, 1TB SSD, i7 12va gen', 1299.99, 30, 1, '2025-06-01 19:28:00', '2025-06-01 19:28:00'),
(3, 'Auriculares Bluetooth', 'Cancelación de ruido activa', 199.99, 100, 1, '2025-06-01 19:28:00', '2025-06-01 19:28:00'),
(4, 'Smart TV 55\"', '4K UHD, HDR, Android TV', 699.99, 25, 1, '2025-06-01 19:28:00', '2025-06-01 19:28:00'),
(5, 'Tablet 10\"', '128GB almacenamiento, pantalla retina', 349.99, 40, 1, '2025-06-01 19:28:00', '2025-06-01 19:28:00'),
(6, 'Smartwatch', 'Monitor de ritmo cardíaco y GPS', 249.99, 60, 1, '2025-06-01 19:28:00', '2025-06-01 19:28:00'),
(7, 'Camisa algodón', 'Camisa de manga larga 100% algodón', 29.99, 200, 2, '2025-06-01 19:28:00', '2025-06-01 19:28:00'),
(8, 'Jeans slim fit', 'Jeans ajustados color azul oscuro', 49.99, 150, 2, '2025-06-01 19:28:00', '2025-06-01 19:28:00'),
(9, 'Chaqueta invierno', 'Chaqueta impermeable con capucha', 89.99, 80, 2, '2025-06-01 19:28:00', '2025-06-01 19:28:00'),
(10, 'Zapatos casuales', 'Zapatos de cuero para hombre', 59.99, 120, 2, '2025-06-01 19:28:00', '2025-06-01 19:28:00'),
(11, 'Vestido verano', 'Vestido ligero estampado floral', 39.99, 180, 2, '2025-06-01 19:28:00', '2025-06-01 19:28:00'),
(12, 'Bufanda lana', 'Bufanda de lana merino varios colores', 19.99, 250, 2, '2025-06-01 19:28:00', '2025-06-01 19:28:00'),
(13, 'Juego de sábanas', 'Sábanas de algodón egipcio 600 hilos', 79.99, 90, 3, '2025-06-01 19:28:00', '2025-06-01 19:28:00'),
(14, 'Lámpara de mesa', 'Lámpara LED regulable', 34.99, 110, 3, '2025-06-01 19:28:00', '2025-06-01 19:28:00'),
(15, 'Set de ollas', '6 piezas antiadherentes', 129.99, 50, 3, '2025-06-01 19:28:00', '2025-06-01 19:28:00'),
(16, 'Cortinas blackout', 'Cortinas opacas para dormitorio', 49.99, 70, 3, '2025-06-01 19:28:00', '2025-06-01 19:28:00'),
(17, 'Alfombra persa', 'Alfombra 2x3 metros diseño tradicional', 199.99, 20, 3, '2025-06-01 19:28:00', '2025-06-01 19:28:00'),
(18, 'Jarrón cerámica', 'Jarrón decorativo hecho a mano', 29.99, 130, 3, '2025-06-01 19:28:00', '2025-06-01 19:28:00'),
(19, 'Balón fútbol', 'Balón oficial tamaño 5', 29.99, 150, 4, '2025-06-01 19:28:00', '2025-06-01 19:28:00'),
(20, 'Raqueta tenis', 'Raqueta profesional carbono', 149.99, 40, 4, '2025-06-01 19:28:00', '2025-06-01 19:28:00'),
(21, 'Bicicleta montaña', 'Bicicleta 21 velocidades suspensión', 499.99, 15, 4, '2025-06-01 19:28:00', '2025-06-01 19:28:00'),
(22, 'Pesas ajustables', 'Set de 20kg ajustables', 89.99, 60, 4, '2025-06-01 19:28:00', '2025-06-01 19:28:00'),
(23, 'Colchoneta yoga', 'Colchoneta antideslizante extra gruesa', 24.99, 200, 4, '2025-06-01 19:28:00', '2025-06-01 19:28:00'),
(24, 'Mochila senderismo', 'Mochila 30L impermeable', 59.99, 80, 4, '2025-06-01 19:28:00', '2025-06-01 19:28:00'),
(25, 'Café premium', 'Café en grano 100% arábica', 12.99, 300, 5, '2025-06-01 19:28:00', '2025-06-01 19:28:00'),
(26, 'Aceite oliva virgen', 'Aceite de oliva extra virgen 1L', 9.99, 250, 5, '2025-06-01 19:28:00', '2025-06-01 19:28:00'),
(27, 'Miel natural', 'Miel pura de flores 500g', 7.99, 180, 5, '2025-06-01 19:28:00', '2025-06-01 19:28:00'),
(28, 'Pasta integral', 'Pasta de trigo integral 500g', 3.99, 400, 5, '2025-06-01 19:28:00', '2025-06-01 19:28:00'),
(29, 'Chocolate 85% cacao', 'Tableta chocolate negro orgánico', 4.99, 350, 5, '2025-06-01 19:28:00', '2025-06-01 19:28:00'),
(30, 'Galletas integrales', 'Paquete galletas con semillas', 2.99, 500, 5, '2025-06-01 19:28:00', '2025-06-01 19:28:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `mail` varchar(100) DEFAULT NULL,
  `age` int(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id_user`, `name`, `mail`, `age`) VALUES
(1, 'Pedrito Perez', 'predrito@gmail.com', 30),
(2, 'Marta Castro', 'marta@gmail.com', 22),
(3, 'Mario Medina', 'mario@gmail.com', 43);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id_producto`),
  ADD KEY `id_categoria` (`id_categoria`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id_categoria`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
