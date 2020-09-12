import React, { useState } from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import PredictionModal from '../PredictionModal';

import { SUPPORTED_LEAGUES } from '../../constants';

// const PredictionButton = ({ leagues }) => {
//   return(

//   )
// }

const Home = () => {
  const [predictions, setPredictions] = useState(undefined);
  const [visible, setVisible] = useState(false);
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
    justifyContent: 'center'
  },
});

export default Home;
