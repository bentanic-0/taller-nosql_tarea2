# Análisis de la prueba de carga con JMeter y MongoDB

La prueba de carga realizada con JMeter se centra en evaluar el comportamiento de los servicios REST que interactúan con una base de datos MongoDB. Se han probado dos tipos de peticiones: GET (Historial) y Get Registros  y POST (Create Registro, Create Paciente, Create Medico, Create Institucion).

## Análisis de las peticiones GET:

Análisis del Endpoint "Get Historial"
Cantidad de muestras: 5070
Tiempo medio de respuesta: 475.69 ms
Tasa de error: 0.32%
Tasa de éxito: 99.68%
Throughput: 2.18 peticiones por segundo
Tiempo mínimo de respuesta: 43.83 ms
Tiempo máximo de respuesta: 20530.23 ms
Análisis de las peticiones POST:

Análisis del Endpoint "Get Registros"
El endpoint "Get Registros" ha sido probado con 500 muestras, obteniendo los siguientes resultados:

Tiempo medio de respuesta: 395.87 ms.
Tasa de error: 0%.
Throughput: 0.68 peticiones por segundo.
Tiempo mínimo de respuesta: 0.09 ms.
Tiempo máximo de respuesta: 155381.99 ms.
Análisis:

Rendimiento: El tiempo de respuesta promedio de 395.87 ms se encuentra dentro de un rango aceptable, lo que indica que el endpoint funciona con fluidez.
Estabilidad: La tasa de error es del 0%, lo que significa que el endpoint no presentó errores durante las pruebas. Esto sugiere una alta estabilidad y confiabilidad del endpoint.
Throughput: Un throughput de 0.68 peticiones por segundo indica que el endpoint puede procesar un número moderado de solicitudes por segundo, lo cual es adecuado para la carga actual.
Variabilidad: El tiempo mínimo de respuesta es extremadamente bajo (0.09 ms), mientras que el máximo es bastante alto (155381.99 ms). Esto sugiere que el endpoint puede experimentar fluctuaciones significativas en su tiempo de respuesta, lo que puede ser causado por factores como la carga del servidor o la complejidad de la consulta.


## Análisis de las peticiones POST:

Create Registro:
Cantidad de muestras: 500
Tiempo medio de respuesta: 549.51 ms
Tasa de error: 0%
Tasa de éxito: 100%
Throughput: 0.68 peticiones por segundo
Tiempo mínimo de respuesta: 0.32 ms
Tiempo máximo de respuesta: 0.30 ms

Create Paciente:
Cantidad de muestras: 500
Tiempo medio de respuesta: 300.83 ms
Tasa de error: 0%
Tasa de éxito: 100%
Throughput: 0.68 peticiones por segundo
Tiempo mínimo de respuesta: 0.29 ms
Tiempo máximo de respuesta: 0.21 ms

Create Medico:
Cantidad de muestras: 500
Tiempo medio de respuesta: 349.30 ms
Tasa de error: 0%
Tasa de éxito: 100%
Throughput: 0.68 peticiones por segundo
Tiempo mínimo de respuesta: 0.32 ms
Tiempo máximo de respuesta: 0.26 ms

Create Institucion:
Cantidad de muestras: 500
Tiempo medio de respuesta: 386.59 ms
Tasa de error: 0%
Tasa de éxito: 100%
Throughput: 0.68 peticiones por segundo
Tiempo mínimo de respuesta: 0.28 ms
Tiempo máximo de respuesta: 0.21 ms

--- 

## Observaciones Generales

Rendimiento de las Consultas GET:
La consulta GET para obtener el historial presenta un tiempo de respuesta promedio considerablemente más alto en comparación con las consultas POST. Esto puede ser indicativo de una carga de trabajo más pesada en el servidor o de una consulta que requiere más recursos para ejecutarse, posiblemente debido a la cantidad de datos que se están recuperando.

Rendimiento de las Consultas POST:
Todas las consultas POST (Create Registro, Create Paciente, Create Medico, Create Institucion) tienen un rendimiento sólido, con tiempos de respuesta promedio que oscilan entre 300 y 550 ms y sin errores. Esto sugiere que las operaciones de escritura en la base de datos están optimizadas y funcionan bien bajo la carga actual.

Tasa de Éxito y Errores:
La tasa de éxito es alta en todas las pruebas, lo que indica que los servicios REST están funcionando correctamente. Sin embargo, la tasa de error en la consulta GET es un punto a considerar, ya que cualquier error, aunque sea bajo, puede afectar la experiencia del usuario.

Optimización Potencial:
Dado que la consulta GET tiene un tiempo de respuesta más alto, se recomienda investigar la consulta específica que se está ejecutando. Posibles optimizaciones pueden incluir la revisión de índices en MongoDB, la reducción de la cantidad de datos devueltos o la implementación de paginación para mejorar el rendimiento.

Escalabilidad:
Si se anticipa un aumento en la carga de trabajo, es importante considerar la escalabilidad de la base de datos y los servicios REST. Monitorear el rendimiento bajo diferentes cargas puede ayudar a identificar cuellos de botella y áreas que requieren atención antes de que se conviertan en problemas críticos.

---

### Potenciales mejoras

Investigar la variabilidad: Se recomienda investigar la causa de la alta variabilidad en el tiempo de respuesta. Se debe identificar si hay casos específicos que causan tiempos de respuesta extremadamente altos y analizar su impacto en la experiencia del usuario.
Monitoreo del rendimiento: Implementar un sistema de monitoreo del rendimiento del endpoint, incluyendo métricas como el tiempo de respuesta, el throughput y la tasa de errores. Esto permitirá detectar cualquier problema de rendimiento de manera temprana y tomar medidas correctivas.
Optimización: En caso de que la variabilidad del tiempo de respuesta sea un problema, se puede considerar optimizar la consulta para mejorar su rendimiento. Se debe analizar la consulta actual, identificar posibles cuellos de botella y buscar soluciones para mejorar la eficiencia.