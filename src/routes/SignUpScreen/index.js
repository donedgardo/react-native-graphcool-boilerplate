import React, { Component } from "react";
import PropTypes from "prop-types";
import { graphql } from "react-apollo";

import LoggedInUserQuery from "../../graphql/queries/LoggedInUser";
import SignUpScreen from "./SignUpScreen";

class WithAuthSignUp extends Component {
  componentWillReceiveProps(props) {
    const { navigation } = this.props;
    const { currentUserId } = props;
    if (currentUserId) {
      navigation.navigate("Dashboard", { currentUserId });
    }
  }
  render() {
    const { loading, navigation } = this.props;
    // TODO Handle loading
    return <SignUpScreen navigation={navigation} />;
  }
}

WithAuthSignUp.propTypes = {
  // eslint-disable-next-line
  navigation: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  currentUserId: PropTypes.string
};

WithAuthSignUp.defaultProps = {
  currentUserId: null
};

export default graphql(LoggedInUserQuery, {
  props: ({ data: { loading, loggedInUser }, ownProps }) => ({
    ...ownProps,
    loading,
    currentUserId: loggedInUser ? loggedInUser.id : null
  })
})(WithAuthSignUp);
