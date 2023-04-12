const axios = require("axios");
const Videogame = require("../models/Videogame");
const Genre = require("../models/Genre");
const { API_KEY, URL } = process.env;

/*   GET | /videogames
Obtiene un arreglo de objetos, donde cada objeto es un videojuego con su información. 
hay que hacer la peticion en la base de datos y tambien los de la api. 
tienen que ser los primeros 100 videojuegos de la api, y los que esten en la base de datos.
⚠️ IMPORTANTE: se deben mostrar tanto los videojuegos traidos desde la API como así también los de la base de datos, pero NO está permitido almacenar en la base de datos los videojuegos de la API. Solamente se pueden guardar aquellos creados desde el form.
*/

//TODO: GET /videogames:
const getVideogames = async (req, res) => {
  //TODO: Obtener un listado de los primeros 100 videojuegos de la base de datos
  //TODO: hacer una comprobacion si hay algo en la base de datos, si no hay nada retornar los 100 primeros de la api, si hay algo en la base de datos, retornar los 100 primeros de la api y los que esten en la base de datos.
  //TODO: hacer un merge de los dos arreglos, y retornarlos, esto se hace con el spread operator.
  const dbVideogames = await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ["name"],
      through: {
        //el through es para que no me devuelva los atributos de la tabla intermedia, sino solo los de la tabla que estoy buscando.
        attributes: [],
      },
    },
  });
  const fetchGamesFromApi = async (page) => {
    const response = await axios.get(
      `${URL}/games?key=${API_KEY}&page=${page}&page_size=40`
    );
    return response.data.results.map((videogame) => {
      return {
        id: videogame.id,
        name: videogame.name,
        image: videogame.background_image,
        genres: videogame.genres.map((genre) => genre.name),
        rating: videogame.rating,
        released: videogame.released,
      };
    });
  };

  const apiVideogamesArray = [];
  const totalPages = 3;

  for (let page = 1; page <= totalPages; page++) {
    const videogames = await fetchGamesFromApi(page);
    apiVideogamesArray.push(...videogames);
  }

  const first100ApiVideogames = apiVideogamesArray.slice(0, 100);
  const mergedVideogames = [...dbVideogames, ...first100ApiVideogames];

  res.status(200).json(mergedVideogames);
};

module.exports = { getVideogames };
