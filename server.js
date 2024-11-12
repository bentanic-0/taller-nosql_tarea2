const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Paciente = require('./models/Paciente');
const RegistroMedico = require('./models/RegistroMedico');
const connectDB = require('./db'); // Adjust the path as necessary

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to the database
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

// Agregar Registro Médico
app.post('/registros', async (req, res) => {
  const {
    PacienteCI,
    Fecha,
    Tipo,
    Diagnostico,
    Medico,
    Institucion,
    Descripcion,
    Medicacion,
  } = req.body;
  const paciente = await Paciente.findOne({ CI: PacienteCI });
  if (!paciente) {
    return res
      .status(402)
      .send('No existe un paciente con la cédula aportada como parámetro');
  }
  const registroMedico = new RegistroMedico({
    Fecha,
    Tipo,
    Diagnostico,
    Medico,
    Institucion,
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
