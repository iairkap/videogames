const { Videogame, Genre, Op } = require("../db.js");
const axios = require("axios");
const { YOUR_API_KEY } = process.env;

let cache = [];

const getVideoGames = async (req, res, next) => {
  try {
    if (cache.length) {
      const dbVideogames = await Videogame.findAll({
        include: [
          {
            model: Genre,
            attributes: ["name"],
            through: { attributes: [] },
          },
        ],
      });

      const response = [...dbVideogames, ...cache.slice(0, 99)]; //aca estoy mezclando los datos de la api con los de la bdd

      return res.send(response);
    } else {
      const dbVideogames = await Videogame.findAll({
        include: [
          {
            model: Genre,
            attributes: ["name"],
            through: { attributes: [] },
          },
        ],
      });

      let urls = [];
      for (let i = 1; i < 6; i++) {
        urls.push(
          `https://api.rawg.io/api/games?key=${YOUR_API_KEY}&page=${i}`
        );
      }

      let promisesVg = await Promise.all(urls.map((url) => axios.get(url)));
      let apiVideogames = promisesVg.map((p) => p.data.results);
      cache = apiVideogames.flat().map((v) => {
        return {
          id: v.id,
          rating: v.rating,
          image: v.background_image,
          name: v.name,
          genres: v.genres.map((g) => g.name),
          platforms: v.platforms.map((p) => p.platform.name),
        };
      });
      return res.send([...dbVideogames, ...cache]); //aca estoy mezclando los datos de la api con los de la bdd
    }
  } catch (error) {
    console.error(error);
    return res.status(404).send(error);
  }
};

module.exports = {
  getVideoGames,
};
