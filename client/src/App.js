import { Home, Landing, Form, Detail } from "./views";
import { Route, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";

// la navbar la quiero ver en todas las views menos en la landing
function App() {
  const location = useLocation();
  console.log(location);

  return (
    <div className="App">
      {location.pathname !== "/" && <NavBar />}
      <Route
        exact
        path="/"
        render={() => {
          return <Landing />;
        }}
      />
      <Route
        exact
        path="/home"
        render={() => {
          return <Home />;
        }}
      />

      <Route
        exact
        path="/detail/:id"
        render={() => {
          return <Detail />;
        }}
      />

      <Route
        path="/create"
        render={() => {
          return <Form />;
        }}
      />
    </div>
  );
}

export default App;
//hay distintas maneras de renderizar las rutas, una con la arrow function y otra con path  para pasarles prop al render puede poner unaProp = {algo} y luego en el componente que se renderiza se puede acceder a esa prop con this.props.algo
