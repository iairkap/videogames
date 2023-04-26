//este componente debe tomar un array de videojuegos, y por cada uno de ellos, debe renderizar un componente Card en el home se vera el name, la imagen y el genero. En el detalle se va a ver todo incluyendo name image y genres
import Card from "../Card/Card";
import style from "./CardsContainer.module.css";
import { useSelector } from "react-redux";

//este componente es un componente smart
//gracias a redux podemos acceder al estado global y mapearlo a props,

const CardsContainer = () => {
  const filterGames = useSelector((state) => state.filter);
  return (
    <div className={style.container}>
      {filterGames.map((videogame) => {
        return (
          <Card
            key={videogame.ID}
            name={videogame.name}
            image={videogame.image}
            genres={videogame.genres}
            platforms={videogame.platforms}
            rating={videogame.rating}
            releaseDate={videogame.releaseDate}
            description={videogame.description}
          />
        );
      })}
    </div>
  );
};

export default CardsContainer;
