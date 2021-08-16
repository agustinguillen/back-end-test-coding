import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './pages/Home';
import Graphics from './pages/Graphics';
import NavBar from './components/NavBar';

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/graphics" component={Graphics} />
          <Route component={Error} />
        </Switch>
    </Router>
    </>
  );
}

export default App;
