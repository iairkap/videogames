const { Videogame, Genre, Op } = require("../db.js");
const axios = require("axios");
const { YOUR_API_KEY, URL } = process.env;

let cache = [];

const getVideoGameByName = async (req, res, next) => {
  try {
    const { name } = req.query;

    const searchName = name.split("-").join("%").toLowerCase();

    const videogame = await axios.get(
      `${URL}/games?search=${searchName}&key=${YOUR_API_KEY}`
    );
    const videoGameData = videogame.data.results; //el .results es para que me traiga los resultados de la busqueda y despues tengo que hacer un array de lo que quiero mapear de la api

    const apiVideogames = videoGameData.map((v) => {
      return {
        id: v.id,
        rating: v.rating,
        image: v.background_image,
        name: v.name,
        genres: v.genres.map((g) => g.name),
        platforms: v.platforms.map((p) => p.platform.name),
      };
    });

    const searchNameBDD = name.split(" ").join("-");
    const BDDVideoGame = await Videogame.findAll({
      where: {
        name: {
          [Op.iLike]: `%${searchNameBDD}%`, //el op.ilike es para que no sea case sensitive
        },
      },
      include: [
        {
          model: Genre,
          attributes: ["name"],
          through: { attributes: [] },
        },
      ],
      limit: 15,
    });

    //tengo que hacer un map para la api para que me entregue el objeto con el id, name, description, platforms, imagen, releaseDate, rating, Genres

    const videoGameData15 = apiVideogames.slice(0, 15 - BDDVideoGame.length);
    let gamesBDDandAPI = [...BDDVideoGame, ...videoGameData15];

    if (gamesBDDandAPI) {
      return res.json(gamesBDDandAPI);
    } else {
      return res.status(404).json({
        message: "no se encontro el videojuego",
      });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  getVideoGameByName,
};

/* const { Videogame, Genre, Op } = require("../db.js");
const axios = require("axios");
const { YOUR_API_KEY, URL } = process.env;
//para que solo me tome los primeros 15 juegos tengo que hacer un slice

let cache = [];

const getVideoGameByName = async (req, res, next) => {
  const { name } = req.query;

  //console.log(name);
  const searchName = name.split("-").join("%").toLowerCase();
  //console.log(searchName); //esta linea es para separar el name con % y poder buscarlo en la apis

  const videogame = await axios.get(
    `${URL}/games?search=${searchName}&key=${YOUR_API_KEY}` //separar el name con %
  );

  const videoGameData = videogame.data;
  console.log(videoGameData);

  res.json({
    id: videoGameData.id,
    name: videoGameData.name,
    description: videoGameData.description,
    platforms: videoGameData.platforms,
    imagen: videoGameData.background_image,
    releaseDate: videoGameData.released,
    rating: videoGameData.rating,
    Genres: videoGameData.genres,
    //.map((genres) => genres.name),
  });
   const searchNameBDD = name.split(" ").join("-");
    console.log(searchNameBDD);
    const BDDVideoGame = await Videogame.findAll({
      where: {
        name: {
          [Op.iLike]: `%${searchNameLowerCase}%`,
        },
      },
      include: [
        {
          model: Genre,
          attributes: ["name"],
          through: { attributes: [] },
        },
      ],
      limit: 15,
    });

    if (BDDVideoGame) {
      return res.json(BDDVideoGame);
    } else {
      return res.status(404).json({
        message: "no se encontro el videojuego",
      });
    }

return res.status(500).json({
  message: "Error interno del servidor",
  error: error.message,
});

module.exports = {
  getVideoGameByName,
};
 */
