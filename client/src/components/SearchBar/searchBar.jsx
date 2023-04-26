import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideoGameByName } from "../../redux/actions/actions";
import Card from "../Card/Card";

function SearchBar() {
  const dispatch = useDispatch();
  const [searchVideoGame, setSearchVideoGame] = useState("");
  const [openResults, setOpenResults] = useState(false); // para que se abra la lista de resultados
  const [buttonDisabled, setButtonDisabled] = useState(true); // para que el boton de buscar esté deshabilitado
  const videogames = useSelector((state) => state.searchResults);

  function handleInput(event) {
    if (event.target.value) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
    setSearchVideoGame(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (searchVideoGame.trim() === "") {
      alert("Por favor, introduce un nombre de videojuego");
    } else {
      console.log("Buscando:", searchVideoGame);
      dispatch(getVideoGameByName(searchVideoGame));
      setOpenResults(true);
    }
  }

  return (
    <div className="searchbar-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Buscar videojuego por nombre..."
          value={searchVideoGame}
          onChange={handleInput}
        />
        <button type="submit" disabled={buttonDisabled}>
          Buscar
        </button>
      </form>
      {openResults && (
        <div className="results-container">
          {videogames.length > 0 ? (
            videogames.map((videogame) => (
              <Card
                key={videogame.id}
                id={videogame.id}
                name={videogame.name}
                image={videogame.image}
                genres={videogame.genres}
              />
            ))
          ) : (
            <p>No se encontraron resultados</p>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
