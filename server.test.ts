const request = require('supertest');
const app = require('./server'); // Asegúrate de que la ruta sea correcta
const connectDB = require('./db');
const { v4: uuidv4 } = require('uuid');

describe('Pruebas de la API de Gestión Médica', () => {
  let token;

  beforeAll(async () => {
    await connectDB();

    // Si tu API requiere autenticación, obtén un token aquí
    const authResponse = await request(app).post('/auth/login').send({
      username: 'admin', // Cambia esto según tu configuración
      password: 'password', // Cambia esto según tu configuración
    });
    token = authResponse.body.token; // Asegúrate de que la respuesta contenga el token
  });

  it('Debería agregar un paciente', async () => {
    const res = await request(app)
      .post('/pacientes')
      .set('Authorization', Bearer ${token})
      .send({
        CI: uuidv4(), // Generar un CI único
        Nombre: 'Juan',
        Apellido: 'Pérez',
        FechaNacimiento: '1990-01-01',
        Sexo: 'Masculino',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('CI');
  });

  it('Debería agregar una institución', async () => {
    const res = await request(app)
      .post('/instituciones')
      .set('Authorization', Bearer ${token})
      .send({
        id: uuidv4(), // Generar un ID único
        Nombre: 'Hospital Central',
        Direccion: 'Calle Falsa 123',
        Telefono: '987654321',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  it('Debería agregar un médico', async () => {
    // Asegúrate de que la institución exista antes de agregar el médico
    const institutionId = uuidv4(); // Generar un ID único para la institución
    await request(app)
      .post('/instituciones')
      .set('Authorization', Bearer ${token})
      .send({
        id: institutionId,
        Nombre: 'Hospital Central',
        Direccion: 'Calle Falsa 123',
        Telefono: '987654321',
      });

    const res = await request(app)
      .post('/medicos')
      .set('Authorization', Bearer ${token})
      .send({
        CI: uuidv4(), // Generar un CI único
        Nombre: 'María',
        Apellido: 'Gómez',
        Especialidad: 'Pediatría',
        Telefono: '123456789',
        Institucion: {
          id: institutionId, // Usar el ID de la institución creada
          Nombre: 'Hospital Central',
        },
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('CI');
  }, 10000); // Aumentar el tiempo de espera si es necesario

  it('Debería agregar un registro médico', async () => {
    // Crear un paciente
    const patientCI = uuidv4(); // Generar un CI único para el paciente
    await request(app)
      .post('/pacientes')
      .set('Authorization', Bearer ${token})
      .send({
        CI: patientCI,
        Nombre: 'Pedro',
        Apellido: 'López',
        FechaNacimiento: '1985-05-15',
        Sexo: 'Masculino',
      });

    // Crear un médico (asegúrate de que el médico exista)
    const doctorCI = '87654321'; // Reemplaza con un CI de médico existente
    await request(app)
      .post('/medicos')
      .set('Authorization', Bearer ${token})
      .send({
        CI: doctorCI,
        Nombre: 'Dr. Juan',
        Apellido: 'Pérez',
        Especialidad: 'General',
        Telefono: '123456789',
        Institucion: 'Instituto de Salud', // Asegúrate de que esta institución exista
      });

    // Crear una institución (asegúrate de que la institución exista)
    const institutionID = '1'; // Reemplaza con un ID de institución existente
    await request(app)
      .post('/instituciones')
      .set('Authorization', Bearer ${token})
      .send({
        id: institutionID,
        Nombre: 'Hospital Central',
        Direccion: '123 Calle Falsa',
        Telefono: '987654321',
      });

    // Agregar el registro médico
    const res = await request(app)
      .post('/registros')
      .set('Authorization', Bearer ${token})
      .send({
        Fecha: '2023-10-01',
        Tipo: 'Consulta',
        Diagnostico: 'Resfriado',
        MedicoCI: doctorCI, // Usar el CI del médico creado
        InstitucionID: institutionID, // Usar el ID de la institución creada
        PacienteCI: patientCI, // Usar el CI del paciente creado
        Descripcion: 'Paciente presenta síntomas de resfriado.',
        Medicacion: 'Paracetamol',
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('Diagnostico', 'Resfriado');
  });

  it('Debería consultar el historial médico de un paciente', async () => {
    const res = await request(app).get('/historial/12345678');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('Debería obtener registros por criterio', async () => {
    const res = await request(app).get(
      '/registros?tipo=Consulta&diagnostico=Resfriado'
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('No debería permitir agregar un paciente con CI existente', async () => {
    const patientCI = uuidv4(); // Generar un CI único para el paciente

    // Crear el paciente inicialmente
    await request(app)
      .post('/pacientes')
      .set('Authorization', Bearer ${token})
      .send({
        CI: patientCI,
        Nombre: 'Juan',
        Apellido: 'Pérez',
        FechaNacimiento: '1990-01-01',
        Sexo: 'Masculino',
      });

    // Intentar crear el mismo paciente nuevamente
    const res = await request(app)
      .post('/pacientes')
      .set('Authorization', Bearer ${token})
      .send({
        CI: patientCI,
        Nombre: 'Juan',
        Apellido: 'Pérez',
        FechaNacimiento: '1990-01-01',
        Sexo: 'Masculino',
      });

    expect(res.statusCode).toEqual(401); // Debe devolver un error 401
    expect(res.text).toBe('El paciente ya existe'); // Mensaje de error esperado
  });

  it('No debería permitir agregar un médico con CI existente', async () => {
    const doctorCI = uuidv4(); // Generar un CI único para el médico

    // Crear el médico inicialmente
    await request(app)
      .post('/medicos')
      .set('Authorization', Bearer ${token})
      .send({
        CI: doctorCI,
        Nombre: 'María',
        Apellido: 'Gómez',
        Especialidad: 'Pediatría',
        Telefono: '123456789',
        Institucion: { id: '1', Nombre: 'Hospital Central' }, // Asegúrate de que esta institución exista
      });

    // Intentar crear el mismo médico nuevamente
    const res = await request(app)
      .post('/medicos')
      .set('Authorization', Bearer ${token})
      .send({
        CI: doctorCI,
        Nombre: 'María',
        Apellido: 'Gómez',
        Especialidad: 'Pediatría',
        Telefono: '123456789',
        Institucion: { id: '1', Nombre: 'Hospital Central' },
      });

    expect(res.statusCode).toEqual(401); // Debe devolver un error 401
    expect(res.text).toBe('El médico ya existe'); // Mensaje de error esperado
  });

  it('No debería permitir agregar una institución con ID existente', async () => {
    const institutionID = uuidv4(); // Generar un ID único para la institución

    // Crear la institución inicialmente
    await request(app)
      .post('/instituciones')
      .set('Authorization', Bearer ${token})
      .send({
        id: institutionID,
        Nombre: 'Hospital Central',
        Direccion: 'Calle Falsa 123',
        Telefono: '987654321',
      });

    // Intentar crear la misma institución nuevamente
    const res = await request(app)
      .post('/instituciones')
      .set('Authorization', Bearer ${token})
      .send({
        id: institutionID,
        Nombre: 'Hospital Central',
        Direccion: 'Calle Falsa 123',
        Telefono: '987654321',
      });

    expect(res.statusCode).toEqual(401); // Debe devolver un error 401
    expect(res.text).toBe('La institución ya existe'); // Mensaje de error esperado
  });

  it('Debería retornar un error al consultar el historial de un paciente inexistente', async () => {
    const res = await request(app).get('/historial/99999999'); // CI que no existe
    expect(res.statusCode).toEqual(402); // Debe devolver un error 402
    expect(res.text).toBe(
      'No existe un paciente con la cédula aportada como parámetro'
    ); // Mensaje de error esperado
  });

  it('Debería retornar un array vacío al obtener registros por criterio sin resultados', async () => {
    const res = await request(app).get(
      '/registros?tipo=Consulta&diagnostico=Inexistente'
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual([]); // Debe devolver un array vacío
  });
});