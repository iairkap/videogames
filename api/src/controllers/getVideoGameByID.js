const { Videogame, Genre, Op } = require("../db.js");
const axios = require("axios");
const { YOUR_API_KEY, URL } = process.env;

// https://api.rawg.io/api/games/123?key=09773f0a173c4215a82ad1421505ef4c

//! 1. Buscar por ID en la API
//! 2. Si no existe en la api buscar por la BDD
//! 3. Si no existe en la BDD, devolver un error

const getVideoGameByID = async (req, res, next) => {
  const { id } = req.params;

  try {
    try {
      const videogame = await axios.get(
        `${URL}/games/${id}?key=${YOUR_API_KEY}`
      );
      const videoGameData = videogame.data;

      return res.json({
        id: videoGameData.id,
        name: videoGameData.name,
        description: videoGameData.description,
        platforms: videoGameData.platforms,
        imagen: videoGameData.background_image,
        releaseDate: videoGameData.released,
        rating: videoGameData.rating,
        Genres: videoGameData.genres.map((genres) => genres.name),
      });
    } catch (apiError) {
      if (apiError.response && apiError.response.status === 404) {
        const BDDVideoGame = await Videogame.findByPk(id, {
          include: [
            {
              model: Genre,
              attributes: ["name"],
              through: { attributes: [] },
            },
          ],
        });

        if (BDDVideoGame) {
          return res.json(BDDVideoGame);
        } else {
          return res.status(404).json({
            message: "no se encontro el videojuego",
          });
        }
      } else {
        return res.status(500).json({
          message: "Error interno del servidor",
          error: apiError.message,
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};

module.exports = {
  getVideoGameByID,
};
