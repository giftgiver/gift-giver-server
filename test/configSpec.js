const expect = require('chai').expect;
const sinon = require('sinon');
const config = require('../src/config');
const nconf = require('nconf');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

describe('config', () => {
  let sandbox;
  let nconfGetStub;
  before(() => {
    sandbox = sinon.createSandbox();
  });
  beforeEach(() => {
    nconfGetStub = sandbox.stub(nconf, 'get');
    nconfAddStub = sandbox.stub(nconf, 'add');
  });
  afterEach(() => {
    sandbox.restore();
  });

  describe('init', () => {
    it('should get node env and add both default and env yaml files', async () => {
      await config.init();

      expect(nconfGetStub.calledOnce).to.be.true;
      expect(nconfGetStub.getCall(0).args[0]).to.equal('NODE_ENV');

      //TODO: flesh this test out a bit more
      expect(nconfAddStub.callCount).equal(2);
      expect(nconfAddStub.getCall(0).args[0]).to.equal('env');
      expect(nconfAddStub.getCall(1).args[0]).to.equal('global');
    });
  });
  describe('get', () => {
    it('should get node env and add both default and env yaml files', async () => {
      nconfGetStub.returns('fake-property');

      const configProperty = await config.get('fake-property');

      expect(configProperty).to.equal('fake-property');
      expect(nconfGetStub.calledOnce).to.be.true;
    });
  });
});
