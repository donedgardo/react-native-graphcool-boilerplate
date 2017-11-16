import React, { Component } from "react";
import { graphql } from "react-apollo";

import LoggedInUserQuery from "../../graphql/queries/LoggedInUser";
import LoginScreen from "./LoginScreen";

class WithAuthLogin extends Component {
  componentWillReceiveProps(props) {
    const { navigation, currentUserId } = this.props;
    if (currentUserId) {
      navigation.navigate("Dashboard", { currentUserId });
    }
  }
  render() {
    const { loading, navigation } = this.props;
    // TODO Handle loading
    return <LoginScreen navigation={navigation} />;
    // return <SignUpScreen navigation={navigation} />;
  }
}

export default graphql(LoggedInUserQuery, {
  props: ({ data: { loading, loggedInUser }, ownProps }) => {
    return {
      ...ownProps,
      loading,
      currentUserId: loggedInUser ? loggedInUser.id : null
    };
  }
})(WithAuthLogin);
