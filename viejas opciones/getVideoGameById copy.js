const axios = require("axios");
const { API_KEY, URL } = process.env;

const getVideoGamesById = async (req, res) => {
  const params = req.params;
  const id = params.id;
  try {
    const response = await axios.get(`${URL}/games/${id}?key=${API_KEY}`);
    const { id, name, background_image } = response.data;
    res.json({ id, name, imagen: background_image });
  } catch (error) {
    res.status(500).json({ error: "No se pudo obtener el videojuego" });
  }
};

module.exports = getVideoGamesById;
