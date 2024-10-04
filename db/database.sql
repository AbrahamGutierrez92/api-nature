create database IF NOT EXISTS nature_db;

use nature_db

create table usuario(
    id int(11) not null AUTO_INCREMENT,
    codigo_empleado varchar(60) not null,
    url_Imagen varchar(100) not null,
    nombre varchar(45) default null,
    correo varchar(50) not null,
    contrasena varchar(60) not null,
    cargo varchar(50) not null,
    rol varchar (50) not null,
    
    PRIMARY KEY(id),    
)

create table producto(
    id_producto int(28) not null AUTO_INCREMENT,
    url_Imagen_Prod varchar(80) not null, 
    nombre varchar(45) not null,
    precio int(45) not null,
    descripcion varchar(50) not null,

    PRIMARY KEY(id_producto),
    
)

