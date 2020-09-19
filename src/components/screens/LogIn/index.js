import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { StyleSheet, View } from 'react-native';
import { Button, Input } from 'react-native-elements';

import firebase from '../../../firebase';
import { AuthContext } from '../../../store';

const LoginScreen = ({ history }) => {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [authUser, setAuthUser] = useContext(AuthContext);

  const handleEmailAddressChange = (e) => setEmailAddress(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleOnPress = async (e) => {
    try {
      const signUserIn = await firebase
        .auth()
        .signInWithEmailAndPassword(emailAddress, password);
      const { user: { uid: userID, l: token } } = signUserIn;
      const user = {
        emailAddress,
        token,
        userID
      };

      setAuthUser({
        user,
        loggedIn: true,
      });

      history.push('/');
    } catch (err) {
      throw new Error(err);
    };
  };

  return authUser.user ? (
    <Redirect to='/' />
  ) : (
    <View style={styles.inputContainer}>
      <Input
        label="Your Email Address"
        placeholder='email@address.com'
        leftIcon={{ type: 'font-awesome', name: 'envelope' }}
        onChange={handleEmailAddressChange}
        value={emailAddress}
      />
      <Input
        label="Your Password"
        placeholder='Password'
        leftIcon={{ type: 'font-awesome', name: 'lock' }}
        secureTextEntry
        textContentType="password"
        onChange={handlePasswordChange}
        value={password}
      />
      <Button
        containerStyle={styles.button}
        title="Log in"
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

export default LoginScreen;
