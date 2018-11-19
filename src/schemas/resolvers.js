const dynamo = require('../modules/dynamoDBClient');

module.exports = {
  Query: {
    getUser: email => dataSources.dynamo.getUser(email)
  },
  Mutation: {
    signup: user => {
      dataSources.dynamo.putUser(user.email);
    }
  }
};
