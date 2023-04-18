const { Videogame, Genre, Op } = require("../db.js");

const postVideoGame = async (req, res, next) => {
  //aca estoy recibiendo los datos del front, los guardo en la bdd y los devuelvo al front
  console.log("Recibiendo datos del front:", req.body);

  const newGame = req.body;
  const createGameBDD = await Videogame.create({
    name: newGame.name.split(" ").join("-"),
    description: newGame.description,
    platforms: newGame.platforms,
    imagen: newGame.imagen,
    releaseDate: newGame.releaseDate,
    rating: newGame.rating,
  });
  createGameBDD.addGenre(newGame.genres);
  res.send(newGame);
};
module.exports = {
  postVideoGame,
};
