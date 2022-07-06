const axios = require('axios');
const { expect } = require('chai');
const chai = require('chai');
chai.use(require('chai-subset'));
const { StatusCodes } = require('http-status-codes');

const urlBase = 'https://api.github.com';
const githubUserName = 'stefymojica';
const repository = 'workshop-api-testing-js';

describe('Github Api Test', () => {
  describe('Authentication', () => {
    it('Via OAuth2 Tokens by Header', async () => {
      const response = await axios.get(`${urlBase}/repos/${githubUserName}/${repository}`, {
        headers: {
          Authorization: `${process.env.ACCESS_TOKEN}`
        }
      });

      expect(response.status).to.equal(StatusCodes.OK);
      expect(response.data.description).equal('This is a Workshop about API Testing in JavaScript');
    });
  });
});

describe('Api Github', () => {
  it('Consume GET service', async () => {
    const response = await axios.get('https://api.github.com/users/aperdomob', {
      headers: {
        Authorization: `${process.env.ACCESS_TOKEN}`
      }
    });

    expect(response.data.name).to.equal('Alejandro Perdomo');
    expect(response.data.company).to.equal('Perficient Latam');
    expect(response.data.location).to.equal('Colombia');
  });

  it('jasmine-json-report repository', async () => {
    const response = await axios.get('https://api.github.com/users/aperdomob/repos', {
      headers: {
        Authorization: `${process.env.ACCESS_TOKEN}`
      }
    });
    const found = response.data.find((element) => element.name === 'jasmine-json-report');

    expect(found.name).to.equal('jasmine-json-report');
    expect(found.visibility).to.equal('public');
    expect(found.description).to.equal('A Simple Jasmine JSON Report');
  });

  it('Download repository', async () => {
    const response = await axios.get('https://api.github.com/repos/aperdomob/jasmine-json-report', {
      headers: {
        Authorization: `${process.env.ACCESS_TOKEN}`
      }
    });
    const url = `${response.data.svn_url}/archive/refs/heads/master.zip`;
    const ResponseUrl = await axios.get(url);
    const zip = ResponseUrl.data;

    // eslint-disable-next-line no-unused-expressions
    expect(zip).to.exist;
  });

  it('File list', async () => {
    const FormatReadme = {
      name: 'README.md',
      path: 'README.md',
      sha: '360eee6c223cee31e2a59632a2bb9e710a52cdc0'
    };

    const response = await axios.get('https://api.github.com/repos/aperdomob/jasmine-json-report/contents', {
      headers: {
        Authorization: `${process.env.ACCESS_TOKEN}`
      }
    });
    const readme = response.data.find((element) => element.name === 'README.md');

    expect(readme).containSubset(FormatReadme);
  });
});
