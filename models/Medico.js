const mongoose = require('mongoose');

const medicoSchema = new mongoose.Schema({
  CI: { type: String, required: true, unique: true },
  Nombre: { type: String, required: true },
  Apellido: { type: String, required: true },
  Especialidad: { type: String, required: true },
  Telefono: { type: String, required: true },
  Institucion: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'Institucion', required: true },
    Nombre: { type: String, required: true }
  }
});


module.exports = mongoose.model('Medico', medicoSchema);
