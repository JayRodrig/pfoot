import React from "react";
import { Button } from "react-native-elements";
import { Text, View } from "react-native";

const PredictionButton = ({
  leagueID,
  leagueName,
  onPress,
  styles,
  userPredictions,
  hasPrediction,
}) => {
  const formattedLeagueName = leagueName.split("_").join(" ");
  return (
    <>
      <Button
        title={formattedLeagueName}
        containerStyle={styles}
        onPress={onPress({ leagueID, leagueName })}
      />
      {hasPrediction ? (
        <View
          style={{
            borderWidth: 1,
            borderColor: "black",
            marginHorizontal: 25,
            borderTopWidth: 0,
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              padding: 10,
            }}
          >
            {userPredictions[leagueName].name}
          </Text>
        </View>
      ) : null}
    </>
  );
};

export default PredictionButton;
