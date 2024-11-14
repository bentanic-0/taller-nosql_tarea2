
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

Los casos de prueba están disponibles en Postman (se ha enviado invite como viewer de workspace a la siguiente dirección electrónica: apastorini@gmail.com) y se encuentra en "./postman" la colección. Adicionalmente, se han implementado pruebas unitarias automatizadas utilizando Supertest. Estas pruebas se encuentran en archivo `server.test.js` ubicado en la raíz del proyecto.

---

## Requisitos opcionales

### 1. JMeter
Se dispone en la raíz, de un directorio "/reqOpcional", dentro de él se encuentran los archivos relativos aL requisitos opcional de JMeter.

### 2. Solución dockerizada

Se han creado los archivos: ".dockerignore", "docker-compose.yml" y "Dockerfile" necesarios para el propósito. Los mismos se encuentran en la raíz.

**Pasos para ejecutar la solución en Docker**
Instalar Docker Desktop: Asegúrate de tener Docker Desktop instalado y Docker Engine en ejecución.

Clonar el repositorio: Clona este repositorio en tu máquina local.

Configurar las variables de entorno: Asegúrate de que el archivo .env incluya la variable MONGO_URI, o revisa el archivo docker-compose.yml para confirmarlo.

Construir y ejecutar los contenedores: En la terminal, desde la raíz del proyecto, ejecuta el siguiente comando para construir y levantar los contenedores:


<docker-compose up --build>


Probar la aplicación: Una vez que los contenedores estén en funcionamiento, accede a la API en http://localhost:3000. Puedes probar los endpoints usando Postman o cualquier otra herramienta de tu elección, como por ejemplo directamente desde el browser.

Detener los contenedores: Cuando hayas terminado, puedes detener los contenedores con:

´´´sh
docker-compose down
´´´

Para finalizar: El archivo docker-compose.yml ya incluye un volumen para MongoDB, lo que asegura que los datos persistan entre reinicios de contenedores. Esto significa que no perderemos datos si detenemos y volvemos a levantar la aplicación.

---

## Puntos a mejorar en el proyecto a futuro

* **Validación de datos:**
    * Reforzar las validaciones existentes con Mongoose.
    * Agregar validaciones personalizadas para asegurar la integridad de los datos (formatos de fecha, longitudes de cadenas, etc.).

* **Paginación:**
    * Implementar paginación en las consultas de historial médico y registros por criterio.
    * Utilizar parámetros como `page` y `limit` para controlar la cantidad de resultados devueltos.

* **Manejo de errores:**
    * Implementar un middleware de manejo de errores para centralizar la gestión de excepciones.
    * Proporcionar respuestas informativas al usuario en caso de errores.

* **Documentación:**
    * Enriquecer la documentación de la API en el README.
    * Incluir ejemplos de solicitudes y respuestas para facilitar su comprensión.

* **Pruebas:**
    * Implementar pruebas unitarias e integración para asegurar la calidad del código.
    * Detectar errores antes de que afecten a los usuarios.
