const mongoose = require('mongoose');

const registroMedicoSchema = new mongoose.Schema({
  Fecha: { type: Date, required: true },
  Tipo: {
    type: String,
    enum: ['Consulta', 'Examen', 'Internación'],
    required: true,
  },
  Diagnostico: { type: String, required: true },
  Medico: { type: String, required: true },
  Institucion: { type: String, required: true },
  PacienteCI: { type: String, required: true },
  Descripcion: { type: String, required: true },
  Medicacion: { type: String, required: true },
});


module.exports = mongoose.model('RegistroMedico', registroMedicoSchema);
