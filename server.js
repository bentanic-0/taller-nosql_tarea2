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
  const pacienteExistente = await Paciente.findOne({ CI });
  if (pacienteExistente) {
    return res.status(401).send('El paciente ya existe');
  }
  const paciente = new Paciente({
    CI,
    Nombre,
    Apellido,
    FechaNacimiento,
    Sexo,
  });
  await paciente.save();
  res.status(201).send(paciente);
});

// Agregar Médico
app.post('/medicos', async (req, res) => {
  const { CI, Nombre, Apellido, Especialidad, Telefono, Institucion } =
    req.body;
  const medicoExistente = await Medico.findOne({ CI });
  if (medicoExistente) {
    return res.status(401).send('El médico ya existe');
  }
  const medico = new Medico({
    CI,
    Nombre,
    Apellido,
    Especialidad,
    Telefono,
    Institucion,
  });
  await medico.save();
  res.status(201).send(medico);
});

// Agregar Institución
app.post('/instituciones', async (req, res) => {
  const { id, Nombre, Direccion, Telefono } = req.body;
  const institucionExistente = await Institucion.findOne({ id });
  if (institucionExistente) {
    return res.status(401).send('La institución ya existe');
  }
  const institucion = new Institucion({
    id,
    Nombre,
    Direccion,
    Telefono,
  });
  await institucion.save();
  res.status(201).send(institucion);
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

  const paciente = await Paciente.findOne({ CI: PacienteCI });
  if (!paciente) {
    return res
      .status(402)
      .send('No existe un paciente con la cédula aportada como parámetro');
  }

  const medico = await Medico.findOne({ CI: MedicoCI });
  if (!medico) {
    return res
      .status(403)
      .send('No existe un médico con la cédula aportada como parámetro');
  }

  const institucion = await Institucion.findOne({ id: InstitucionID });
  if (!institucion) {
    return res
      .status(404)
      .send('No existe una institución con el ID aportado como parámetro');
  }

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
  await registroMedico.save();
  res.status(201).send(registroMedico);
});

// Consultar Historial Médico
app.get('/historial/:ci', async (req, res) => {
  const { ci } = req.params;
  const paciente = await Paciente.findOne({ CI: ci });
  if (!paciente) {
    return res
      .status(402)
      .send('No existe un paciente con la cédula aportada como parámetro');
  }
  const registros = await RegistroMedico.find({ PacienteCI: ci }).sort({
    Fecha: -1,
  });
  res.send(registros);
});

// Obtener Registros por Criterio
app.get('/registros', async (req, res) => {
  const { tipo, diagnostico, medico, institucion } = req.query;
  const criterios = {};
  if (tipo) criterios.Tipo = tipo;
  if (diagnostico) criterios.Diagnostico = diagnostico;
  if (medico) criterios.Medico = medico;
  if (institucion) criterios.Institucion = institucion;

  const registros = await RegistroMedico.find(criterios);
  res.send(registros);
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// Exportar la aplicación
module.exports = app;
