import React from "react";
import { Button } from "react-native-elements";

import styles from "./Button.style";

const UIButton = props => {
  const {
    title,
    icon,
    buttonStyle,
    onPress,
    containerStyle,
    loading,
    disabled
  } = props;

  return (
    <Button
      title={title}
      containerStyle={{ ...styles.containerStyle, ...containerStyle }}
      buttonStyle={{ ...styles.buttonStyle, ...buttonStyle }}
      titleStyle={styles.titleStyle}
      icon={{ ...icon }}
      onPress={onPress}
      raised
      loading={loading || false}
      disabled={disabled || false}
    />
  );
};

export { UIButton };
