create database Ctrl_home;

CREATE SCHEMA IF NOT EXISTS domotica;


--creamos los dominios
create domain domotica.nivelAcceso as TEXT not null check (value in ('administrador','usuario','visitante','personal de servicio','personal de mantenimiento')); 

create domain domotica.tipoLlave as text not null check (value in ('temporal','permanente'));

create domain domotica.estadoDispositivo as TEXT not null check (value in ('encendido','apagado','en espera')); 

create domain domotica.tipoDispositivo as TEXT not null check (value in ('iluminación','electrodomestico','climatización','seguridad'));

create domain domotica.resultadoAcceso as TEXT not null check (value in ('concedido','denegado'));

create domain domotica.nivelIntrusion as TEXT not null check (value in ('bajo','medio','alto'));

create domain domotica.semana as TEXT not null check (value in ('lunes','martes','miercoles','jueves','viernes','sabado','domingo'));


--tabla de llaves de acceso 
create table domotica.Llaves_de_Acceso(
	ID_llave int primary key,
	clave varchar, 
	tipo domotica.tipoLlave, 
	fecha_vencimiento date
);

create table domotica.usuarios (
	ID_usuario int primary key,
	CI varchar(9) unique,
	primer_nombre varchar(15) not null,
	segundo_nombre varchar(15),
	primer_apellido varchar(15) not null,
	segundo_apellido varchar(25),
	acceso domotica.nivelAcceso,
	llave int,
	foreign key (llave) references domotica.Llaves_de_acceso(ID_llave)
);

create table domotica.dispositivos (
	ID_dispositivo int primary key,
	nombre varchar not null,
	descripcion varchar,
	estado domotica.estadoDispositivo default 'apagado',
	tipo domotica.tipoDispositivo 
);

alter table domotica.dispositivos add column estado domotica.estadoDispositivo default 'apagado'

create table domotica.configuraciones (
	ID_usuario int, 
	ID_dispositivo int, 
	fecha date,
	hora time,
	descripcion varchar,
	primary key (ID_usuario,ID_dispositivo,fecha,hora),
	foreign key (ID_usuario) references domotica.usuarios (ID_usuario),
	foreign key (ID_dispositivo) references domotica.dispositivos(ID_dispositivo)
); 

create table domotica.Accesos_usuarios(
	ID_usuario int, 
	ID_dispositivo int, 
	fecha date,
	hora time,
	resultado domotica.resultadoAcceso,
	primary key(ID_usuario,ID_dispositivo,fecha,hora),
	foreign key (ID_usuario) references domotica.usuarios (ID_usuario),
	foreign key (ID_dispositivo) references domotica.dispositivos (ID_dispositivo)
); 

alter table domotica.accesos_usuarios add column resultado domotica.resultadoAcceso 


create table  domotica.iluminacion (
	ID_iluminacion int primary key,
	nivel_iluminacion int check (nivel_iluminacion >= 1 and nivel_iluminacion <=10),
	foreign key (ID_iluminacion) references domotica.dispositivos(ID_dispositivo)
);


create table  domotica.electrodomesticos(
	ID_electrodomestico int primary key,
	foreign key (ID_electrodomestico) references domotica.dispositivos(ID_dispositivo)
);


create table domotica.climatizacion(
	ID_dispositivo int primary key,
	temperatura_promedio int check (temperatura_promedio >= -50 and temperatura_promedio <=50),
	foreign key (ID_dispositivo) references domotica.dispositivos(ID_dispositivo)
);

create table  domotica.seguridad(
	ID_seguridad int primary key,
	foreign key (ID_seguridad) references domotica.dispositivos(ID_dispositivo)
);

create table domotica.intrusiones (

	ID_intrusion int primary key,
	descripcion varchar,
	fecha date not null,
	hora time not null,
	nivel domotica.nivelIntrusion,
	ID_seguridad int,
	foreign key (ID_seguridad) references domotica.seguridad(ID_seguridad)
);

create table domotica.cronograma_dispositivo(
	ID_dispositivo int,
	dia_semana domotica.semana,
	hora time,
	accion domotica.estadoDispositivo,
	primary key (ID_dispositivo,dia_semana,hora),
	foreign key (ID_dispositivo) references domotica.dispositivos(ID_dispositivo)
);
alter table domotica.cronograma_dispositivo add column accion domotica.estadoDispositivo 
alter table domotica.cronograma_dispositivo alter column accion drop default   

create table domotica.Accesos(
	ID_dispositivo int,
	acceso domotica.nivelAcceso,
	primary key (ID_dispositivo,acceso),
	foreign key (ID_dispositivo) references domotica.dispositivos(ID_dispositivo)
);

create table domotica.consumos(
	ID_dispositivo int,
	fecha date,
	consumo int check (consumo >= 1),
	descripcion varchar,
	primary key (ID_dispositivo,fecha),
	foreign key (ID_dispositivo) references domotica.dispositivos(ID_dispositivo)
); 



-- en caso de necesitar borrarla 
drop table domotica.consumos, domotica.accesos; 
drop table domotica.cronograma_dispositivo; 
drop table domotica.intrusiones; 
drop table domotica.seguridad; 
drop table domotica.electrodomesticos; 
drop table domotica.climatizacion; 
drop table domotica.iluminacion; 
drop table domotica.Accesos_usuarios;
drop table domotica.configuraciones;
drop table domotica.dispositivos;
drop table domotica.usuarios; 
drop table domotica.Llaves_de_Acceso; 



--en caso de borrar los dominios 
drop domain domotica.nivelAcceso, domotica.tipoLlave, domotica.estadoDispositivo, domotica.tipoDispositivo,domotica.resultadoAcceso,domotica.nivelIntrusion,domotica.semana;

--en caso de borrar la base de datos (pa que no se)
drop database Ctrl_home;




