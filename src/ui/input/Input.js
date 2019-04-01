import React from "react";
import { Input } from "react-native-elements";

import styles from "./Input.style";

const UIInput = props => {
  const {
    placeholder,
    leftIcon,
    keyboardType,
    secureTextEntry,
    inputContainerStyle,
    inputStyle,
    onChangeText,
    value
  } = props;

  return (
    <Input
      placeholder={placeholder}
      leftIcon={{ ...leftIcon }}
      inputContainerStyle={{
        ...styles.inputContainerStyle,
        ...inputContainerStyle
      }}
      autoCapitalize="none"
      autoCorrect={false}
      keyboardType={keyboardType || "default"}
      secureTextEntry={secureTextEntry}
      inputStyle={{ ...styles.inputStyle, ...inputStyle }}
      onChangeText={onChangeText}
      value={`${value}`}
    />
  );
};

export { UIInput };
