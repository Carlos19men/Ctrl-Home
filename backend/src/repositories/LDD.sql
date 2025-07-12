CREATE DATABASE Ctrl_home;

CREATE SCHEMA IF NOT EXISTS domotica;


--creamos los dominios
create DOMAIN domotica.nivelAcceso AS TEXT NOT NULL CHECK  (value in ('administrador','usuario','visitante','personal de servicio','personal de mantenimiento')); 

create DOMAIN domotica.tipoLlave AS text NOT NULL CHECK  (value in ('temporal','permanente'));

create DOMAIN domotica.estadoDispositivo AS TEXT NOT NULL CHECK  (value in ('encendido','apagado','en espera')); 

create DOMAIN domotica.tipoDispositivo AS TEXT NOT NULL CHECK  (value in ('iluminación','electrodomestico','climatización','seguridad'));

create DOMAIN domotica.resultadoAcceso AS TEXT NOT NULL CHECK  (value in ('concedido','denegado'));

create DOMAIN domotica.nivelIntrusion AS TEXT NOT NULL CHECK  (value in ('bajo','medio','alto'));

create DOMAIN domotica.semana AS TEXT NOT NULL CHECK  (value in ('lunes','martes','miercoles','jueves','viernes','sabado','domingo'));


--tabla de llaves de acceso 
create TABLE domotica.Llaves_de_Acceso(
	ID_llave int primary key,
	clave varchar, 
	tipo domotica.tipoLlave, 
	fecha_vencimiento date
);

create TABLE domotica.usuarios (
	ID_usuario int primary key,
	CI varchar(9) unique,
	primer_nombre varchar(15) NOT NULL,
	segundo_nombre varchar(15),
	primer_apellido varchar(15) NOT NULL,
	segundo_apellido varchar(25),
	acceso domotica.nivelAcceso,
	llave int,
	foreign key (llave) references domotica.Llaves_de_acceso(ID_llave)
);

ALTER TABLE domotica.usuarios 
    DROP COLUMN primer_nombre,
    DROP COLUMN segundo_nombre,
    DROP COLUMN primer_apellido,
    DROP COLUMN segundo_apellido;

ALTER TABLE domotica.usuarios 
    ADD COLUMN nombres VARCHAR(40) NOT NULL,
    ADD COLUMN apellidos VARCHAR(40) NOT NULL;

create TABLE domotica.dispositivos (
	ID_dispositivo int primary key,
	nombre varchar NOT NULL,
	descripcion varchar,
	estado domotica.estadoDispositivo default 'apagado',
	tipo domotica.tipoDispositivo 
);

alter TABLE domotica.dispositivos add column estado domotica.estadoDispositivo default 'apagado'

create TABLE domotica.configuraciones (
	ID_usuario int, 
	ID_dispositivo int, 
	fecha date,
	hora time,
	descripcion varchar,
	primary key (ID_usuario,ID_dispositivo,fecha,hora),
	foreign key (ID_usuario) references domotica.usuarios (ID_usuario),
	foreign key (ID_dispositivo) references domotica.dispositivos(ID_dispositivo)
); 

create TABLE domotica.Accesos_usuarios(
	ID_usuario int, 
	ID_dispositivo int, 
	fecha date,
	hora time,
	resultado domotica.resultadoAcceso,
	primary key(ID_usuario,ID_dispositivo,fecha,hora),
	foreign key (ID_usuario) references domotica.usuarios (ID_usuario),
	foreign key (ID_dispositivo) references domotica.dispositivos (ID_dispositivo)
); 

alter TABLE domotica.accesos_usuarios add column resultado domotica.resultadoAcceso 


create TABLE  domotica.iluminacion (
	ID_iluminacion int primary key,
	nivel_iluminacion int check (nivel_iluminacion >= 1 and nivel_iluminacion <=10),
	foreign key (ID_iluminacion) references domotica.dispositivos(ID_dispositivo)
);
ALTER TABLE domotica.iluminacion DROP COLUMN nivel_iluminacion;
ALTER TABLE domotica.iluminacion ADD COLUMN nivel_iluminacion int check (nivel_iluminacion >= 0 and nivel_iluminacion <=10);

create TABLE  domotica.electrodomesticos(
	ID_electrodomestico int primary key,
	foreign key (ID_electrodomestico) references domotica.dispositivos(ID_dispositivo)
);


create TABLE domotica.climatizacion(
	ID_dispositivo int primary key,
	temperatura_promedio int check (temperatura_promedio >= -50 and temperatura_promedio <=50),
	foreign key (ID_dispositivo) references domotica.dispositivos(ID_dispositivo)
);

create TABLE  domotica.seguridad(
	ID_seguridad int primary key,
	foreign key (ID_seguridad) references domotica.dispositivos(ID_dispositivo)
);

create TABLE domotica.intrusiones (

	ID_intrusion int primary key,
	descripcion varchar,
	fecha date NOT NULL,
	hora time NOT NULL,
	nivel domotica.nivelIntrusion,
	ID_seguridad int,
	foreign key (ID_seguridad) references domotica.seguridad(ID_seguridad)
);

create TABLE domotica.cronograma_dispositivo(
	ID_dispositivo int,
	dia_semana domotica.semana,
	hora time,
	accion domotica.estadoDispositivo not null,
	primary key (ID_dispositivo,dia_semana,hora),
	foreign key (ID_dispositivo) references domotica.dispositivos(ID_dispositivo)
);
alter TABLE domotica.cronograma_dispositivo add column accion domotica.estadoDispositivo 
alter TABLE domotica.cronograma_dispositivo alter column accion DROP default   

create TABLE domotica.Accesos(
	ID_dispositivo int,
	acceso domotica.nivelAcceso,
	primary key (ID_dispositivo,acceso),
	foreign key (ID_dispositivo) references domotica.dispositivos(ID_dispositivo)
);

create TABLE domotica.consumos(
	ID_dispositivo int,
	fecha date,
	consumo int check (consumo >= 1),
	descripcion varchar,
	primary key (ID_dispositivo,fecha),
	foreign key (ID_dispositivo) references domotica.dispositivos(ID_dispositivo)
); 



-- en caso de necesitar borrarla 
DROP TABLE domotica.consumos, domotica.accesos; 
DROP TABLE domotica.cronograma_dispositivo; 
DROP TABLE domotica.intrusiones; 
DROP TABLE domotica.seguridad; 
DROP TABLE domotica.electrodomesticos; 
DROP TABLE domotica.climatizacion; 
DROP TABLE domotica.iluminacion; 
DROP TABLE domotica.Accesos_usuarios;
DROP TABLE domotica.configuraciones;
DROP TABLE domotica.dispositivos;
DROP TABLE domotica.usuarios; 
DROP TABLE domotica.Llaves_de_Acceso; 



--en caso de borrar los dominios 
DROP DOMAIN domotica.nivelAcceso, domotica.tipoLlave, domotica.estadoDispositivo, domotica.tipoDispositivo,domotica.resultadoAcceso,domotica.nivelIntrusion,domotica.semana;

--en caso de borrar la base de datos (pa que no se)
DROP DATABASE Ctrl_home;




