const expect = require('chai').expect;
const sinon = require('sinon');
const index = require('../src/index');

describe('index', () => {
  let sandbox;

  // before(() => {
  //   sandbox = sinon.createSandbox();
  // });
  // beforeEach(async () => {
  //   listenStub = sandbox.stub(server, 'listen');
  // });
  // afterEach(async () => {
  //   sandbox.restore();
  // });

  describe('functional tests', () => {
    it('should call apollo listen with the port provided', async () => {
      try {
        logInfoStub = sandbox.stub(log, 'info');
        await index.start(TEST_PORT);
        expect(listenStub.calledOnce).to.equal(true);
        expect(listenStub.getCall(0).args[0]).to.equal(TEST_PORT);
        expect(logInfoStub.calledOnce).to.equal(true);
        expect(logInfoStub.getCall(0).args[0]).to.equal(LISTEN_STRING);
      } catch (error) {
        expect(error).to.be.undefined;
      }
    });
  });
});
