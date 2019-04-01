import React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";

const Loader = props => {
  const { size, color } = props;

  return (
    <ActivityIndicator
      style={[styles.container, styles.horizontal]}
      size={size}
      color={color || "#0000ff"}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row"
  }
});

export { Loader };
