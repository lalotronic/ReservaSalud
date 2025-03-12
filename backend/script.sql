-- Tablas base del sistema
CREATE TABLE region (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE usuario (
    id SERIAL PRIMARY KEY,
    rut VARCHAR(12) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    password VARCHAR(255),
    rol VARCHAR(12) NOT NULL CHECK (rol IN ('paciente', 'profesional'))
);

-- Tablas de especialidades
CREATE TABLE especialidad (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE subespecialidad (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    especialidad_id INTEGER NOT NULL REFERENCES especialidad(id)
);

-- Tabla extendida para profesionales con región
CREATE TABLE profesional (
    usuario_id INTEGER PRIMARY KEY REFERENCES usuario(id),
    especialidad_id INTEGER NOT NULL REFERENCES especialidad(id),
    subespecialidad_id INTEGER REFERENCES subespecialidad(id),
    region_id INTEGER REFERENCES region(id)
);

-- Tabla de tipos de cita
CREATE TABLE tipo_cita (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    duracion INTEGER NOT NULL CHECK (duracion > 0),
    profesional_id INTEGER NOT NULL REFERENCES profesional(usuario_id)
);

-- Tabla de disponibilidad modificada
CREATE TABLE disponibilidad (
    id SERIAL PRIMARY KEY,
    profesional_id INTEGER NOT NULL REFERENCES profesional(usuario_id),
    fecha_hora TIMESTAMP NOT NULL,
    tipo_cita_id INTEGER NOT NULL REFERENCES tipo_cita(id),
    estado VARCHAR(15) DEFAULT 'disponible' CHECK (estado IN ('disponible', 'reservado'))
);

-- Tabla de citas actualizada
CREATE TABLE cita (
    id SERIAL PRIMARY KEY,
    paciente_id INTEGER NOT NULL REFERENCES usuario(id),
    disponibilidad_id INTEGER NOT NULL UNIQUE REFERENCES disponibilidad(id),
    fecha_hora TIMESTAMP NOT NULL,
    observaciones TEXT
);