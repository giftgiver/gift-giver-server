const expect = require('chai').expect;
const sinon = require('sinon');
const server = require('../src/server');
const log = require('../src/log');
const index = require('../src/index');

const TEST_PORT = 3000;
const LISTEN_STRING = `Apollo Server Started! Listening on port ${TEST_PORT}`;
describe('index', () => {
  let sandbox;
  let listenStub;
  let logInfoStub;

  before(() => {
    sandbox = sinon.createSandbox();
  });
  beforeEach(async () => {
    listenStub = sandbox.stub(server, 'listen');
  });
  afterEach(async () => {
    sandbox.restore();
  });

  describe('start', () => {
    it('should call apollo listen with the port provided', async () => {
      logInfoStub = sandbox.stub(log, 'info');

      await index.start(TEST_PORT);
      expect(listenStub.calledOnce).to.equal(true);
      expect(listenStub.getCall(0).args[0]).to.equal(TEST_PORT);
      expect(logInfoStub.calledOnce).to.equal(true);
      expect(logInfoStub.getCall(0).args[0]).to.equal(LISTEN_STRING);
    });
  });
});
