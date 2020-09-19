import React, { useState } from 'react';

import { StyleSheet, View } from 'react-native';
import { Button, Input } from 'react-native-elements';

import firebase from '../../firebase';

// global variables
const db = firebase.firestore();

const SignUpScreen = () => {
  const [username, setUsername] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailAddressChange = (e) => setEmailAddress(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleOnPress = async (e) => {
    try {
      const createFirebaseUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(emailAddress, password);
      const { l: token, uid: userID } = createFirebaseUser.user;
      const user = {
        userID,
        username,
        emailAddress,
        token,
      };

      const addUserToDB = await db.collection("users").add(user);
    } catch (err) {
      throw new Error(err);
    };
  };

  return(
    <View style={styles.inputContainer}>
      <Input
        label="Your username"
        placeholder='username'
        leftIcon={{ type: 'font-awesome', name: 'at' }}
        onChange={handleUsernameChange}
        value={username}
      />
      <Input
        label="Your email address"
        placeholder='email@address.com'
        leftIcon={{ type: 'font-awesome', name: 'envelope' }}
        onChange={handleEmailAddressChange}
        value={emailAddress}
      />
      <Input
        label="Your password"
        placeholder='Password'
        leftIcon={{ type: 'font-awesome', name: 'lock' }}
        secureTextEntry
        textContentType="password"
        onChange={handlePasswordChange}
        value={password}
      />
      <Button
        containerStyle={styles.button}
        title="Sign up"
        onPress={handleOnPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    height: 'calc(100vh - 44px)',
    backgroundColor: 'yellow',
    justifyContent: 'center',
    paddingHorizontal: '10vw'
  },

  button: {
    marginVertical: '5vh'
  }
});

export default SignUpScreen;
