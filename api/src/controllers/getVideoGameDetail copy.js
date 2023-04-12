const axios = require("axios");
const { Videogame } = require("../models/Videogame.js");
const { Genre } = require("../models/Genre.js");
const { API_KEY, URL } = process.env;

const getVideoGameDetail = async (req, res) => {
  const { id } = req.params;

  try {
    const videogame = await Videogame.findOne({
      where: {
        id: id,
      },
      include: Genre,
    });

    if (videogame) {
      res.json(videogame);
    } else {
      const response = await axios.get(`${URL}/games/${id}?key=${API_KEY}`);
      const {
        id,
        name,
        background_image,
        description,
        released,
        rating,
        genres,
      } = response.data;
      const genresArray = genres.map((genre) => {
        // esto me sirve para que me guarde los generos en un arreglo, ya que en la api me los devuelve en un objeto, y asi poder guardarlos en la base de datos, necesito que sea un array porque son varias relaciones.
        return {
          id: genre.id,
          name: genre.name,
        };
      });
      res.json({
        id,
        name,
        imagen: background_image,
        description,
        released,
        rating,
        genres: genresArray,
      });
    }
  } catch (error) {
    res.status(500).json({ error: "No se pudo obtener el videojuego" });
  }
};

module.exports = {
  getVideoGameDetail,
};
