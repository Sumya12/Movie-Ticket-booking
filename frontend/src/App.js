import "./App.css";
import Homepage from "./components/pages/Homepage";
import MoviePage from "./components/pages/MoviePage";
// import { HallForm } from './components/HallForm';
import { Route } from "react-router-dom";
import Moviebooking from "./components/pages/Moviebooking";
import SeatsBooked from "./components/pages/SeatsBooked";
import UserProfile from "./components/UserProfile";
import Error404 from "./components/pages/Error404";
import { BrowserRouter as Router, Switch } from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" component={Homepage} exact />

          <Route path="/movies" component={MoviePage} />

          <Route path="/seat" component={Moviebooking} />

          <Route path="/booked" component={SeatsBooked} />

          <Route path="/profile" component={UserProfile} />

          <Route path="*" component={Error404} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
