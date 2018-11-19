const dynamo = require('../modules/dynamoDBClient');
const FAKE_TOKEN = 'FAKE_TOKEN';

const resolvers = {
  Query: {
    getUser: (_, { email }, context) => {
      dynamo.getUser(email);
    },
    getUsers: (_, {}, context) => {
      dynamo.getUsers();
    }
  },
  Mutation: {
    signup: async (_, { user }, context) => {
      try {
        await dynamo.putUser({
          email: user.email,
          password: user.password
        });
        return { email: user.email, token: FAKE_TOKEN };
      } catch (error) {
        throw new Error(error);
      }
    }
  }
};

module.exports = resolvers;
