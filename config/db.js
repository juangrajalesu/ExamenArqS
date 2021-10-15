const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
const database = {
  init: () =>
    mongoose
      .connect('mongodb://localhost/estudiantes', {
        useNewUrlParser: true,
      })
      .then((response) => {
        console.log("conectado a la BD");
      }),
};

module.exports = database;