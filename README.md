# taller-nosql_tarea2
historial-medico

# Proyecto de Gestión de Historial Médico


## Descripción

Este proyecto consiste en una solución de software para gestionar el historial médico de pacientes utilizando una base de datos NoSQL y ofreciendo servicios a través de una API REST.


## Formato de Intercambio de Datos

Todos los intercambios de información se realizan en formato JSON.

##Plataformas

Lenguaje: JavaScript (Node.js)
Base de Datos: MongoDB (NoSQL)

Justificación de la Base de Datos Elegida

Se eligió MongoDB como base de datos NoSQL debido a su flexibilidad para manejar datos no estructurados y su capacidad para escalar horizontalmente, lo que es ideal para gestionar grandes volúmenes de datos de registros médicos.

Diseño de Esquema

El sistema utiliza los siguientes esquemas de Mongoose:

    Institución
        ID único
        Nombre
        Dirección (opcional)
        Teléfono (opcional)

    Médico
        Cédula de Identidad (CI)
        Nombre
        Apellido
        Especialidad
        Teléfono (opcional)
        Institución (referencia)

    Paciente
        Cédula de Identidad (CI)
        Nombre
        Apellido
        Fecha de Nacimiento
        Sexo

    Registro Médico
        Fecha
        Tipo (Consulta, Examen, Internación)
        Diagnóstico
        Médico (referencia)
        Institución (referencia)
        Cédula de Identidad del Paciente

## URL de los Servicios

- **Agregar Paciente**: `POST /api/pacientes`

- **Agregar Registro Médico**: `POST /api/registros`

- **Consultar Historial Médico**: `GET /api/pacientes/:ci/historial`

- **Obtener Registros por Criterio**: `GET /api/registros`

Manual de Configuración

    Asegúrate de tener MongoDB corriendo.
    Configura tu archivo .env con las credenciales necesarias para conectar a MongoDB.
    Inicia el servidor: npm start
    
