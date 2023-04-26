import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getVideoGameByID } from "../../redux/actions/actions";

const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const videogame = useSelector((state) => state.videogameDetail);

  useEffect(() => {
    dispatch(getVideoGameByID(id));
  }, [dispatch, id]);

  return (
    <>
      <h1>Esta es la vista de Detail</h1>
      <div>
        <h2>{videogame.name}</h2>
        <img src={videogame.image} alt={`${videogame.name} cover`} />
        <p>Genres: {videogame.genres.join(", ")}</p>
        <p>Platforms: {videogame.platforms.join(", ")}</p>
        <p>Rating: {videogame.rating}</p>
        <p>Release Date: {videogame.releaseDate}</p>
        <p>Description: {videogame.description}</p>
      </div>
    </>
  );
};

export default Detail;
