import "./App.css";
import { Personaje } from "./components/Personaje.js";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/personajes">
            <Personaje />
          </Route>
          <Redirect to="/personajes" />
        </Switch>
      </Router>
    </>
  );
}

export default App;
