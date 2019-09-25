const express = require("express");
const cors = require("cors");
const handle = require('express-async-handler')
const validate = require("express-validation");

const routes = express.Router();

routes.all("*", cors());

const controllers = require("./app/controllers");

//const AuthMiddleware = require("./app/middlewares/auth");

//const validators = require('./app/validators')

routes.get("/test/index", controllers.TestController.index);

routes.post("/ConsultaBoleto/index", handle(controllers.BoletoQueryController.index));
routes.post("/RegistrarBoleto/index", handle(controllers.BoletoRegisterController.index));
routes.get("/DadosEnv/index", handle(controllers.DadosEnvController.index));

routes.post("/RegistrarBoletoTeste/index", handle(controllers.BoletoRegisterTestController.index));
module.exports = routes;
