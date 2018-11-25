const expect = require('chai').expect;
const sinon = require('sinon');
const hash = require('../../src/modules/auth/hash');
const bcrypt = require('bcrypt');
const MOCK_HASH = 'MOCK_HASH';
const MOCK_PASSWORD = 'MOCK_PASSWORD';
const MOCK_ERROR = { message: 'MOCK_ERROR' };
const MOCK_ERROR_STRING = `bcrypt error: ${MOCK_ERROR.message}`;
describe('Hash', () => {
  let log;
  let logErrorStub;
  let hashStub;
  before(() => {
    sandbox = sinon.createSandbox();
  });
  beforeEach(() => {
    log = require('../../src/log');

    logErrorStub = sandbox.stub(log, 'error');
    hashStub = sandbox.stub(bcrypt, 'hash');
  });
  afterEach(() => {
    sandbox.restore();
  });

  describe('hashPassword', () => {
    it('should call bcrypt.hash with supplied password and return result.', async () => {
      hashStub.resolves(MOCK_HASH);

      try {
        const hashResult = await hash.hashPassword({ password: MOCK_PASSWORD });
        expect(hashResult).to.equal(MOCK_HASH);
        expect(hashStub.callCount).to.equal(1);
        expect(hashStub.getCall(0).args[0]).to.equal(MOCK_PASSWORD);
        expect(hashStub.getCall(0).args[1]).to.equal(10);
      } catch (error) {
        expect(error).to.be.undefined;
      }
    });
    it('should log and throw if bcrypt.hash throws and error.', async () => {
      hashStub.throws(MOCK_ERROR);

      try {
        const hashResult = await hash.hashPassword({ password: MOCK_PASSWORD });
        expect(hashResult).to.be.undefined;
      } catch (error) {
        expect(error).to.not.be.undefined;
        expect(logErrorStub.callCount).to.equal(1);
        expect(logErrorStub.getCall(0).args[0]).to.equal();
      }
    });
  });
});
