import React from "react";
import { Button, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  button: {
    fontSize: 21,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginVertical: 8,
    color: "white",
    backgroundColor: "red"
  }
});

const CustomButton = props => (
  <Button style={[styles.button, props.style]} {...props} />
);

export default CustomButton;
