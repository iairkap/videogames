//redux nos va a facilitar un estado global

import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "../reducer/reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // esto es para que funcione el devtools de redux

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);
// el thunkMiddleware es un middleware que nos va a permitir hacer peticiones asincronas, las request que se hacen al backend
export default store;
