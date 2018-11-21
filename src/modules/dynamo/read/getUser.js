const dynmo = require('../documentClient');

const getUser = async ({ id }) => {
  const params = {
    TableName: 'Users',
    Key: {
      id: id
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
