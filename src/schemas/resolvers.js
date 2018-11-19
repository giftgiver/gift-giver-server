const dynamo = require('../modules/dynamoDBClient');

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
      const putUserResponse = await dynamo.putUser({
        email: user.email,
        password: user.password
      });
      return putUserResponse;
    }
  }
};

module.exports = resolvers;
