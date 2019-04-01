import React from "react";
import { TextInput, StyleSheet } from "react-native";

const UITextarea = props => {
  const {
    placeholder,
    maxLength,
    style,
    onChangeText,
    value,
    keyboardType
  } = props;

  return (
    <TextInput
      multiline={true}
      placeholder={placeholder}
      numberOfLines={2}
      autoComplate="off"
      autoCorrect={false}
      maxLength={maxLength}
      style={{ ...styles.containerTextarea, ...style }}
      onChangeText={onChangeText}
      value={`${value}`}
      keyboardType={keyboardType || "default"}
    />
  );
};

const styles = StyleSheet.create({
  containerTextarea: {
    borderWidth: 0.8,
    marginVertical: 5,
    borderColor: "rgba(110, 120, 170, 1)",
    marginLeft: 10,
    marginRight: 10,
    fontSize: 16,
    paddingLeft: 20,
    paddingRight: 20,
    color: "#000"
  }
});

export { UITextarea };
