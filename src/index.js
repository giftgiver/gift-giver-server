const { ApolloServer, gql } = require('apollo-server');
const uuidv4 = require('uuid/v4');

const dynamo = require('./modules/dynamo/documentClient');
const read = require('./modules/dynamo/read/readService');
const write = require('./modules/dynamo/write/writeService');
const auth = require('./modules/auth/auth');

// TODO: find a graceful way to hook these into the service start (also I don think they are working now);
dynamo.setupAWS();

// The GraphQL schema
const typeDefs = gql`
  input UserInput {
    id: String
    email: String
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
    email: String
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

// A map of functions which return data for the schema.
const resolvers = {
  // A map of functions which return data for the schema.
  Query: {
    healthcheck: () => 'success',
    getUser: async (parent, { id }, context, info) => {
      const user = await read.getUser({ id });
      return {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber
      };
    }
  },
  Mutation: {
    async createUser(parent, { user }, context, info) {
      // Generate UUID
      const id = uuidv4();
      user.id = id;

      // Generate JWT token
      const jwt = auth.getSignedJwt(id);

      try {
        await write.createUser({ user });

        return {
          email: user.email,
          token: jwt
        };
      } catch (error) {
        // TODO: fix logging and log error
        // TODO: look up logging patterns for asnyc throws
        console.error(error);
        throw new Error(error);
      }
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const start = async port => {
  try {
    await server.listen(port);
    console.log(`Server Listening on port: ${port}`);
  } catch (error) {
    // TODO: look into error handling pattern within async try/catches (this doesn't feel right)
    console.error(`Error starting server : ${error}`);
    throw new Error(error);
  }
};

module.exports = {
  start
};
