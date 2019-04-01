import React from "react";
import { Platform } from "react-native";
import { Header } from "react-native-elements";

import styles from "./Header.style";

const UIHeader = props => {
  const { mainTitle, leftComponent, rightComponent, containerStyle } = props;

  return (
    <Header
      leftComponent={{ ...leftComponent }}
      centerComponent={{
        text: mainTitle || "Untitled",
        style: { color: "#fff", fontWeight: "bold", fontSize: 14 }
      }}
      rightComponent={{ ...rightComponent }}
      containerStyle={{ ...styles.containerStyle, ...containerStyle }}
    />
  );
};

export { UIHeader };
