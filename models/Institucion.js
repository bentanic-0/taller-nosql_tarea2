const mongoose = require('mongoose');

const institucionSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },  // ID único de la institución
  Nombre: { type: String, required: true },
  Direccion: { type: String, optional: true },
  Telefono: { type: String, optional: true }
});

module.exports = mongoose.model('Institucion', institucionSchema);