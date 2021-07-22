import { Redirect, Route, Switch } from "react-router-dom";
import Characters from "./views/Characters";
import Episodes from "./views/Episodes";
import Home from "./views/Home";
import Locations from "./views/Locations";

const Routes = () => (
  <Switch>
    <Route path="/characters" component={Characters} />
    <Route path="/locations" component={Locations} />
    <Route path="/episodes" component={Episodes} />
    <Route path="/home" component={Home} />
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
