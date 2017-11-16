import React from "react";
import { AsyncStorage, StyleSheet, Text, View } from "react-native";
import { ApolloProvider } from "react-apollo";
import { setContext } from "apollo-link-context";
import { onError } from "apollo-link-error";
import { ApolloClient, HttpLink, InMemoryCache } from "apollo-client-preset";

import { GRAPH_COOL_URL } from "react-native-dotenv";
import App from "./src";

const httpLink = new HttpLink({ uri: GRAPH_COOL_URL });

let token;

const withToken = setContext(async request => {
  if (!token) {
    token = await AsyncStorage.getItem("graphcool_token");
  }
  return {
    headers: {
      authorization: `Bearer ${token}`
    }
  };
});

const resetToken = onError(({ networkError }) => {
  if (networkError && networkError.statusCode === 401) {
    // remove cached token on 401 from the server
    token = undefined;
  }
});
const authFlowLink = withToken.concat(resetToken);
const link = authFlowLink.concat(httpLink);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

export default class FoodTrucker extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    );
  }
}
