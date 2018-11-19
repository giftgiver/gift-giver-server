const { gql } = require('apollo-server');

module.exports = gql`
  input UserInput {
    email: String
    password: String
  }

  type User {
    email: String
    password: String
  }

  type Query {
    getUser(email: String!): User
    getUsers: [User]
  }

  type Mutation {
    signup(user: UserInput!): User
  }
`;
