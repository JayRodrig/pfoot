import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";

import { AuthContext } from "../../../store";

const LandingScreen = ({ history }) => {
  const [authUser] = useContext(AuthContext);

  const handleOnLoginPress = (e) => history.push("/login");
  const handleOnSignupPress = (e) => history.push("/signup");

  return authUser.user ? (
    <Redirect to="/" />
  ) : (
    <View style={styles.buttonContainer}>
      <Button title="Log in" onPress={handleOnLoginPress} />
      <Text>OR</Text>
      <Button title="Sign up" onPress={handleOnSignupPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    height: "calc(100vh - 64px)",
    // backgroundColor: 'yellow',
    justifyContent: "center",
    paddingHorizontal: "10vw",
    textAlign: "center",
  },
});

export default LandingScreen;
