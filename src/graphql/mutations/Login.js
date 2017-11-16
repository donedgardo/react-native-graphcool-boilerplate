import gql from "graphql-tag";

const LoginMutation = gql`
  mutation Login($email: String!, $password: String!) {
    authenticateUser(email: $email, password: $password) {
      id
      token
    }
  }
`;

export default LoginMutation;
