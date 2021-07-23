import { Redirect, Route, Switch, useParams } from "react-router-dom";
import Characters from "./views/Characters";
import CharacterDetail from "./views/CharacterDetail";
import Episodes from "./views/Episodes";
import Home from "./views/Home";
import Locations from "./views/Locations";

const CharacterChild = () => <Characters page={useParams().page} />;
const CharacterDetailChild = () => <CharacterDetail id={useParams().id} />;
const LocationChild = () => <Locations  page={useParams().page}/>
export default function Routes() {
  return (
    <Switch>
      <Route path="/characters/page/:page" children={<CharacterChild />} />
      <Route
        path="/characters/detail/:id"
        children={<CharacterDetailChild />}
      />
      <Route path="/locations/page/:page" children={<LocationChild/>} />
      <Route path="/episodes" component={Episodes} />
      <Route path="/home" component={Home} />
      <Route
        exact
        path="/characters"
        render={() => {
          return <Redirect to="/characters/page/1" />;
        }}
      />
      <Route
        exact
        path="/locations"
        render={() => {
          return <Redirect to="/locations/page/1" />;
        }}
      />
      <Route
        exact
        path="/"
        render={() => {
          return <Redirect to="/home" />;
        }}
      />
    </Switch>
  );
}
