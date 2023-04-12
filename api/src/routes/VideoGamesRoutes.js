const { Router } = require("express");
const { Videogame } = require("../db.js");
const { getVideogames } = require("../controllers/getVideogames.js");

const videoGamesRoutes = Router();

videoGamesRoutes.get("/", async (req, res) => {
  try {
    await getVideogames(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving videogames");
  }
});

module.exports = videoGamesRoutes;
