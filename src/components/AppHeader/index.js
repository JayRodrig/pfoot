import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Header } from "react-native-elements";

import { AuthContext } from "../../store";
import firebase from "../../firebase";

const AppHeader = () => {
  const [authUser, setAuthUser] = useContext(AuthContext);
  const { user, loggedIn } = authUser;

  const handleOnLogOutPress = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        setAuthUser({
          user: null,
          loggedIn: false,
        });
      })
      .catch(function (err) {
        throw new Error(err);
      });
  };

  return (
    <Header
      leftComponent={
        user &&
        loggedIn && { icon: "bars", color: "#fff", type: "font-awesome" }
      }
      centerComponent={{
        text: "Sport Predict",
        style: { fontSize: 32, fontWeight: 500 },
      }}
      rightComponent={
        user &&
        loggedIn && {
          icon: "sign-out",
          color: "#fff",
          type: "font-awesome",
          onPress: handleOnLogOutPress,
        }
      }
      containerStyle={{ height: 64 }}
    />
  );
};

export default AppHeader;
