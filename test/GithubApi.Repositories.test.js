const axios = require('axios');
const { expect } = require('chai');
const { StatusCodes } = require('http-status-codes');

describe('Api Github', () => {
  it('Consume GET service', async () => {
    const response = await axios.get('https://api.github.com/users/aperdomob');

    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.data.name).to.equal('Alejandro Perdomo');
    expect(response.data.company).to.equal('Perficient Latam');
    expect(response.data.location).to.equal('Colombia');
  });

  it('jasmine-json-report repository', async () => {
    const response = await axios.get('https://api.github.com/users/aperdomob/repos');
    const found = response.find((name) => name === 'jasmine-json-report');
    expect(found.data.name).to.equal('jasmine-json-report');
  });
});
