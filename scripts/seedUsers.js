const dynamo = require('../src/modules/dynamo/documentClient');

//TODO: expand to multiple users

const testUser = {
  TableName: 'Users',
  Item: {
    id: '*',
    email: 'mychaelrw@gmail.com.com',
    firstName: 'Mychael',
    lastName: 'Walton',
    phoneNumber: '9711111111'
  }
};

const createAdminUser = async () => {
  await dynamo.setupAWS();
  try {
    const createUserResponse = await dynamo
      .getDocClient()
      .put(testUser)
      .promise();
    console.log('Admin User Creation Successful!');
    return createUserResponse;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

createAdminUser();
