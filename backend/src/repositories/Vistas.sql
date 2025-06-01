
--Elaboración de vistas

--datos de usuario
CREATE  VIEW domotica.datos_usuarios AS
SELECT ID_usuario,primer_nombre,segundo_nombre, primer_apellido,segundo_apellido,acceso
FROM domotica.usuarios

DROP VIEW domotica.datos_usuarios

SELECT * FROM domotica.datos_usuarios 

--datos de dispositivo

CREATE  VIEW domotica.datos_dispositivos AS
SELECT ID_dispositivo,nombre,descripcion, estado,tipo
FROM domotica.dispositivos

DROP VIEW domotica.datos_dispositivos

SELECT * FROM domotica.datos_dispositivos


CREATE  VIEW domotica.configuracion_dispositivos AS
SELECT A.ID_dispositivo,nombre,tipo,fecha,hora,B.descripcion
FROM domotica.dispositivos A, domotica.configuraciones B
WHERE A.id_dispositivo= B.id_dispositivo

DROP VIEW domotica.configuracion_dispositivos

SELECT * FROM domotica.configuracion_dispositivos

CREATE VIEW domotica.dispositivos_usuario AS
SELECT B.primer_nombre,B.primer_apellido,A.nombre
FROM domotica.dispositivos A,domotica.usuarios B,domotica.accesos_usuarios C
WHERE A.id_dispositivo = C.id_dispositivo AND B.id_usuario = C.id_usuario AND C.resultado = 'concedido' 

SELECT primer_nombre,primer_apellido,nombre FROM domotica.dispositivos_usuario  order by nombre


