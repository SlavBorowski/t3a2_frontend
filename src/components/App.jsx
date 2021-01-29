import { Route, Switch } from "react-router-dom";

import { NavBar } from './header/NavBar'
import { ProtectedRoute } from './header/ProtectedRoute'

import { About } from "./page/About";
import { Landmarks } from "./page/Landmarks";
import { DayPlanner } from "./page/DayPlanner";
import { Profile } from "./page/Profile";
import { TripLog } from "./page/TripLog";
import { TripLogEdit } from "./page/TripLogEdit";
import { LandmarkPrivate } from "./page/LandmarkPrivate";
import { Home } from "./page/Home";
import { Banner } from "./header/Banner";
import { Login } from './page/Login';
import { SignUp } from './page/SignUp';



function App() {
  
  return (
    <div>
      <NavBar />
      <Banner />
      
      <Switch>
        <Route exact path="/about" component={About} />
        <Route exact path="/landmarks/:location" component={Landmarks} />
        <ProtectedRoute exact path="/day_planner" component={DayPlanner} />
        <ProtectedRoute exact path="/profile" component={Profile} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/sign-up" component={SignUp} />
        <ProtectedRoute exact path="/profile/trip_log" component={TripLog} />
        <ProtectedRoute exact path="/profile/trip_log/edit" component={TripLogEdit} />
        <ProtectedRoute exact path="/profile/landmarks/:id" component={LandmarkPrivate} />
        <Route exact path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
