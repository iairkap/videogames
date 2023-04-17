const { Videogame } = require("../../api/src/db.js");

const createVideoGame = async (
  name,
  description,
  platforms,
  imagen,
  releaseDate,
  rating
) =>
  await Videogame.create({
    name,
    description,
    platforms,
    imagen,
    releaseDate,
    rating,
  }); //me devuelve una promesa

module.exports = { createVideoGame };
