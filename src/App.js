import React from "react";
import { Route } from "react-router-dom";

import AppHeader from "./components/AppHeader";
import Home from "./components/screens/Home";
import LandingScreen from "./components/screens/Landing";
import LoginScreen from "./components/screens/Login";
import SignUpScreen from "./components/screens/Signup";
import ReactNativeElementsStyles from "./ReactNativeElementsStyles";

/*
  TODO:

  * Now with user id, start storing user picks
    * Implement Firebase database
    * Add functions to store and delete data
    * Add functions to fetch user data
  * Start rendering user picks in Home page
  * Make things pretty
  * Deploy
  * Add tests
  * Flow type
  * Create user profiles
  * Allow users to add friends
  * Create competition feature for groups, whoever gets more predictions right wins
  * Keep adding features!
*/

function App() {
  return (
    <>
      <AppHeader />
      <Route path="/" exact component={Home} />
      <Route path="/landing" exact component={LandingScreen} />
      <Route path="/login" exact component={LoginScreen} />
      <Route path="/signup" exact component={SignUpScreen} />
      <ReactNativeElementsStyles />
    </>
  );
}

export default App;
