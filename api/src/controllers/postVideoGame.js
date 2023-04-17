const { Videogame, Genre, Op } = require("../db.js");

const postVideoGame = async (req, res, next) => {
  const newGame = req.body;
  const createGameBDD = Videogame.create({
    name: newGame.name,
    description: newGame.description,
    platforms: newGame.platforms,
    imagen: newGame.imagen,
    releaseDate: newGame.releaseDate,
    rating: newGame.rating,
  });
  createGameBDD.addGenre(newGame.genres);
  return newGame;
};

module.exports = {
  postVideoGame,
};

/* try {
    const videogame = await axios.get(
        `$https://api.rawg.io/api/games?key=${YOUR_API_KEY}&search=${name.toLowerCase()}}`
        );
        const { id, name, genres } = videogame.data;
        return {
            id,
            name,
            Genres: genres.map((genres) => genres.type.name),
        };
    } catch {
        const videogame = await Videogame.findOne({
            where: { name: name.toLowerCase() },
            include: {
                model: Genre,
                attributes: ["name"],
                through: {
                    attributes: [],
                },
            },
        }); */
/* if (!videogame) {
            throw Error("No se encontro el juego");
        }
        const { id, Genres } = videogame;
        const nameBD = videogame.name;
        return {
            id,
            name: nameBD,
            Genres: Genres.map((genre) => genre.name),
        };
        } */
