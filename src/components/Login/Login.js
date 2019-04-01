import React, { Component } from "react";
import { View, KeyboardAvoidingView, Keyboard, StyleSheet } from "react-native";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes
} from "react-native-google-signin";
// import type { User } from "react-native-google-signin";
import Toast from "react-native-root-toast";
import AsyncStorage from "@react-native-community/async-storage";

import { UIInput } from "../../ui/input";
import { UIButton } from "../../ui/button";

// import googleCfg from "../../config/google";
import mawalet from "../../apis/mawalet";

// type ErrorWithCode = Error & { code?: string };

// type State = {
//   error: ?ErrorWithCode,
//   userInfo: ?User
// };

// class Login extends Component<{}, State> {
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSigninInProgress: false,
      userInfo: null,
      error: null,
      form: {
        email: "monah@test.com",
        password: "123458"
      }
    };
  }

  async componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide
    );

    // this._configureGoogleSignIn();
    this._getCurrentUser();
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  async _getCurrentUser() {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      // console.log("[Login][_getCurrentUser] userInfo", userInfo);
      await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));

      // redirect to dashboard
      this.props.navigation.navigate("App");

      this.setState({ userInfo, error: null });
    } catch (error) {
      const errorMessage =
        error.code === statusCodes.SIGN_IN_REQUIRED
          ? "Please sign in :)"
          : error.message;

      toastNotif(errorMessage);

      this.setState({
        error: new Error(errorMessage)
      });
    }
    // console.log("[Login][_getCurrentUser] error", this.state.error);
  }

  onGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true
      });
      const userInfo = await GoogleSignin.signIn();
      // console.log("[Login][onGoogleSignIn] userInfo", userInfo);
      await AsyncStorage.setItem("type", "google");
      await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));

      this.props.navigation.navigate("App");

      this.setState({ userInfo, error: null });
    } catch (error) {
      let message;
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        message = `${error.code} - Sign in cancelled`;
      } else if (error.code === statusCodes.IN_PROGRESS) {
        message = `${error.code} - Operation in progress`;
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        message = `${error.code} - Play Service not available or outdated`;
      } else {
        message = `Something went wrong ${error.toString()}`;
      }

      toastNotif(message);

      this.setState({ error });
    }
    // console.log("[Login][onGoogleSignIn] error", this.state.error);
  };

  onSignIn = async () => {
    try {
      const response = await mawalet.post("/auth/login", this.state.form);
      // console.log("[Login][onSignIn] response", response);

      if (response.data.status === 200) {
        await AsyncStorage.setItem("type", "general");
        await AsyncStorage.setItem(
          "userInfo",
          JSON.stringify(response.data.data)
        );

        this.setState({ userInfo: response.data.data });
      } else {
        this.setState({ error: response.data });
        toastNotif(response.data.message);
      }
    } catch (error) {
      this.setState({ error });
      // console.log("[Login][onSignIn] error", error);
      toastNotif(`${error.toString()} - Something went wrong`);
    }
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.loginView}>
          <View style={styles.loginInput}>
            <UIInput
              placeholder="Email"
              leftIcon={{ type: "font-awesome", name: "envelope", size: 15 }}
              keyboardType="email-address"
              onChangeText={email => {
                const form = { ...this.state.form, email: email };
                this.setState({ form });
              }}
              value={this.state.form.email}
              inputContainerStyle={styles.inputContainerStyle}
            />
            <UIInput
              placeholder="Password"
              leftIcon={{ type: "font-awesome", name: "lock", size: 25 }}
              keyboardType="default"
              secureTextEntry={true}
              onChangeText={password => {
                const form = { ...this.state.form, password: password };
                this.setState({ form });
              }}
              value={this.state.form.password}
              inputContainerStyle={styles.inputContainerStyle}
            />
          </View>

          <UIButton
            title="Sign in"
            containerStyle={styles.generalButton}
            onPress={this.onSignIn}
          />
          <GoogleSigninButton
            style={styles.googleButton}
            color={GoogleSigninButton.Color.Light}
            size={GoogleSigninButton.Size.Wide}
            onPress={this.onGoogleSignIn}
            disabled={this.state.isSigninInProgress}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  loginView: {
    marginTop: 100,
    backgroundColor: "transparent",
    height: 400
  },
  loginInput: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  inputContainerStyle: {
    width: 250
  },
  generalButton: {
    width: 250
  },
  googleButton: {
    height: 45,
    marginLeft: 5,
    width: 255
  }
});

const toastNotif = message => {
  Toast.show(`${message}`, {
    duration: Toast.durations.LONG,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0
  });
};

export default Login;
