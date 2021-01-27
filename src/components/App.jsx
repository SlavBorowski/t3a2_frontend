import { Route, Switch } from "react-router-dom";

import { NavBar } from './header/NavBar'

import { About } from "./page/About";
import { Landmarks } from "./page/Landmarks";
import { Landmark } from "./page/Landmark";
import { DayPlanner } from "./page/DayPlanner";
import { Profile } from "./page/Profile";
import { TripLog } from "./page/TripLog";
import { TripLogEdit } from "./page/TripLogEdit";
import { LandmarkPrivate } from "./page/LandmarkPrivate";
import { Home } from "./page/Home";
import { Banner } from "./header/Banner";


function App() {
  
  return (
    <div>
      <NavBar />
      <Banner />
      <Switch>
        <Route exact path="/about" component={About} />
        <Route exact path="/landmarks" component={Landmarks} />
        <Route exact path="/landmarks/:id" component={Landmark} />
        <Route exact path="/day_planner" component={DayPlanner} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/profile/trip_log" component={TripLog} />
        <Route exact path="/profile/trip_log/edit" component={TripLogEdit} />
        <Route exact path="/profile/landmarks/:id" component={LandmarkPrivate} />
        <Route exact path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
