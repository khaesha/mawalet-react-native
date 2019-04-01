import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  Alert
} from "react-native";
import { NavigationActions, StackActions } from "react-navigation";
import AsyncStorage from "@react-native-community/async-storage";
import Toast from "react-native-root-toast";
import { GoogleSignin } from "react-native-google-signin";

import styles from "./SideMenu.style";

class SideMenu extends Component {
  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  };

  resetPage() {
    this.props.navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: "Login" })]
      })
    );
  }

  onLogoutHandler = () => {
    Alert.alert("Logout", "Are you sure want to quit?", [
      {
        text: "Cancel",
        onPress: () => this.props.navigation.toggleDrawer()
      },
      {
        text: "Yes",
        onPress: () => this._signOutHandler()
      }
    ]);
  };

  _signOutHandler = async () => {
    try {
      const type = await AsyncStorage.getItem("type");
      await AsyncStorage.clear();
      if (type === "google") {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
      }
      // clear remaining data

      this.resetPage();
    } catch (error) {
      Toast.show(`${error}`, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
            <Text style={styles.sectionHeadingStyle}>Mawalet</Text>
            <View style={styles.navSectionStyle}>
              <TouchableHighlight
                onPress={this.navigateToScreen("CashFlowCreate")}
              >
                <Text style={styles.navItemStyle}>Create</Text>
              </TouchableHighlight>
              <TouchableHighlight onPress={this.navigateToScreen("Summary")}>
                <Text style={styles.navItemStyle}>Summary</Text>
              </TouchableHighlight>
            </View>
          </View>
        </ScrollView>
        {/* Footer */}
        <View style={styles.footerContainer}>
          <TouchableHighlight onPress={this.onLogoutHandler}>
            <Text style={{ color: "#fff" }}>Logout</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

export default SideMenu;
