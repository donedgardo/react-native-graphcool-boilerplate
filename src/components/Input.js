import React from "react";
import { TextInput, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    marginVertical: 8,
    color: "white",
    borderBottomWidth: 1,
    borderBottomColor: "white"
  }
});

const CustomInput = props => (
  <TextInput style={styles.input} placeholderTextColor="white" {...props} />
);

export default CustomInput;
