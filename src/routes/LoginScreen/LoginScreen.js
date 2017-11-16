import React, { Component } from "react";
import { AsyncStorage } from "react-native";
import KeyboardSpacer from "react-native-keyboard-spacer";
import { graphql } from "react-apollo";

import { Container, Text, FormContainer } from "./style";

import LoginMutation from "../../graphql/mutations/Login";
import Input from "../../components/Input";
import Button from "../../components/Button";

class LoginScreen extends Component {
  state = {
    email: "",
    password: ""
  };
  goToSignUp = () => {
    const { navigation } = this.props;
    navigation.navigate("Signup");
  };
  onChangeEmail = value => {
    this.setState({ email: value });
  };
  onChangePassword = value => {
    this.setState({ password: value });
  };
  onSubmit = async () => {
    const { login, navigation } = this.props;
    const { email, password } = this.state;
    if (password && email) {
      try {
        const result = await login({ password, email });
        const { id, token } = result.data.authenticateUser;
        await AsyncStorage.setItem("graphcool_token", token);
        navigation.navigate("Dashboard", { currentUserId: id });
      } catch (e) {
        // TODO Handle Error
        console.log(e);
      }
    } else {
      // TODO Handle Error
      console.log("Required fields");
    }
  };
  render() {
    return (
      <Container>
        <Text>Login</Text>
        <FormContainer>
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
          <Button onPress={this.onSubmit} title="Login" />
          <Button onPress={this.goToSignUp} title="Sign Up" />
        </FormContainer>
        <KeyboardSpacer />
      </Container>
    );
  }
}

export default graphql(LoginMutation, {
  props: ({ mutate, ownProps }) => ({
    ...ownProps,
    login: ({ email, password }) =>
      mutate({
        variables: {
          email,
          password
        }
      })
  })
})(LoginScreen);
