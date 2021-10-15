const express = require("express");
const router = express.Router();
const MESSAGES = require("../config/messages");
const estudiantesControllersV1 = require("../v1/controllers/estudiantesControllers");

router.get("/estudiante/:id", (req, res) => {
  const version = req.headers["accept-version"];
  if (version === "v1") {
    return estudiantesControllersV1.mostrarEstudiante(req, res);
  }
  /* if (version === "v2") {
    return estudiantesControllers.getEstudiante(req, res);
  } */
  return res.status(404).send({
    message: MESSAGES.versionError,
  });
});

router.post("estudiante/:id", (req, res) => {
  const version = req.headers["accept-version"];
  if (version === "v1") {
    return estudiantesControllersV1.subirNotas(req, res);
  }
  /* if (version === "v2") {
        return estudiantesControllers.subirNotas(req, res);
    } */
  return res.status(404).send({
    message:  MESSAGES.versionError,
  });
});

module.exports = router;