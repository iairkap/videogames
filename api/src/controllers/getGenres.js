const { Genre } = require("../db.js");
const axios = require("axios");
const { YOUR_API_KEY } = process.env;

const URL = `https://api.rawg.io/api/genres?key=${YOUR_API_KEY}`;

const getGenres = async (req, res, next) => {
  try {
    const genresBD = await Genre.findAll();
    if (genresBD.length === 0) {
      const data = await axios.get(URL);
      const genres = data.data.results.map((genre) => {
        return { name: genre.name };
      });
      const newGenres = await Genre.bulkCreate(genres);
      res.json(newGenres);
    }
    res.json(genresBD);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { getGenres };
