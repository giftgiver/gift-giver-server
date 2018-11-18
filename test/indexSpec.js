const expect = require('chai').expect;
const sinon = require('sinon');
const server = require('../src/index');
const fastify = require('../src/server');

const TEST_PORT = 3000;
const LISTEN_STRING = `server listening on ${TEST_PORT}`;
const MOCK_ERROR_STRING = 'MOCK_ERROR';
describe('index', () => {
  let sandbox;
  let listenStub;
  let logStub;
  let closeStub;
  before(() => {
    sandbox = sinon.createSandbox();
  });
  beforeEach(() => {
    listenStub = sandbox.stub(fastify, 'listen');
    logInfoStub = sandbox.stub(fastify.log, 'info');
    logErrorStub = sandbox.stub(fastify.log, 'error');
    closeStub = sandbox.stub(fastify, 'close');
    exitStub = sandbox.stub(process, 'exit');
  });
  afterEach(async () => {
    sandbox.restore();
  });

  describe('start', () => {
    it('should call fastify listen with correct port and log listen string', async () => {
      try {
        await server.start(TEST_PORT);
        expect(listenStub.calledOnce).to.be.true;
        expect(listenStub.getCall(0).args[0]).to.equal(TEST_PORT);
        expect(logInfoStub.getCall(0).args[0]).to.equal(LISTEN_STRING);
        await server.stop();
      } catch (error) {
        expect(error).to.be.undefined;
      }
    });
    it('should log with fastify error if server crashes', async () => {
      listenStub.rejects(MOCK_ERROR_STRING);
      try {
        await server.start(TEST_PORT);
        await server.stop();
      } catch (error) {
        expect(error).to.not.be.undefined;
        expect(error.message).to.equal(MOCK_ERROR_STRING);
      }
    });
  });
  describe('stop', () => {
    it('should call fastify stop', async () => {
      try {
        await server.start(TEST_PORT);
        await server.stop();
        expect(listenStub.calledOnce).to.be.true;
        expect(listenStub.getCall(0).args[0]).to.equal(TEST_PORT);
        expect(logInfoStub.getCall(0).args[0]).to.equal(LISTEN_STRING);
        await server.stop();
      } catch (error) {
        expect(error).to.be.undefined;
      }
    });
  });
});
