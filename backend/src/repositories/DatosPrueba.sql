--Datos de prueba 

-- Insertar registros en la tabla Llaves_de_Acceso
INSERT INTO domotica.Llaves_de_Acceso (ID_llave, clave, tipo, fecha_vencimiento) VALUES
(101, 'clave_admin_01', 'permanente', NULL),
(102, 'clave_user_02', 'permanente', NULL),
(103, 'clave_visit_03', 'temporal', '2025-12-31'),
(104, 'clave_serv_04', 'temporal', '2025-06-30'),
(105, 'clave_mant_05', 'permanente', NULL),
(106, 'clave_admin_06', 'permanente', NULL),
(107, 'clave_user_07', 'temporal', '2026-01-15'),
(108, 'clave_visit_08', 'temporal', '2025-07-01'),
(109, 'clave_serv_09', 'permanente', NULL),
(110, 'clave_mant_10', 'temporal', '2025-08-01');

-- Insertar registros en la tabla usuarios
INSERT INTO domotica.usuarios (ID_usuario, CI, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, acceso, llave) VALUES
(1, '123456789', 'Juan', 'Carlos', 'Perez', 'Gomez', 'administrador', 101),
(2, '987654321', 'Maria', 'Jose', 'Lopez', 'Diaz', 'usuario', 102),
(3, '112233445', 'Pedro', NULL, 'Ramirez', 'Silva', 'visitante', 103),
(4, '554433221', 'Ana', 'Sofia', 'Martinez', 'Ruiz', 'personal de servicio', 104),
(5, '667788990', 'Luis', 'Alberto', 'Garcia', 'Fernandez', 'personal de mantenimiento', 105),
(6, '102030405', 'Elena', NULL, 'Sanchez', 'Herrera', 'administrador', 106),
(7, '203040506', 'Carlos', 'Andres', 'Diaz', 'Moreno', 'usuario', 107),
(8, '304050607', 'Laura', 'Isabel', 'Torres', 'Castro', 'visitante', 108),
(9, '405060708', 'Miguel', NULL, 'Vargas', 'Rojas', 'personal de servicio', 109),
(10, '506070809', 'Sofia', 'Valentina', 'Flores', 'Mendoza', 'personal de mantenimiento', 110),
(11, '607080910', 'Ricardo', NULL, 'Gonzales', 'Ortega', 'usuario', 102),
(12, '708091011', 'Gabriela', 'Alejandra', 'Jimenez', 'Pinto', 'usuario', 107);


-- Insertar registros en la tabla dispositivos
INSERT INTO domotica.dispositivos (ID_dispositivo, nombre, descripcion, estado, tipo) VALUES
(201, 'Luz Sala', 'Iluminación principal de la sala', 'encendido', 'iluminación'),
(202, 'Termostato Sala', 'Control de temperatura de la sala', 'en espera', 'climatización'),
(203, 'Cámara Principal', 'Cámara de seguridad de la entrada', 'encendido', 'seguridad'),
(204, 'Cafetera Cocina', 'Cafetera programable', 'apagado', 'electrodomestico'),
(205, 'Luz Cocina', 'Iluminación de la cocina', 'apagado', 'iluminación'),
(206, 'Sensor Movimiento', 'Sensor de movimiento en el pasillo', 'encendido', 'seguridad'),
(207, 'Aire Acondicionado Habitación', 'Aire acondicionado de la habitación principal', 'apagado', 'climatización'),
(208, 'Refrigerador', 'Refrigerador inteligente', 'encendido', 'electrodomestico'),
(209, 'Luz Habitación', 'Iluminación de la habitación principal', 'encendido', 'iluminación'),
(210, 'Alarma Puerta', 'Alarma de la puerta principal', 'en espera', 'seguridad'),
(211, 'Lavadora', 'Lavadora inteligente', 'apagado', 'electrodomestico'),
(212, 'Luz Exterior', 'Iluminación del jardín', 'apagado', 'iluminación'),
(213, 'Termostato Habitación', 'Control de temperatura de la habitación', 'en espera', 'climatización'),
(214, 'Cámara Trasera', 'Cámara de seguridad del patio trasero', 'encendido', 'seguridad'),
(215, 'Horno', 'Horno eléctrico', 'apagado', 'electrodomestico');


-- Insertar registros en la tabla configuraciones
INSERT INTO domotica.configuraciones (ID_usuario, ID_dispositivo, fecha, hora, descripcion) VALUES
(1, 201, '2025-05-20', '08:00:00', 'Configuración de encendido automático de luz'),
(2, 202, '2025-05-21', '19:30:00', 'Temperatura deseada para la noche'),
(1, 203, '2025-05-22', '10:00:00', 'Sensibilidad de la cámara ajustada'),
(4, 204, '2025-05-23', '07:00:00', 'Programación de cafetera para la mañana'),
(2, 205, '2025-05-24', '20:00:00', 'Apagado automático de luz de cocina'),
(1, 206, '2025-05-25', '11:00:00', 'Zona de detección de movimiento ajustada'),
(7, 207, '2025-05-26', '22:00:00', 'Temperatura de confort para dormir'),
(1, 208, '2025-05-27', '09:00:00', 'Revisión de estado del refrigerador'),
(2, 209, '2025-05-28', '21:00:00', 'Configuración de luz de lectura'),
(1, 210, '2025-05-29', '12:00:00', 'Activación de alarma al salir'),
(1, 211, '2025-05-30', '14:00:00', 'Configuración de ciclo de lavado'),
(2, 212, '2025-05-31', '06:00:00', 'Encendido de luces exteriores al amanecer');


-- Insertar registros en la tabla Accesos_usuarios
INSERT INTO domotica.Accesos_usuarios (ID_usuario, ID_dispositivo, fecha, hora, resultado) VALUES
(1, 201, '2025-05-20', '08:05:00', 'concedido'),
(2, 202, '2025-05-21', '19:35:00', 'concedido'),
(3, 203, '2025-05-22', '10:15:00', 'denegado'), -- Visitante intentando acceder a cámara
(4, 204, '2025-05-23', '07:05:00', 'concedido'),
(2, 205, '2025-05-24', '20:05:00', 'concedido'),
(5, 206, '2025-05-25', '11:10:00', 'concedido'),
(7, 207, '2025-05-26', '22:05:00', 'concedido'),
(1, 208, '2025-05-27', '09:05:00', 'concedido'),
(8, 209, '2025-05-28', '21:05:00', 'denegado'), -- Visitante intentando acceder a luz de habitación
(1, 210, '2025-05-29', '12:05:00', 'concedido'),
(11, 201, '2025-05-30', '09:00:00', 'concedido'),
(12, 205, '2025-05-31', '07:30:00', 'concedido'),
(3, 215, '2025-06-01', '15:00:00', 'denegado');


-- Insertar registros en la tabla iluminacion
INSERT INTO domotica.iluminacion (ID_iluminacion, nivel_iluminacion) VALUES
(201, 7),
(205, 5),
(209, 8),
(212, 6);


-- Insertar registros en la tabla electrodomesticos
INSERT INTO domotica.electrodomesticos (ID_electrodomestico) VALUES
(204),
(208),
(211),
(215);


-- Insertar registros en la tabla climatizacion
INSERT INTO domotica.climatizacion (ID_dispositivo, temperatura_promedio) VALUES
(202, 22),
(207, 20),
(213, 21);


-- Insertar registros en la tabla seguridad
INSERT INTO domotica.seguridad (ID_seguridad) VALUES
(203),
(206),
(210),
(214);


-- Insertar registros en la tabla intrusiones
INSERT INTO domotica.intrusiones (ID_intrusion, descripcion, fecha, hora, nivel, ID_seguridad) VALUES
(301, 'Movimiento detectado en pasillo sin autorización', '2025-05-25', '03:15:00', 'medio', 206),
(302, 'Intento de acceso no autorizado a puerta principal', '2025-05-28', '01:00:00', 'alto', 210),
(303, 'Actividad sospechosa en cámara trasera', '2025-05-29', '23:45:00', 'bajo', 214),
(304, 'Acceso denegado a dispositivo de seguridad', '2025-05-22', '10:15:00', 'medio', 203),
(305, 'Alerta de movimiento en jardín', '2025-06-01', '04:00:00', 'bajo', 206);


-- Insertar registros en la tabla cronograma_dispositivo
INSERT INTO domotica.cronograma_dispositivo (ID_dispositivo, dia_semana, hora, accion) VALUES
(201, 'lunes', '07:00:00', 'encendido'),
(201, 'lunes', '23:00:00', 'apagado'),
(202, 'martes', '18:00:00', 'encendido'),
(202, 'martes', '06:00:00', 'apagado'),
(204, 'viernes', '06:30:00', 'encendido'),
(205, 'miercoles', '07:30:00', 'encendido'),
(205, 'miercoles', '22:00:00', 'apagado'),
(207, 'jueves', '21:00:00', 'encendido'),
(207, 'jueves', '07:00:00', 'apagado'),
(212, 'domingo', '19:00:00', 'encendido'),
(212, 'domingo', '05:00:00', 'apagado');


-- Insertar registros en la tabla Accesos
INSERT INTO domotica.Accesos (ID_dispositivo, acceso) VALUES
(201, 'administrador'),
(201, 'usuario'),
(202, 'administrador'),
(202, 'usuario'),
(203, 'administrador'),
(204, 'administrador'),
(204, 'usuario'),
(204, 'personal de servicio'),
(205, 'administrador'),
(205, 'usuario'),
(206, 'administrador'),
(206, 'personal de mantenimiento'),
(207, 'administrador'),
(207, 'usuario'),
(208, 'administrador'),
(208, 'usuario'),
(209, 'administrador'),
(209, 'usuario'),
(210, 'administrador'),
(214, 'administrador');


-- Insertar registros en la tabla consumos
INSERT INTO domotica.consumos (ID_dispositivo, fecha, consumo, descripcion) VALUES
(201, '2025-05-20', 15, 'Consumo diario de luz de sala'),
(202, '2025-05-21', 30, 'Consumo diario de termostato'),
(204, '2025-05-23', 5, 'Consumo de cafetera'),
(205, '2025-05-24', 10, 'Consumo diario de luz de cocina'),
(207, '2025-05-26', 45, 'Consumo de aire acondicionado'),
(208, '2025-05-27', 60, 'Consumo diario de refrigerador'),
(209, '2025-05-28', 12, 'Consumo diario de luz de habitación'),
(211, '2025-05-30', 25, 'Consumo de lavadora por ciclo'),
(212, '2025-05-31', 8, 'Consumo diario de luz exterior'),
(213, '2025-06-01', 28, 'Consumo diario de termostato de habitación'),
(215, '2025-06-02', 18, 'Consumo de horno');

