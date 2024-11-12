const mongoose = require('mongoose');

const medicoSchema = new mongoose.Schema({
  CI: { type: String, required: true, unique: true }, // Cédula de Identidad
  Nombre: { type: String, required: true },
  Apellido: { type: String, required: true },
  Especialidad: { type: String, required: true },
  Telefono: { type: String, optional: true },
  Institucion: {
    id: { type: String, required: true }, // ID de la institución
    Nombre: { type: String, required: true },
  },
});

module.exports = mongoose.model('Medico', medicoSchema);
