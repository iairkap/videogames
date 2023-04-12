const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");

require("./db.js");

const server = express();

server.name = "API"; //aca le ponemos el nombre al servidor

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" })); //urlencoded es middleware que nos permite leer el body de las peticiones que nos envia el cliente y el limite es para que no se rompa cuando se envia una imagen
server.use(bodyParser.json({ limit: "50mb" })); //bodyParser es middleware que nos permite leer el body de las peticiones que nos envia el cliente y el limite es para que no se rompa cuando se envia una imagen
server.use(cookieParser()); //cookieParser es middleware que nos permite leer las cookies que nos envia el cliente
server.use(morgan("dev")); //morgan es middleware que nos permite ver por consola las peticiones que se hacen al servidor
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next(); //next es un metodo que nos permite seguir con la ejecucion del codigo
});

server.use("/", routes);

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
