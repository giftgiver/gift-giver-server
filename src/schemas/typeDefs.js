const { gql } = require('apollo-server');

module.exports = gql`
  type User {
    email: String
    password: String
  }
  type Query {
    users: [User]
  }
  type Mutation {
    signUp: User
  }
`;
