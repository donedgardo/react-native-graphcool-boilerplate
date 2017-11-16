import gql from "graphql-tag";

const LoggedInUser = gql`
  query LoggedInUser {
    loggedInUser {
      id
    }
  }
`;
export default LoggedInUser;
