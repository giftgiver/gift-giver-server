const { gql } = require('apollo-server');
// The GraphQL schema
const { gql } = require('apollo-server');

const typeDefs = gql`
  input UserInput {
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
  input Login {
    email: String
    password: String
  }
  type CreateUserReponse {
    token: String
  }
  type Query {
    getUser(email: String!): User
    login(login: Login!): User
    healthcheck: String

    # getUsers: [User]
  }
  type Mutation {
    createUser(user: UserInput!): CreateUserReponse
  }
`;

module.exports = typeDefs;
