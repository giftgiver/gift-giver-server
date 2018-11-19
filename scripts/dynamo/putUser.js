const dynamo = require('../../src/modules/dynamoDBClient');

const putUser = async () => {
  await dynamo.init();
  const user = await dynamo.putUser({
    email: 'test@test.com',
    password: 'test'
  });
  console.log('User Created!');
};

putUser();
