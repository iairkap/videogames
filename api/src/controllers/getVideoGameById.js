const axios = require("axios");
const Videogame = require("../models/Videogame");
const Genre = require("../models/Genre");
const { API_KEY, URL } = process.env;

const getVideoGamesByIdApi = async (id) => {
  try {
    const response = await axios.get(`${URL}/games/${id}?key=${API_KEY}`);
    const { id, name, background_image } = response.data;
    return { id, name, imagen: background_image };
  } catch (error) {
    throw new Error("No se pudo obtener el videojuego de la API");
  }
};

const getVideoGamesByIdDatabase = async (id) => {
  const videogame = await Videogame.findByPk(id, {
    include: {
      model: Genre,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  if (!videogame) {
    throw new Error("No se pudo obtener el videojuego de la base de datos");
  }
  return videogame;
};

const getVideoGamesById = async (id, source = "api") => {
  if (source === "api") {
    return await getVideoGamesByIdApi(id);
  } else {
    return await getVideoGamesByIdDatabase(id);
  }
};

module.exports = getVideoGamesById;
