
# Proyecto: Sistema de Historial Médico

## Descripción
Este proyecto proporciona un backend para la gestión de historiales médicos de pacientes, empleando una base de datos NoSQL y exponiendo una API RESTful para realizar operaciones CRUD.

## Tecnologías Utilizadas
- **Lenguaje:** Node.js
- **Framework:** Express.js
- **Base de Datos:** MongoDB
- **ORM:** Mongoose
- **Control de Versiones:** Git

## Estructura del Proyecto
- **models/**: Contiene los esquemas de datos para las colecciones (Paciente, RegistroMédico, Médico, Institución).
- **db.js**: Archivo para la configuración de la conexión a MongoDB.
- **server.js**: Archivo principal de la aplicación que también contiene las rutas de la API para las distintas operaciones.
- **server.test.js**: Archivo de pruebas unitarias a las rutas de la API utilizando supertest.

## Instalación

1. **Clonar el repositorio:**
    ```bash
    git clone https://tu-repositorio.git
    ```
   
2. **Instalar dependencias:**
    ```bash
    cd sistema-historial-medico
    npm install
    ```

3. **Configurar la base de datos:**
    - Se recomienda descargar la herramienta MongoDB Compass para visualizar la base de datos localmente.
    - Crear un archivo `.env` en la raíz del proyecto, solicita al equipo de desarrollo la cadena de conexión de MongoDB y añadela al archivo:
      ```env
      MONGO_URI=mongodb://tu_usuario:tu_contraseña@tu_host:tu_puerto/tu_base_de_datos
      ```

## Ejecución

Ejecuta la aplicación con el siguiente comando:

```bash
npm start
```

## API REST

- **Base URL:** `http://localhost:3000`
- **Formato de Datos:** JSON

### Endpoints

#### Pacientes
- **POST** `/pacientes`: Agregar un nuevo paciente

#### Médicos
- **POST** `/medicos`: Agregar un nuevo médico

#### Instituciones
- **POST** `/instituciones`: Agregar una nueva institución

#### Registros Médicos
- **POST** `/registros`: Agregar un nuevo registro médico
- **GET** `/historial/:ci`: Obtener el historial médico de un paciente por cédula
- **GET** `/registros`: Obtener registros médicos según criterios de búsqueda (tipo, diagnóstico, médico, institución)

## Justificación de MongoDB
Se eligió MongoDB debido a su flexibilidad para manejar datos estructurados y semiestructurados, su escalabilidad, y la facilidad de integración con Mongoose. MongoDB es especialmente útil para datos no relacionales como los historiales médicos, donde las relaciones entre datos pueden no ser rígidas.

## Modelo de la Base de Datos
En el archivo `Fundamentacion_Base_de_Datos.pdf` (en la raíz del proyecto) se explican las relaciones entre las colecciones y la justificación detrás de la estructura de la base de datos.

## Pruebas

Los casos de prueba están disponibles en Postman y se han implementado pruebas unitarias automatizadas utilizando Supertest. Estas pruebas se encuentran en el archivo `server.test.js` ubicado en la raíz del proyecto.

---
