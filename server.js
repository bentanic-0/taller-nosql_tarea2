const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Paciente = require('./models/Paciente');
const RegistroMedico = require('./models/RegistroMedico');
const Medico = require('./models/Medico'); // Asegúrate de tener este modelo
const Institucion = require('./models/Institucion'); // Asegúrate de tener este modelo
const connectDB = require('./db'); // Ajusta la ruta según sea necesario

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Conectar a la base de datos
connectDB();

// Agregar Paciente
app.post('/pacientes', async (req, res) => {
  const { CI, Nombre, Apellido, FechaNacimiento, Sexo } = req.body;

  // Validación de datos de entrada
  if (!CI || !Nombre || !Apellido || !FechaNacimiento || !Sexo) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  try {
    // Verificar si el paciente ya existe
    const pacienteExistente = await Paciente.findOne({ CI });
    if (pacienteExistente) {
      return res.status(409).json({ error: 'El paciente con ese CI ya existe' });
    }

    // Crear nuevo paciente
    const paciente = new Paciente({
      CI,
      Nombre,
      Apellido,
      FechaNacimiento,
      Sexo,
    });

    // Guardar paciente en la base de datos
    await paciente.save();

    // Responder con el paciente creado
    res.status(201).json(paciente);
  } catch (error) {
    console.error('Error al guardar el paciente:', error);
    res.status(500).json({ error: 'Hubo un error al guardar el paciente' });
  }
});



// Agregar Médico
app.post('/medicos', async (req, res) => {
  const { CI, Nombre, Apellido, Especialidad, Telefono, Institucion } = req.body;

  // Validación de campos requeridos
  if (!CI || !Nombre || !Apellido || !Especialidad || !Telefono) {
    return res.status(400).json({
      error: 'Todos los campos principales son requeridos'
    });
  }

  // Validación de campos de Institucion
  if (!Institucion || !Institucion.id || !Institucion.Nombre) {
    return res.status(400).json({
      error: 'Los campos id y Nombre de Institucion son requeridos'
    });
  }

  try {
    // Verificar si el médico ya existe
    const medicoExistente = await Medico.findOne({ CI });
    if (medicoExistente) {
      return res.status(409).json({
        error: 'El médico ya existe'
      });
    }

    // Crear nuevo médico
    const medico = new Medico({
      CI,
      Nombre,
      Apellido,
      Especialidad,
      Telefono,
      Institucion: {
        id: Institucion.id,
        Nombre: Institucion.Nombre
      }
    });

    // Guardar el nuevo médico en la base de datos
    await medico.save();

    // Responder con el médico creado
    res.status(201).json(medico);
  } catch (error) {
    console.error('Error al guardar el médico:', error);
    res.status(500).json({
      error: 'Hubo un error al guardar el médico'
    });
  }
});



// Agregar Institución
app.post('/instituciones', async (req, res) => {
  const { id, Nombre, Direccion, Telefono } = req.body;

  // Validación de campos requeridos
  if (!id || !Nombre) {
    return res.status(400).json({
      error: 'El ID y el Nombre son requeridos'
    });
  }

  try {
    // Verificar si la institución ya existe
    const institucionExistente = await Institucion.findOne({ id });
    if (institucionExistente) {
      return res.status(409).json({
        error: 'La institución ya existe'
      });
    }

    // Crear nueva institución
    const institucion = new Institucion({
      id,
      Nombre,
      Direccion,
      Telefono,
    });

    // Guardar la nueva institución en la base de datos
    await institucion.save();

    // Responder con la institución creada
    res.status(201).json(institucion);
  } catch (error) {
    console.error('Error al guardar la institución:', error);
    res.status(500).json({
      error: 'Hubo un error al guardar la institución'
    });
  }
});


// Agregar Registro Médico
app.post('/registros', async (req, res) => {
  const {
    PacienteCI,
    Fecha,
    Tipo,
    Diagnostico,
    MedicoCI,
    InstitucionID,
    Descripcion,
    Medicacion,
  } = req.body;

  // Validación de campos requeridos
  if (!PacienteCI || !Fecha || !Tipo || !Diagnostico || !MedicoCI || !InstitucionID || !Descripcion || !Medicacion) {
    return res.status(400).send('Todos los campos son requeridos');
  }

  // Validación del tipo de consulta
  const tiposValidos = ['Consulta', 'Examen', 'Internación'];
  if (!tiposValidos.includes(Tipo)) {
    return res.status(400).send('Tipo inválido. Los tipos válidos son: Consulta, Examen, Internación');
  }

  try {
    // Verificar si el paciente existe
    const paciente = await Paciente.findOne({ CI: PacienteCI });
    if (!paciente) {
      return res.status(404).send('No existe un paciente con la cédula aportada');
    }

    // Verificar si el médico existe
    const medico = await Medico.findOne({ CI: MedicoCI });
    if (!medico) {
      return res.status(404).send('No existe un médico con la cédula aportada');
    }

    // Verificar si la institución existe
    const institucion = await Institucion.findOne({ id: InstitucionID });
    if (!institucion) {
      return res.status(404).send('No existe una institución con el ID aportado');
    }

    // Crear el registro médico
    const registroMedico = new RegistroMedico({
      Fecha,
      Tipo,
      Diagnostico,
      Medico: MedicoCI, // Aquí se guarda la Cédula de Identidad del médico
      Institucion: InstitucionID, // Aquí se guarda el ID de la institución
      Descripcion,
      Medicacion,
      PacienteCI,
    });

    // Guardar el registro en la base de datos
    await registroMedico.save();

    // Responder con el registro creado
    res.status(201).send(registroMedico);
  } catch (error) {
    console.error('Error al guardar el registro médico:', error);
    res.status(500).send('Hubo un error al guardar el registro médico');
  }
});


// Consultar Historial Médico
app.get('/historial/:ci', async (req, res) => {
  const { ci } = req.params;

  // Validación de la cédula (Ejemplo: debe ser un número de 8 dígitos)
  const ciRegex = /^[0-9]{8}$/;
  if (!ciRegex.test(ci)) {
    return res
      .status(400)
      .send('La cédula proporcionada no tiene un formato válido');
  }

  try {
    // Buscar al paciente con la cédula proporcionada
    const paciente = await Paciente.findOne({ CI: ci });
    if (!paciente) {
      return res
        .status(404)
        .send('No existe un paciente con la cédula proporcionada');
    }

    // Obtener los registros médicos asociados al paciente
    const registros = await RegistroMedico.find({ PacienteCI: ci }).sort({
      Fecha: -1, // Orden descendente por fecha
    });

    // Si no hay registros, se puede enviar un mensaje indicando que no existen registros médicos
    if (registros.length === 0) {
      return res.status(404).send('No se encontraron registros médicos para este paciente');
    }

    // Devolver los registros médicos encontrados
    res.status(200).send(registros);
  } catch (error) {
    console.error('Error al consultar el historial médico:', error);
    res.status(500).send('Hubo un error al consultar el historial médico');
  }
});

// Obtener Registros por Criterio
app.get('/registros', async (req, res) => {
  const { tipo, diagnostico, medico, institucion } = req.query;
  const criterios = {};

  // Validación de parámetros de búsqueda
  if (tipo) criterios.Tipo = tipo;
  if (diagnostico) criterios.Diagnostico = diagnostico;
  if (medico) criterios.Medico = medico;
  if (institucion) criterios.Institucion = institucion;

  try {
    // Obtener registros según los criterios de búsqueda
    const registros = await RegistroMedico.find(criterios);

    // Verificar si se encontraron registros
    if (registros.length === 0) {
      return res.status(404).send('No se encontraron registros médicos con los criterios proporcionados');
    }

    // Responder con los registros encontrados
    res.status(200).send(registros);
  } catch (error) {
    // Manejo de errores
    console.error('Error al obtener los registros médicos:', error);
    res.status(500).send('Hubo un error al obtener los registros médicos');
  }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});


// Exportar la aplicación
module.exports = app;
