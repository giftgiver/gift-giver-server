// The GraphQL schema
const { gql } = require('apollo-server');

const typeDefs = gql`
  input UserInput {
    id: String
    email: String
    password: String
    firstName: String
    lastName: String
    phoneNumber: String
  }
  type User {
    id: String
    email: String
    firstName: String
    lastName: String
    phoneNumber: String
  }
  type CreateUserReponse {
    token: String
  }
  type Query {
    getUser(id: String!): User
    healthcheck: String

    # getUsers: [User]
  }
  type Mutation {
    createUser(user: UserInput!): CreateUserReponse
  }
`;

module.exports = typeDefs;
