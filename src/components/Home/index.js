import React, { useState } from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import PredictionModal from '../PredictionModal';

import { SUPPORTED_LEAGUES } from '../../constants';

const PredictionButton = ({ league, styles }) => {
  const formattedLeagueName = league.split('_').join(' ');
  return(
    <Button
      title={formattedLeagueName}
      containerStyle={styles}
    />
  );
};

const Home = () => {
  const [predictions, setPredictions] = useState(undefined);
  const [visible, setVisible] = useState(false);

  const supportedLeagues = Object.keys(SUPPORTED_LEAGUES);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return(
    <View style={styles.bodyContainer}>
        <View style={styles.emptyStateTitleContainer}>
          <Text style={{ fontSize: 24, fontWeight: 400 }}>Start by making some predictions:</Text>
        </View>
        {/* <Button
          icon={
            <Icon
              name="arrow-right"
              size={15}
              color="white"
            />
          }
          iconRight
          title="Start predicting"
          onPress={toggleOverlay}
        /> */}
        {/* <PredictionModal onBackDropPress={toggleOverlay} visible={visible} /> */}
        <View style={styles.predictionButtonContainer}>
          {
            supportedLeagues.map((league, index) => (
              <PredictionButton
                key={index}
                league={league}
                styles={styles.predictionButton}
              />
            ))
          }
        </View>
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