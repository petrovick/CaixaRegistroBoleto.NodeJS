require("dotenv").config();

const moment = require("moment");
const express = require("express");
const path = require("path");
const Youch = require("youch");
const validate = require("express-validation");
var packagejson = require('../package.json');

class App {
  constructor() {

    console.log('PORT: ' + process.env.PORT);
    console.log('ENV: ' + process.env.NODE_ENV);
    console.log('VERSION: ' + packagejson.version);

    this.express = express();
    this.isDev = process.env.NODE_ENV !== "production";
    moment.locale("pt-br");

    //this.sentry();
    this.middlewares();
    this.routes();
    this.exception();
  }

  /*  sentry() {
    Sentry.init(sentryConfig);
  }
*/
  middlewares() {
    this.express.use(express.json());

    this.express.use(function (req, res, next) {
      // Website you wish to allow to connect
      res.setHeader('Access-Control-Allow-Origin', process.env.Access_Control_Allow_Origin || '*');

      // Request methods you wish to allow
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

      // Request headers you wish to allow
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

      // Set to true if you need the website to include cookies in the requests sent
      // to the API (e.g. in case you use sessions)
      res.setHeader('Access-Control-Allow-Credentials', true);

      // Pass to next layer of middleware
      next();
    });
    //    this.express.use(Sentry.Handlers.requestHandler());
  }

  routes() {
    this.express.use(require("./routes"));
    //this.express.use(express.static(path.resolve(__dirname, "public")));
  }

  exception() {
    // The error handler must be before any other error middleware
    //    this.express.use(Sentry.Handlers.errorHandler());

    this.express.use(async (err, req, res, next) => {

      if (err instanceof validate.ValidationError) {
        return res.status(err.status).json(err);
      }
/*
      if (process.env.NODE_ENV != "production") {
        const youch = new Youch(err, req);
        return res.json(await youch.toJSON());
      }*/

      try {
        JSON.parse(str);
        return res.status(err.status || 500).json({ situacao: 500, mensagem: "Server error. " + JSON.stringify(err) });
      } catch (e) {
        return res.status(err.status || 500).json({ situacao: 500, mensagem: "Server error. " + err});
      }


    });
  }
}

module.exports = new App().express;
