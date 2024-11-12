const mongoose = require('mongoose');

const pacienteSchema = new mongoose.Schema({
  CI: { type: String, required: true, unique: true },
  Nombre: { type: String, required: true },
  Apellido: { type: String, required: true },
  FechaNacimiento: { type: Date, required: true },
  Sexo: { type: String, required: true }
});

module.exports = mongoose.model('Paciente', pacienteSchema);