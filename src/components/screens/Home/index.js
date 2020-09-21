import React, { useState, useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { StyleSheet, Text, View } from 'react-native';

import PredictionModal from '../../PredictionModal';
import PredictionButton from '../../PredictionButton';
import PredictionSheet from '../../PredictionSheet'
import { SUPPORTED_LEAGUES } from '../../../constants';
import { AuthContext } from '../../../store';
import apiClient from '../../../api';

const Home = ({ history }) => {
  const [league, setLeague] = useState(undefined);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [isPredictionSheetVisible, setIsPredictionSheetVisible] = useState(false);
  const [userPredictions, setUserPredictions] = useState(undefined);
  const [authUser,] = useContext(AuthContext);

  const supportedLeagues = Object.keys(SUPPORTED_LEAGUES);

  useEffect(() => {
    if (authUser) {
      apiClient.getUserPredictions(authUser)
        .then((predictions) => setUserPredictions(predictions));
    };
  }, [authUser])

  const toggleOverlay = () => setIsOverlayVisible(!isOverlayVisible);
  const togglePredictionSheet = () => setIsPredictionSheetVisible(!isPredictionSheetVisible);

  const handlePredictionButtonPress = ({ leagueID, leagueName }) => () => {
    const canMakePrediction = userPredictions && !userPredictions[leagueName];

    setLeague({ leagueID, leagueName });

    if (canMakePrediction) {
      isPredictionSheetVisible && setIsPredictionSheetVisible(!isPredictionSheetVisible);
      toggleOverlay();
    } else if (!canMakePrediction) {
      togglePredictionSheet();
    }
  }

  return authUser.user ? (
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
              userPredictions={userPredictions}
            />
          ))
        }
      </View>
      <PredictionModal
        league={league}
        onBackDropPress={toggleOverlay}
        visible={isOverlayVisible}
        userPredictions={userPredictions}
        setUserPredictions={setUserPredictions}
      />
      <PredictionSheet
        visible={isPredictionSheetVisible}
        setIsPredictionSheetVisible={setIsPredictionSheetVisible}
        team={league && userPredictions[league.leagueName]}
      />
    </View>
  ) : (
    <Redirect to='/landing' />
  )
};

const styles = StyleSheet.create({
  bodyContainer: {
    height: 'calc(100vh - 44px)',
    width: '100vw'
    // backgroundColor: 'yellow',
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
    marginTop: 10
  },

  predictionButtonContainer: {
    borderColor: 'red',
    borderWidth: 1,
  },

  userPredictionText: {
    textAlign: 'center',
    // marginHorizontal: 25,
    // padding: 10,
  },

  userPredictionTextContainer: {
    borderWidth: 1,
    borderColor: 'green',
  }
});

export default Home;
