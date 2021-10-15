const express = require('express'); 
const app = express();
const router = require("./routes");
const database = require("./config/db");
const swaggerUi = require("swagger-ui-express")
const swaggerDocument = require("./swagger.json");


require('dotenv').config();

database.init();

app.use(express.json());
app.use(router);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(3000, () => console.log('Server Up And Running.') );