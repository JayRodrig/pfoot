import React, { useState, useContext, useEffect } from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

import PredictionModal from '../../PredictionModal';
import { AuthContext } from '../../../store';

import { SUPPORTED_LEAGUES } from '../../../constants';

const PredictionButton = ({ leagueID, leagueName, onPress, styles }) => {
  const formattedLeagueName = leagueName.split('_').join(' ');
  return(
    <Button
      title={formattedLeagueName}
      containerStyle={styles}
      onPress={onPress({ leagueID, leagueName })}
    />
  );
};

const Home = () => {
  const [league, setLeague] = useState(undefined);
  const [visible, setVisible] = useState(false);
  const [authUser,] = useContext(AuthContext);

  const supportedLeagues = Object.keys(SUPPORTED_LEAGUES);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const handlePredictionButtonPress = ({ leagueID, leagueName }) => () => {
    setLeague({ leagueID, leagueName });
    toggleOverlay();
  }

  return(
    <View style={styles.bodyContainer}>
        <View style={styles.emptyStateTitleContainer}>
          <Text style={{ fontSize: 24, fontWeight: 400 }}>Start by making some predictions:</Text>
        </View>
        <View style={styles.predictionButtonContainer}>
          {
            supportedLeagues.map((leagueName, index) => (
              <PredictionButton
                key={index}
                leagueID={SUPPORTED_LEAGUES[leagueName]}
                leagueName={leagueName}
                onPress={handlePredictionButtonPress}
                styles={styles.predictionButton}
              />
            ))
          }
        </View>
        <PredictionModal league={league} onBackDropPress={toggleOverlay} visible={visible} />
      </View>
  );
};

const styles = StyleSheet.create({
  bodyContainer: {
    height: 'calc(100vh - 44px)',
    backgroundColor: 'yellow',
    // justifyContent: 'center',
    // alignItems: 'center'
  },

  emptyStateTitleContainer: {
    textAlign: 'center',
    width: '100%',
    height: '10vh',
    justifyContent: 'center',
    borderColor: 'red',
    borderWidth: 1,
  },

  predictionButton: {
    marginHorizontal: 25,
    marginVertical: 10
  },

  predictionButtonContainer: {
    borderColor: 'red',
    borderWidth: 1,
  }
});

export default Home;