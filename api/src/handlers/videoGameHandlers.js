const { Videogame, Genre, Op } = require("../db.js");
const axios = require("axios");
const { YOUR_API_KEY } = process.env;

let cache = [];

async function findVideoGameByName(req, res) {
  const NAME = req.query.name;
  try {
    const videogame = await axios.get(
      `https://api.rawg.io/api/games?key=${YOUR_API_KEY}&search=${NAME.toLowerCase()}`
    );

    const { id, name, background_image, genres, platforms } =
      videogame.data.results[0];
    return {
      id,
      name,
      image: background_image,
      Genres: genres.map((genre) => genre.name),
      Platforms: platforms.map((platform) => platform.platform.name),
    };
  } catch {
    const videogame = await Videogame.findOne({
      where: { name: NAME.toLowerCase() },
      include: [
        {
          model: Genre,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
        {
          model: Platform,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      ],
    });

    if (!videogame) {
      throw Error("Video Game Not found");
    }

    const { id, imagen, name, genres, platforms } = videogame;
    return {
      id,
      image: imagen,
      name,
      Genres: genres.map((genre) => genre.name),
      Platforms: platforms.map((platform) => platform.name),
    };
  }
}

/* const { name, description, releaseDate, imagen, rating, Platform, Genre } =
    req.body;


  try {
    const newGame = await Videogame.create({
      name,
      description,
      releaseDate,
      rating,
      imagen,
    });
    
    let response = newGame.dataValues;
    
    return res.json({ ...response, Genre, Platform });
  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }
}; */

const getVideoGameById = async (req, res, next) => {
  const { id } = req.params;
  if (id[id.length - 1] === "B") {
    Videogame.findByPk(id.split("_")[0] * 1, {
      include: [
        {
          model: Genre,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
        {
          model: Platform,
          attributes: ["name"],
          through: { attributes: [] },
        },
      ],
    })
      .then((r) => res.send(r))
      .catch((e) => res.status(404).send(e));
  } else {
    axios
      .get(`https://api.rawg.io/api/games/${id}?key=${YOUR_API_KEY}`)
      .then((r) =>
        res.send({
          image: r.data.background_image,
          name: r.data.name,
          genres: r.data.genres.map((g) => g.name),
          platforms: r.data.platforms.map((p) => p.platform.name),
          rating: r.data.rating,
          description: r.data.description_raw,
          released: r.data.released,
        })
      )
      .catch((e) =>
        res.send({
          message: "Couldn't find videogame ):",
        })
      );
  }
};

module.exports = {
  cache,
  PostVideoGame,
  getVideoGameById,
  findVideoGameByName,
};

// handlers/videoGameHandlers.js
