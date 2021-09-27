import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Container } from "reactstrap";
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

import NavBar from "./components/NavBar";
import LogBook from "./views/LogBook";

import './App.css';

const history = createBrowserHistory();

const Home = () => {
  return <div>Home</div>
}
const Launches = () => { return <div /> }
const Launch = () => { return <div /> }
const NotFound = () => { return <div /> }
const Footer = () => { return <div /> }




function App() {
  return (
    <Router history={history}>
        <div id="app" className="d-flex flex-column h-100">

          <NavBar />
          <Container className="flex-grow-1 mt-5" fluid={true}>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/logbook/" exact component={LogBook} />
              <Route path="/launches/" exact component={Launches} />
              <Route
                path="/launch/:slug"
                strict
                sensitive
                render={({ match }) => {
                  return match ? <Launch /> : <NotFound />;
                }}
              />
            </Switch>
          </Container>
          <Footer />
        </div>
      </Router>
  );
}

export default App;
