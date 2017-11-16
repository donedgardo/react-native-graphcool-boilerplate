import React, { Component } from "react";
import { AsyncStorage } from "react-native";
import PropTypes from "prop-types";
import KeyboardSpacer from "react-native-keyboard-spacer";
import { graphql } from "react-apollo";

import { Container, Text, FormContainer } from "./style";

import SignUpMutation from "../../graphql/mutations/SignUp";
import Input from "../../components/Input";
import Button from "../../components/Button";

class SignUpScreen extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  };
  onChangeFirstName = value => {
    this.setState({ firstName: value });
  };
  onChangeLastName = value => {
    this.setState({ lastName: value });
  };
  onChangeEmail = value => {
    this.setState({ email: value });
  };
  onChangePassword = value => {
    this.setState({ password: value });
  };
  onChangePasswordConfirm = value => {
    this.setState({ confirmPassword: value });
  };
  onSubmit = async () => {
    const { signUp, navigation } = this.props;
    const {
      firstName,
      lastName,
      password,
      email,
      confirmPassword
    } = this.state;
    if (firstName && lastName && password && email && confirmPassword) {
      if (password !== confirmPassword) {
        // TODO Handle Error
        console.log("Passwords dont match");
      }
      if (true) {
        // TODO validate email
        try {
          const result = await signUp({ firstName, lastName, password, email });
          const { id, token } = result.data.signupUser;
          await AsyncStorage.setItem("graphcool_token", token);
          navigation.navigate("Dashboard", { currentUserId: id });
        } catch (e) {
          // TOD  O Handle Error
          console.log(e);
        }
      }
    } else {
      // TODO Handle Error
      console.log("Required fields");
    }
  };
  goToLogin = () => {
    const { navigation } = this.props;
    navigation.navigate("Login");
  };
  render() {
    return (
      <Container>
        <Text>SignUp</Text>
        <FormContainer>
          <Input
            type="text"
            placeholder="First Name"
            onChangeText={this.onChangeFirstName}
          />
          <Input
            type="text"
            placeholder="Last Name"
            onChangeText={this.onChangeLastName}
          />
          <Input
            type="email"
            placeholder="Email"
            onChangeText={this.onChangeEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <Input
            type="password"
            placeholder="Password"
            onChangeText={this.onChangePassword}
            autoCapitalize="none"
            secureTextEntry
          />
          <Input
            type="password"
            placeholder="Confirm password"
            onChangeText={this.onChangePasswordConfirm}
            autoCapitalize="none"
            secureTextEntry
          />
          <Button onPress={this.onSubmit} title="Sign Up" />
          <Button onPress={this.goToLogin} title="Login" />
        </FormContainer>
        <KeyboardSpacer />
      </Container>
    );
  }
}

SignUpScreen.propTypes = {
  // eslint-disable-next-line
  navigation: PropTypes.object.isRequired
};

export default graphql(SignUpMutation, {
  props: ({ mutate, ownProps }) => ({
    ...ownProps,
    signUp: ({ firstName, lastName, email, password }) =>
      mutate({
        variables: {
          firstName,
          lastName,
          email,
          password
        }
      })
  })
})(SignUpScreen);
