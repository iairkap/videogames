import {
  GET_VIDEOGAMES,
  GET_VIDEOGAME_BY_ID,
  GET_VIDEOGAME_BY_NAME,
  FILTER_BY_SOURCE,
  GET_GENRES,
  FILTER_BY_GENRE,
  ORDER_A_Z,
  ORDER_Z_A,
  UPDATE_PAGE,
} from "../actions/actions";

//todo esta en el backend localhost:3001

//el estado global es un objeto que va a tener todos los estados de la aplicacion, el unico autorizado a realizar cambios en el estado global es el reducer y el reducer es una funcion pura que recibe el estado y la accion y devuelve el nuevo estado.

//el type es el nombre de la accion que se va a realizar, el type es un string que se va a comparar con un case en el reducer para saber que accion se va a realizar
//el payload es el valor que se va a cambiar en el estado

const initialState = {
  videogames: [],
  genres: [],
  videogameDetail: {},
  videogame: [],
  allNames: [],
  currentPage: 1,
  perPage: 15,
  filter: [],
  searchResults: [],
  /*   selectedFilters: {
    genres: [],
  }, */
};

//el filter tambien me va a almacenar todos los videogames, pero me sirve tenerlo separado para poder filtrarlos sin perder los datos originales, en caso de ordenar tambien lo ordeno desde filtros, porque si tengo un genero asignado, me va a permitir ordenarlo con ese genero asignado.

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
        filter: action.payload,
      };
    case GET_VIDEOGAME_BY_ID:
      return {
        ...state,
        videogameDetail: action.payload,
      };
    case GET_VIDEOGAME_BY_NAME:
      return {
        ...state,
        searchResults: action.payload,
        currentPage: 1,
      };

    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };

    case FILTER_BY_GENRE:
      return {
        ...state,
        filter: state.videogames.filter((videogame) =>
          videogame.genres.includes(action.payload)
        ),
      };

    case FILTER_BY_SOURCE:
      if (action.payload === "api") {
        return {
          ...state,
          filter: state.videogames.filter(
            (videogame) => typeof videogame.id === "number"
          ),
        };
      }
      if (action.payload === "db") {
        return {
          ...state,
          filter: state.videogames.filter(
            (videogame) => typeof videogame.id === "string"
          ),
        };
      }
      break;

    case ORDER_A_Z:
      return {
        ...state,
        filter: [...state.filter].sort((a, b) => {
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return 1;
          } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return -1;
          } else {
            return 0;
          }
        }),
        currentPage: 1,
      };

    case ORDER_Z_A:
      return {
        ...state,
        filter: [...state.filter].sort((a, b) => {
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
          } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
          } else {
            return 0;
          }
        }),
        currentPage: 1,
      };

    case UPDATE_PAGE:
      return {
        ...state,
        currentPage:
          action.payload >= 0 &&
          action.payload <=
            Math.ceil(state.videogames.length / state.perPage) - 1
            ? action.payload
            : state.currentPage,
      };

    /*   return {
        ...state,
        currentPage: action.payload,
      }; */ // esta funcion me sirve para el paginado de la pagina, me va a actualizar la pagina actual en el estado global, y en el componente voy a tener que hacer un dispatch de esta funcion para que se actualice el estado global y se renderice la pagina con los nuevos datos.

    default:
      return { ...state };
  }
};

export default rootReducer;
