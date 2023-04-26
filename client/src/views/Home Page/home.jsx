import CardsContainer from "../../components/CardsContainer/CardsContainer";
import Page from "../../components/Pagination /pagination";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getVideoGames } from "../../redux/actions/actions";
//home contiene a card container, y home le pide al estado global (al store de redux) y que haga un cambio en el estado globa, card container es el unico interesado en lo que hay en el estado global

const Home = () => {
  //1.cuando se monta useEffect() 2.que haga el dispatch useDispatch()

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getVideoGames());
  }, []); //no olvidarse del array de dependencias que sirve para que no se ejecute infinitamente.

  return (
    <>
      <h1>Esta es la vista de home</h1>
      <Page />
    </>
  );
};

export default Home;
