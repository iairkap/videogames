const { getVideogames } = require("../controllers/getVideogames.js");
const { getVideoGamesById } = require("../controllers/getVideoGameById.js");
const { createVideoGame } = require("../controllers/CreateVideogames.js");
const VideogamesController = require("../controllers/videoGamesControllers.js");

const videogamesController = new VideogamesController();

const getAllVideoGameHandler = async (req, res) => {
  const { name } = req.query;

  try {
    const videogames = await videogamesController.getAllVideoGames(name);
    res.send(videogames);
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports = {
  getAllVideoGameHandler,
};

/* const getVideoGameHandler = async (req, res) => {
  const { name } = req.query;
  if (name !== undefined) {
    res.send(`va a enviar el detalle del videogame ${name}`);
  } else {
    // res.send("ruta que devuelve todos los videogames");
    try {
      const videogames = await getVideogames();
      res.status(200).json(videogames);
    } catch {
      res.status(404).json({ error: "No se encontraron videojuegos" });
    }
  }
}; */

//tengp que poder darme cuenta de que ID estoy hablando
// puede que llegue aca un id de algo que no existe

const getVideoGameByIDHandler = async (req, res) => {
  const { id } = req.params;

  const source = isNaN(id) ? "bdd" : "api";

  try {
    const videogame = await getVideoGamesById(id, source);
    res.status(200).json(videogame);
  } catch {
    res.status(404).json({ error: "No se encontro el videojuego" });
  }
};

const createVideoGameHandler = async (req, res) => {
  try {
    console.log("Request body:", req.body); // Log the request body
    const { name, description, platforms, imagen, releaseDate, rating } =
      req.body;
    console.log("Creating a video game with name:", name);
    const newVideoGame = await createVideoGame(
      name,
      description,
      platforms,
      imagen,
      releaseDate,
      rating
    );
    console.log("Video game created:", newVideoGame); // Log the created video game

    res.status(201).json(newVideoGame); //el status 201 es de creado
  } catch (error) {
    //los errores toman el catch mas cercano
    res.status(400).json({ error: error.message });
  }
};

// la ejecucion de una funcion async siempre devuelve una promesa, siempre demora un tiempo, por eso se usa await, para que espere a que se resuelva la promesa, y cuando se resuelva, se ejecuta el codigo que sigue. async await esta basado en promesas

module.exports = {
  getAllVideoGameHandler,
  getVideoGameByIDHandler,
  createVideoGameHandler,
};
