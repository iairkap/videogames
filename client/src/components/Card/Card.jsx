// Este componente debe mostrar la info de cada usuario mapeado, pero ademas, debe darnos un link para ir al detalle de cada uno de ellos. Para eso, vamos a usar el componente Link de react-router-dom. Para eso, vamos a importar el componente Link de react-router-dom, y vamos a usarlo para envolver el componente Card, y le vamos a pasar como prop el atributo to, que va a ser igual a la ruta /videogame/:id, donde id va a ser igual al id del videojuego que estamos mapeando.

//este componente es un componente pretencional, es decir que no tiene logica, solo recibe props y las muestra en pantalla (dumb component)

import style from "./Card.module.css";
import { Link } from "react-router-dom";

const Card = (props) => {
  return (
    <div className={style.card}>
      <Link to="/detail/:id">
        <h2>Name:{props.name}</h2>
        <img className={style.imagen} src={props.image} alt="imagen" />
        <h4>Genres:{props.genres}</h4>
      </Link>
    </div>
  );
};

export default Card;

/* el link tiene que apuntar al detail/:id */
