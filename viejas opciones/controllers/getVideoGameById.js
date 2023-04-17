const axios = require("axios");
const Videogame = require("../api/src/models/Videogame");
const Genre = require("../api/src/models/Genre");
const { API_KEY, URL } = process.env;

const getVideoGamesById = async (id, source) => {
  let videoGame;
  if (source === "api") {
    videoGame = (await axios.get(`${URL}/games/${id}?key=${API_KEY}`)).data;
    const genres = videoGame.genres.map((genre) => ({
      id: genre.id,
      name: genre.name,
    }));
    videoGame.genres = genres;
  } else {
    videoGame = await Videogame.findByPk(id, {
      include: [{ model: Genre, through: { attributes: [] } }],
    });
  }

  return videoGame;
};
module.exports = { getVideoGamesById };

/* 
const getVideoGamesById = async (id) => {
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
}; */
