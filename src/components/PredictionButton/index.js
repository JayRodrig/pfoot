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
  const prediction = hasPrediction && userPredictions[leagueName].name;
  return (
    <View style={styles}>
      <Button
        title={formattedLeagueName}
        onPress={onPress({ leagueID, leagueName })}
      />
      <View
        style={{
          borderWidth: 1,
          borderColor: "black",
          borderTopWidth: 0,
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            padding: 10,
            fontWeight: hasPrediction ? 600 : 200,
          }}
        >
          {hasPrediction ? prediction : "No prediction made yet"}
        </Text>
      </View>
    </View>
  );
};

export default PredictionButton;
