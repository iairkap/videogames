const axios = require("axios");
const Videogame = require("../models/Videogame");
const Genre = require("../models/Genre");
const { API_KEY, URL } = process.env;

const getVideoGamesByIdApi = async (id) => {
  try {
    const responseApi = await axios.get(`${URL}/games/${id}?key=${API_KEY}`);
    const { id, name, background_image } = response.data;
    return { id, name, imagen: background_image };
  } catch {
    //si esto no se encuenrta, pasar directamente a la base de datos
    const responseDb = await getVideoGamesByIdDatabase(id);
    if (!responseDb) throw new Error("No se pudo obtener el videojuego");
    const { id, name, imagen } = responseDb;
    return { id, name, imagen };
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
    throw new Error("No se pudo obtener el videojuego");
  }
  return videogame;
};

module.exports = getVideoGamesById;
