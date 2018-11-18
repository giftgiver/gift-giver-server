const expect = require('chai').expect;
const sinon = require('sinon');

const TEST_PORT = 3000;

describe('index', () => {
  let sandbox;

  before(() => {
    sandbox = sinon.createSandbox();
  });
  beforeEach(() => {});
  afterEach(async () => {
    sandbox.restore();
  });

  describe('...', () => {
    it('', async () => {});
  });
});
