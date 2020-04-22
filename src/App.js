import React from "react";
import { Route } from "react-router-dom";
import TopNav from "./Components/Nav/TopNav";
import Nav from "./Components/Nav/Nav";
import Login from "./Components/Login-SignUp/Login";
import SignUp from "./Components/Login-SignUp/SignUp";
import Dashboard from "./Components/Dashboards/Dashboard";
import ProfilePage from "./Components/Profile-Pages/Profile-Pages";
import LandingPage from "./Components/Landing-Page/Landing-Page";
import ProtectedRoute from "./Utils/ProtectedRoute";
import RideFind from "./Components/Rides/RideFind/RideFind";
import SavedRides from './Components/Rides/SavedRide/SavedRide'

import "./App.scss";

//TODO: update app to include loader if isLoading

function App() {
    return (
        <div className="App" role="App">
            <TopNav />
            <div className="container">
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={SignUp} />
                <ProtectedRoute
                    exact
                    path="/profilepage"
                    component={ProfilePage}
                />
                <Route exact path='/saved' component={SavedRides} />
                <ProtectedRoute exact path="/dashboard" component={Dashboard} />
                <Route exact path="/" component={LandingPage} />
                <ProtectedRoute exact path="/Home" component={RideFind} />
            </div>
            <Nav />
        </div>
    );
}
export default App;
