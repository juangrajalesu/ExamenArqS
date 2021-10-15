const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const estudiantesSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  cedula: {
    type: String,
    required: true,
  },
  tip: {
    type: String,
    required: true,
  },
  materias: [
    {
      nombre: { type: String, required: true },
      notas: [
        {
          type: Number,
          required: true,
        },
      ],
    },
  ],
});

module.exports = mongoose.model("estudiantes", estudiantesSchema);