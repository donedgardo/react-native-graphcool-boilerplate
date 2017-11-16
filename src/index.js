import React, { Component } from "react";
import { StackNavigator } from "react-navigation";

import LoggedIn from "./layouts/LoggedIn";
import LoginScreen from "./routes/LoginScreen";
import SignUpScreen from "./routes/SignUpScreen";

export default StackNavigator({
  Signup: {
    screen: SignUpScreen,
    navigationOptions: () => ({
      header: null
    })
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: () => ({
      header: null
    })
  },
  Dashboard: {
    screen: LoggedIn,
    navigationOptions: () => ({
      header: null
    })
  }
});
