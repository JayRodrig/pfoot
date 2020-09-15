import React from 'react';
import { Route } from 'react-router-dom';

import { Header } from 'react-native-elements'

import Home from './components/Home';
import ReactNativeElementsStyles from './ReactNativeElementsStyles';

/*
  TODO:

  * Create own TeamCell component to render on FlatList✅
  * Make moving between leagues dynamic✅
  * Create state to store user picks
  * Add Firebase login
    * Add screen to log in
    * Add screen to sign up
    * Add a log out option to the hamburger icon in Header
    * Create a landing screen
    * Save user log in with React context
    * Add support for React context on existing screens
  * Now with user id, start storing user picks
    * Implement Firebase database
    * Add functions to store and delete data
    * Add functions to fetch user data
  * Start rendering user picks in Home page
  * Make things pretty
  * Deploy
  * Add tests
  * Flow type
  * Start adding features!
  *
  *
  *
  * PredictionOverlay state:
  * {
  *   predictions: {
  *     [league_id]: [teamSelected],
  *     [league_id]: [teamSelected]
  *   }
  * }
*/

function App() {
  return (
    <>
      <Header leftComponent={{ icon: 'menu', color: '#fff' }} centerComponent={{ text: 'Footy Predict' }} />
      <Route path='/' exact component={Home} />
      <ReactNativeElementsStyles />
    </>
  );
};

export default App;
