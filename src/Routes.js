import { Redirect, Route, Switch, useParams } from "react-router-dom";
import Characters from "./views/Characters";
import Episodes from "./views/Episodes";
import Home from "./views/Home";
import Locations from "./views/Locations";

function CharacterChild () {
  let { page } = useParams();
  return <Characters page={page} />;
}

const Routes = () => (
  <Switch>
    <Route path="/characters/page/:page" children={<CharacterChild />} />
    <Route path="/locations" component={Locations} />
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
      path="/"
      render={() => {
        return <Redirect to="/home" />;
      }}
    />
  </Switch>
);

export default Routes;
