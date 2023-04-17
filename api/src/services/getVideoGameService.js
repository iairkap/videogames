const { Videogame, Genre, Platform, Op } = require("../db.js");
const axios = require("axios");
const { YOUR_API_KEY } = process.env;

let cache = [];

async function getVideogamesService() {
  if (cache.length) {
    const dbVideogames = await _fetchVideogamesFromDatabase();
    const response = [...cache.slice(0, 99), ...dbVideogames];
    return response;
  } else {
    const dbVideogames = await _fetchVideogamesFromDatabase();
    cache = await _fetchVideogamesFromAPI();
    return [...cache, ...dbVideogames];
  }
}

async function _fetchVideogamesFromDatabase() {
  return Videogame.findAll({
    include: [
      {
        model: Genre,
        attributes: ["name"],
        through: { attributes: [] },
      },
      {
        model: Platform,
        attributes: ["name"],
        through: { attributes: [] },
      },
    ],
  });
}

async function _fetchVideogamesFromAPI() {
  const urls = Array.from(
    { length: 5 },
    (_, i) => `https://api.rawg.io/api/games?key=${YOUR_API_KEY}&page=${i + 1}`
  );

  const promisesVg = await Promise.all(urls.map((url) => axios.get(url)));
  const apiVideogames = promisesVg.map((p) => p.data.results).flat();

  return apiVideogames.map((v) => ({
    id: v.id,
    rating: v.rating,
    image: v.background_image,
    name: v.name,
    genres: v.genres.map((g) => g.name),
    platforms: v.platforms.map((p) => p.platform.name),
  }));
}

module.exports = {
  getVideogamesService,
  cache,
};
