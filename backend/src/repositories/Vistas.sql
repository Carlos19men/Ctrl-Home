
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

SELECT B.nombre, SUM(A.consumo) AS Consumo_Total,EXTRACT(MONTH FROM(A.fecha)) as nro_mes,EXTRACT(YEAR FROM(A.fecha)) as nro_año
FROM domotica.consumos A,domotica.dispositivos B 
WHERE A.id_dispositivo = B.id_dispositivo 
group by B.nombre,EXTRACT( Month From(A.fecha)),EXTRACT(year From(A.fecha))
order by B.nombre

CREATE VIEW domotica.consumo_mensual AS
SELECT B.nombre, SUM(A.consumo) AS Consumo_Total,EXTRACT(MONTH FROM(A.fecha)) as nro_mes,EXTRACT(YEAR FROM(A.fecha)) as nro_año
FROM domotica.consumos A,domotica.dispositivos B 
WHERE A.id_dispositivo = B.id_dispositivo 
group by B.nombre,EXTRACT( Month From(A.fecha)),EXTRACT(year From(A.fecha))
order by B.nombre

SELECT * from domotica.consumo_mensual

CREATE VIEW domotica.consumo_anual AS
SELECT B.nombre, SUM(A.consumo) AS Consumo_Total,EXTRACT(YEAR FROM(A.fecha)) as nro_año
FROM domotica.consumos A,domotica.dispositivos B 
WHERE A.id_dispositivo = B.id_dispositivo 
group by B.nombre,EXTRACT(year From(A.fecha))
order by B.nombre

SELECT * from domotica.consumo_anual  

CREATE VIEW domotica.Intrusiones_detectadas AS
SELECT B.nombre,A.descripcion,A.nivel,A.fecha, A.hora
From domotica.intrusiones A, domotica.dispositivos B
where A.id_seguridad= B.id_dispositivo

SELECT * from domotica.intrusiones_detectadas 