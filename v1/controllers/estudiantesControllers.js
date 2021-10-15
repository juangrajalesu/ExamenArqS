const estudiantes = require("../models/estudiantes");
const MESSAGES = require("../../config/messages");

exports.mostrarEstudiante = async (req, res) => {
  try {
    const estudiante = await estudiantes.find({ cedula: req.params.id });

    res.status(200).json({
      ok: true,
      estudiante,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      message: MESSAGES.errorShowingStudent,
      error,
    });
  }
};

exports.subirNotas = async (req, res) => {
  const body = req.body;
  if (body && body.cedula) {
    try {
      const estudiante = await estudiantes.findOne({ cedula: body.cedula });

      if (body && body.notas && body.materia) {
        if (Array.isArray(body.notas)) {
          const hayError = body.notas.some((nota) => nota < 0 || nota > 5);
          if (hayError) {
            res.status(400).json({
              ok: false,
              message: `Hay alguna nota con formato erroneo o mayor que 5 o menor que 0`,
            });
          } else {
            if (!estudiante.materias) {
              estudiante.materias = [];
            }
            const materia = estudiante.materias.findIndex(
              (materia) => materia.nombre === body.materia
            );
            if (materia !== -1) {
              estudiante.materias[materia] = notas;
            } else {
              estudiante.materias.push({
                nombre: body.materia,
                notas: body.notas,
              });
            }
            try {
              const estudianteActualizado = await estudiante.save();

              res.status(200).json({
                ok: true,
                message: "Insercion exitosa",
                estudiante: estudianteActualizado,
              });
            } catch (error) {
              res.status(500).json({
                ok: false,
                message: "Hubo un error modificando las notas del estudiante",
                error,
              });
            }
          }
        } else {
          res.status(400).json({
            ok: false,
            message: `Notas debe ser un array de numeros`,
            error,
          });
        }
      }
    } catch (error) {
      res.status(400).json({
        ok: false,
        message: `No se pudo encontrar el estudiante con cedula: ${body.cedula}`,
        error,
      });
    }
  } else {
    res.status(400).json({
      ok: false,
      message: `No se pudo encontrar el estudiante con id: ${req.params.id}`,
      error,
    });
  }
};