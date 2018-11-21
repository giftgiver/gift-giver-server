const dynmo = require('../documentClient');

const createUser = async ({ user }) => {
  const params = {
    TableName: 'Users',
    Item: {
      id: user.id,
      email: user.email,
      phoneNumber: user.phoneNumber,
      firstName: user.firstName,
      lastName: user.lastName
    }
  };

  try {
    const createUserResponse = await dynmo
      .getDocClient()
      .put(params)
      .promise();
    return createUserResponse;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

module.exports = createUser;
