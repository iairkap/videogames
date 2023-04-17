const { Router } = require("express");
const { getVideoGames } = require("../../controllers/getVideoGame");
const { postVideoGame } = require("../../controllers/postVideoGame");
const { getGenres } = require("../../controllers/getGenres");

const Games = Router();

Games.get("/", getVideoGames);

Games.post("/", postVideoGame);

Games.get("/genres", getGenres);

/* 


VGRouter.post("/videogames", PostVideoGame);

VGRouter.get("/videogames/:id", getVideoGameById);

VGRouter.get("/videogames?name=", findVideoGameByName);
//esta funcion llama a la funcion que obtiene los datos de  */

//VGRouter.get("/:id", getVideogames);

// VGRouter.post("/", createVideoGameHandler);

module.exports = {
  Games,
};
