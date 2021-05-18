import logo from "./logo.svg";
import "./App.css";
import Providers from "./components/ProviderList";
import ProviderDetails from "./components/ProviderDetails";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useLocation, useState } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header>
        <h2>Your next provider Search starts here...!!</h2>
      </header>
      <Router>
        <article>
          <Route exact path="/" component={Providers} />
        </article>
        <Route exact path="/details/:id">
          <ProviderDetails />
        </Route>

        <Route path="/courses">
          <ProviderDetails />
        </Route>
      </Router>

      <footer>
        <p>We are using NPPES Read API to search providers in Unites states.</p>
      </footer>
    </div>
  );
}

export default App;
