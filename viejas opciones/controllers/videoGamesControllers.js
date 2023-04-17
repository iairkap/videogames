const { Videogame, Genre, Platform } = require("../../api/src/db.js");
const axios = require("axios");
const { YOUR_API_KEY, URL } = process.env;

class VideogamesController {
  constructor() {
    this.API_URL = "https://api.rawg.io/api/games";
    this.cache = [];
  }

  async getAllVideoGames(name) {
    if (this.cache.length) {
      const dbVideogames = await Videogame.findAll({
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

      const response = [...this.cache.slice(0, 99), ...dbVideogames];
      if (name) {
        const filtered = response.filter((v) =>
          v.name.toLowerCase().includes(name.toLowerCase())
        );
        return filtered.length > 15 ? filtered.slice(0, 15) : filtered;
      }

      return response;
    }

    const dbVideogames = await Videogame.findAll({
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

    const urls = [];
    for (let i = 1; i < 6; i++) {
      urls.push(`${URL}/?key=${YOUR_API_KEY}&page=${i}`);
    }

    const promisesVg = await Promise.all(urls.map((url) => axios.get(url)));
    const apiVideogames = promisesVg.map((p) => p.data.results);
    this.cache = apiVideogames.flat().map((v) => {
      return {
        id: v.id,
        rating: v.rating,
        image: v.background_image,
        name: v.name,
        genres: v.genres.map((g) => g.name),
        platforms: v.platforms.map((p) => p.platform.name),
      };
    });

    return [...this.cache, ...dbVideogames];
  }
}

module.exports = VideogamesController;

/* const { Videogame, Genre } = require("../db.js");
const axios = require("axios");
const { YOUR_API_KEY, URL } = process.env;

class Videogames {
  constructor() {
    this.API_URL = "https://api.rawg.io/api/games";
  }

  // Función que responde con 100 videogames y los que siga en la base de datos
  async findVideoGames() {
    // Utiliza la propiedad 'findAll' de la clase Videogame importada
    const dataDB = await Videogame.findAll({
      include: {
        model: Genre,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });

    const responseDB = dataDB?.map((data) => {
      const { id, name, image, genres } = data;
      return {
        id,
        name,
        image,
        genres: genres.map((genre) => genre.name),
      };
    });

    const totalPages = Math.ceil(100 / 20); // Aquí calculamos cuántas páginas debemos obtener para llegar a 100 videojuegos
    const requests = [];

    for (let i = 1; i <= totalPages; i++) {
      requests.push(
        axios.get(`${URL}/?key=${YOUR_API_KEY}&page_size=20&page=${i}`)
      );
    }

    const videogames = await Promise.all(requests);
    const results = videogames.flatMap((response) =>
      response?.data?.results?.map((videogame) => axios.get(videogame.url))
    );
    const dataAPI = await Promise.all(results);
    const responseAPI = dataAPI.map((data) => {
      const { id, name, background_image, genres } = data?.data || {};
      return {
        id,
        name,
        image: background_image,
        genres: genres?.map((genre) => genre.name) || [],
      };
    });

    if (dataDB) {
      return [...responseDB, ...responseAPI];
    }
    return responseAPI;
  }
}

module.exports = Videogames;
 */

/* const getVideoGamesByName = async (req, res, next) => {
  const { name } = req.query;
  try {
    let respondeDB = [];

    if (cache.length) {
      const dbVideogames = await Videogame.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
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

      respondeDB = dbVideogames.map((v) => {
        const {
          id,
          name,
          description,
          released,
          rating,
          background_image,
          genres,
          platforms,
        } = v;
        return {
          id,
          name,
          description,
          released,
          rating,
          background_image,
          genres: genres.map((g) => g.name),
          platforms: platforms.map((p) => p.name),
        };
      });
    }

    const videoGames = await axios.get(
      `https://api.rawg.io/api/games?key=${YOUR_API_KEY}&search=${name}`
    );
    const responseAPI = videoGames.data.results.map((v) => {
      const {
        id,
        name,
        description,
        released,
        rating,
        background_image,
        genres,
        platforms,
      } = v;
      return {
        id,
        name,
        description,
        released,
        rating,
        background_image,
        genres: genres.map((g) => g.name),
        platforms: platforms.map((p) => p.platform.name),
      };
    });

    res.status(200).json([...respondeDB, ...responseAPI]);
  } catch (error) {
    next(error);
  }
}; */
