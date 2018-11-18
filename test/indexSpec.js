const expect = require('chai').expect;
const sinon = require('sinon');

const TEST_PORT = 3000;

describe('index', () => {
  let sandbox;

  before(() => {
    sandbox = sinon.createSandbox();
  });
  beforeEach(async () => {});
  afterEach(async () => {
    sandbox.restore();
  });

  describe('start', () => {
    it('should call apollo listen with the port provided', async () => {});
  });
});
