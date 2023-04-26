import axios from "axios";

export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_VIDEOGAME_BY_ID = "GET_VIDEOGAME_BY_ID";
export const FILTER_BY_SOURCE = "FILTER_BY_SOURCE";
export const GET_VIDEOGAME_BY_NAME = "GET_VIDEOGAME_BY_NAME";
export const CREATE_VIDEOGAME = "CREATE_VIDEOGAME";
export const GET_GENRES = "GET_GENRES";
export const FILTER_BY_GENRE = "FILTER_BY_GENRE";
export const ORDER_A_Z = "ORDER_A_Z";
export const ORDER_Z_A = "ORDER_Z_A";
export const CLEAR_STATE = "CLEAR_STATE";
export const UPDATE_PAGE = "UPDATE_PAGE";

export const getVideoGames = () => {
  return async function (dispatch) {
    const videoGamesData = await axios.get("http://localhost:3001/videogames");
    const videogames = videoGamesData.data;
    dispatch({ type: GET_VIDEOGAMES, payload: videogames });
  };
};

export const getVideoGameByID = (id) => {
  return async function (dispatch) {
    const videoGameByID = await axios.get(
      `http://localhost:3001/videogame/${id}`
    );
    const videogame = videoGameByID.data;
    dispatch({ type: GET_VIDEOGAME_BY_ID, payload: videogame });
  };
}; //este me sirve para el detalle

export const getVideoGameByName = (name) => {
  return async function (dispatch) {
    const encodedName = encodeURIComponent(name); // Agrega esta línea para codificar correctamente el nombre
    const videoGameByName = await axios.get(
      `http://localhost:3001/videogames/name?name=${encodedName}`
      // Reemplaza 'name' con 'encodedName'
    );
    const videogame = videoGameByName.data;
    dispatch({ type: GET_VIDEOGAME_BY_NAME, payload: videogame });
  };
};

export const createVideoGame = (body) => {
  return async function (dispatch) {
    const createdVideoGame = await axios.post(
      `http://localhost:3001/videogame`,
      body
    );
    const videogame = createdVideoGame.data;
    dispatch({ type: CREATE_VIDEOGAME, payload: videogame });
  };
};

export const getGenres = () => {
  return async function (dispatch) {
    const genresData = await axios.get("http://localhost:3001/genres");
    const genres = genresData.data;
    dispatch({ type: GET_GENRES, payload: genres });
  };
};

export const filterBySource = (id) => {
  return {
    type: FILTER_BY_SOURCE,
    payload: id,
  };
};

export const filterByGenre = (genre) => {
  return {
    type: FILTER_BY_GENRE,
    payload: genre,
  };
};

export const orderAZ = () => {
  return {
    type: ORDER_A_Z,
  };
};

export const orderZA = () => {
  return {
    type: ORDER_Z_A,
  };
};

export const clearState = () => {
  return {
    type: CLEAR_STATE,
    payload: {},
  };
};

export const updatePage = (page) => {
  return {
    type: UPDATE_PAGE,
    payload: page,
  };
};

//es una promesa porque es una funcion asincrona, y necesito que sea asincrona porque necesito que espere a que se resuelva la promesa para poder hacer el dispatch.

//en el .data se encuentra el array de objetos con los datos de los videojuegos.

//el dispatch es una funcion que se ejecuta cuando la promesa se resuelve.
