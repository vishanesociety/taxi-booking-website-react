import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';

import Navbar from './components/layouts/Navbar';
import HomePageConsumer from './components/pages/HomePageConsumer'
import HomePageDriver from './components/pages/HomePageDriver';
import Login from './components/pages/Login'
import Register from './components/pages/Register';
import Home from './components/pages/Home'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NotFound from './components/pages/NotFound';
 
function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={ Home} />
        <Route exact path="/login" component={ Login} />
        <Route exact path="/register" component={ Register} />
        <Route exact path="/homePageConsumer/:id" component={ HomePageConsumer} />
        <Route exact path="/homePageDriver/:id" component={ HomePageDriver} />
        <Route  component={ NotFound} />
      </Switch>
      </Router>
    </div>
    
  );
}

export default App;
