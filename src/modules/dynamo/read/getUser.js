const dynmo = require('../documentClient');

const getUser = async ({ email }) => {
  const params = {
    TableName: 'Users',
    Key: {
      email: email
    }
  };
  try {
    const getUser = await dynmo
      .getDocClient()
      .get(params)
      .promise();
    return getUser.Item;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = getUser;
