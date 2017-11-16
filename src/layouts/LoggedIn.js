import React, { Component } from "react";
import { Text, View } from "react-native";
import { graphql, withApollo } from "react-apollo";
import LogoutButton from "../components/LogoutButton";

class DashboardLayout extends Component {
  render() {
    const { children, navigation, client } = this.props;
    const { state: { params: { currentUserId } } } = navigation;
    return (
      <View>
        <Text>{currentUserId}</Text>
        <LogoutButton navigation={navigation} client={client} />
      </View>
    );
  }
}

export default withApollo(DashboardLayout);
// export default graphql(LoggedInUserQuery, {
//   props: ({data: {loggedInUser}, ownProps}) => ({
//     currentUserId: loggedInUser.id
//     ...ownProps
//   })
// })(MainLayout);
