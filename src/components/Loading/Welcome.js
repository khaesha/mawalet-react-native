import React from "react";
import { View, ActivityIndicator, StatusBar, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import { GoogleSignin } from "react-native-google-signin";
import googleCfg from "../../config/google";

class Welcome extends React.Component {
  constructor(props) {
    super(props);

    this._configureGoogleSignIn();
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    // Check user token here
    // do something ...
    const userInfo = await AsyncStorage.getItem("userInfo");

    this.props.navigation.navigate(userInfo ? "App" : "Auth");
    // this.props.navigation.navigate("App");
  };

  async _configureGoogleSignIn() {
    GoogleSignin.configure({
      scopes: googleCfg.scope,
      webClientId: googleCfg.webClientId,
      offlineAccess: false
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export { Welcome };
