import React from "react";
import { AsyncStorage } from "react-native";

import Button from "./Button";

const LogoutButton = ({ navigation, client }) => {
  const logout = async () => {
    try {
      await AsyncStorage.setItem("graphcool_token", "");
      await client.resetStore();
      navigation.navigate("Login");
    } catch (e) {
      console.log(e);
    }
  };

  return <Button title="Logout" onPress={logout} />;
};

export default LogoutButton;
