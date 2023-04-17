const { Router } = require("express");
const {
  getVideogames,
  PostVideoGame,
  getVideoGameById,
} = require("../api/src/handlers/videoGameHandlers.js");

const VGRouter = Router();

VGRouter.get("/", getVideogames);

VGRouter.post("/", PostVideoGame);

VGRouter.get("/:id", getVideoGameById);

//esta funcion llama a la funcion que obtiene los datos de la bdd y de la api
// cuando tenga los datos, responde con un json con los datos

//VGRouter.get("/:id", getVideogames);

// VGRouter.post("/", createVideoGameHandler);

module.exports = VGRouter;
