import gql from "graphql-tag";

const SignUpMutation = gql`
  mutation SignUp(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
  ) {
    signupUser(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
    ) {
      id
      token
    }
  }
`;

export default SignUpMutation;
