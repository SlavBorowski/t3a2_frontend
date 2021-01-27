import { Route, Switch } from "react-router-dom";
import { About } from "./About";
import { Landmarks } from "./Landmarks";
import { Landmark } from "./Landmark";
import { DayPlanner } from "./DayPlanner";
import { Profile } from "./Profile";
import { TripLog } from "./TripLog";
import { TripLogEdit } from "./TripLogEdit";
import { LandmarkPrivate } from "./LandmarkPrivate";
import { Home } from "./Home";


function App() {
  
  return (
    <div>
      <Switch>
        <Route exact path="/about" component={About} />
        <Route exact path="/landmarks" component={Landmarks} />
        <Route exact path="/landmarks/:id" component={Landmark} />
        <Route exact path="/day_planner" component={DayPlanner} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/trip_log" component={TripLog} />
        <Route exact path="/trip_log/edit" component={TripLogEdit} />
        <Route exact path="/landmarks/:id/private" component={LandmarkPrivate} />
        <Route exact path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
