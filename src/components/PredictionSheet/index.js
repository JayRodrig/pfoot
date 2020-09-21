import React from "react";
import { BottomSheet, Image } from "react-native-elements";
import { View, Text } from "react-native";
import { Icon } from "react-native-elements";

const PredictionSheet = ({ visible, setIsPredictionSheetVisible, team }) => {
  return visible ? (
    <View style={{ position: "fixed", bottom: 0, maxHeight: "none" }}>
      <BottomSheet isVisible={visible} animationType="slide">
        <View style={{ alignItems: "center", width: "calc(100vw - 2px)" }}>
          <Text style={{ fontSize: 24, fontWeight: 500, marginBottom: 10 }}>
            {team.name}
          </Text>
          <Image
            source={team && team.avatarUrl}
            style={{ width: 200, height: 200, marginBottom: 10 }}
          />
          <View style={{ position: "absolute", top: 0, left: 0, margin: 5 }}>
            <Icon
              name="close"
              onPress={() => setIsPredictionSheetVisible(false)}
            />
          </View>
        </View>
      </BottomSheet>
    </View>
  ) : null;
};

export default PredictionSheet;
