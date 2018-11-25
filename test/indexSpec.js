const expect = require('chai').expect;
const sinon = require('sinon');
const index = require('../src/index');
const server = require('../src/server');
const docClient = require('../src/modules/dynamo/documentClient');

const TEST_PORT = '3000';
const MOCK_ERROR = 'MOCK ERROR!';

describe('index', () => {
  let sandbox;
  let setupAWSStub;
  let listenStub;
  let mockServer;
  let logErrorStub;
  let log;
  before(() => {
    sandbox = sinon.createSandbox();
  });
  beforeEach(() => {
    log = require('../src/log').logger;
    listenStub = sandbox.stub(server, 'listen');
    setupAWSStub = sandbox.stub(docClient, 'setupAWS');
    logErrorStub = sandbox.stub(log, 'error');

    mockServer = { listen: sandbox.stub() };
  });
  afterEach(() => {
    sandbox.restore();
  });

  describe('start', () => {
    it('should call dynamo init and server.listen with port provided', async () => {
      await index.start(TEST_PORT);

      expect(setupAWSStub.callCount, 'setupAWS is called once').to.equal(1);
      expect(listenStub.callCount, 'listen is called once').to.equal(1);
      expect(
        listenStub.getCall(0).args[0],
        'listen is called with provided port'
      ).to.equal(TEST_PORT);
    });
    it('should log and throw if server throws error', async () => {
      const mockErrorString = `Error starting server : ${MOCK_ERROR}`;
      listenStub.throws(MOCK_ERROR);

      try {
        await index.start(TEST_PORT);
      } catch (error) {
        expect(logErrorStub.callCount).to.equal(1);
        expect(logErrorStub.getCall(0).args[0]).to.equal(mockErrorString);
        expect(error.message).to.equal(MOCK_ERROR);
      }
    });
  });
});
