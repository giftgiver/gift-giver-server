const expect = require('chai').expect;
const sinon = require('sinon');
const dynamo = require('../../src/modules/dynamoDBClient');

const MOCK_EMAIL = 'mock@email.com';
const MOCK_PASSWORD = 'I assure you this is hashed.';
const MOCK_USER = {
  email: MOCK_EMAIL,
  password: MOCK_PASSWORD
};

describe('dynamodb functional', () => {
  // let sandbox;

  before(async () => {
    sandbox = sinon.createSandbox();
    await dynamo.init();
    await dynamo.createUsersTable();
  });

  afterEach(async () => {
    sandbox = sinon.restore();
  });

  after(async () => {
    await dynamo.deleteTables();
  });

  describe('putUser', () => {
    it('should create a user record', async () => {
      const putUserResponse = await dynamo.putUser(MOCK_USER);
      expect(putUserResponse).to.deep.equal({});
    });
  });
  describe('getUser', () => {
    it('should get a user record', async () => {
      const user = await dynamo.getUser({ email: MOCK_EMAIL });
      expect(user.Item).to.deep.equal(MOCK_USER);
    });
  });
});
