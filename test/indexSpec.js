const expect = require('chai').expect;
const sinon = require('sinon');
const index = require('../src/index');
const proxyquire = require('proxyquire');
const { ApolloServer } = require('apollo-server');
const docClient = require('../src/modules/dynamo/documentClient');
const TEST_PORT = '3000';

describe('index', () => {
  let sandbox;
  let setupAWSStub;
  let listenStub;
  before(() => {
    sandbox = sinon.sandbox.create();
  });
  beforeEach(() => {
    listenStub = proxyquire('apollo-server', { listen: sandbox.stub() });
    setupAWSStub = sandbox.stub(docClient, 'setupAWS');
  });
  afterEach(() => {
    sandbox.restore();
  });

  describe('start', () => {
    it('should be a function', () => {
      expect(index.start).to.be.a('function');
    });
    it('should call dynamo init and server.listen with port provided', async () => {
      await index.start(TEST_PORT);
      expect(setupAWSStub.callCount, 'setupAWS is called once').to.equal(1);
      expect(listenStub.callCount, 'listen is called once').to.equal(1);
      expect(
        listenStub.getCall(0).args[0],
        'listen is called with provided port'
      ).to.equal(TEST_PORT);
    });
  });
});
