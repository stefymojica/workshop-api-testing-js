const axios = require('axios');
const { expect } = require('chai');
const chai = require('chai');
chai.use(require('chai-subset'));

describe('Api Github', () => {
  let user;
  let reposResponse;
  let jasmineRepo;
  let content;
  let readme;
  const expectRepository = 'jasmine-json-report';

  before(async () => {
    user = await axios.get('https://api.github.com/users/aperdomob', {
      headers: {
        Authorization: `${process.env.ACCESS_TOKEN}`
      }
    });
    reposResponse = await axios.get(`${user.data.repos_url}`, {
      headers: {
        Authorization: `${process.env.ACCESS_TOKEN}`
      }
    });
    jasmineRepo = reposResponse.data.find((element) => element.name === expectRepository);
    content = await axios.get(`${jasmineRepo.url}/contents`, {
      headers: {
        Authorization: `${process.env.ACCESS_TOKEN}`
      }
    });
    readme = content.data.find((element) => element.name === 'README.md');
  });
  it('Get user', async () => {
    expect(user.data.name).to.equal('Alejandro Perdomo');
    expect(user.data.company).to.equal('Perficient Latam');
    expect(user.data.location).to.equal('Colombia');
  });

  it('Get repository', async () => {
    expect(jasmineRepo.name).to.equal('jasmine-json-report');
    expect(jasmineRepo.visibility).to.equal('public');
    expect(jasmineRepo.description).to.equal('A Simple Jasmine JSON Report');
  });

  it('Download repository', async () => {
    const response = await axios.get(`${jasmineRepo.url}`, {
      headers: {
        Authorization: `${process.env.ACCESS_TOKEN}`
      }
    });
    const url = `${response.data.svn_url}/archive/refs/heads/master.zip`;
    const ResponseUrl = await axios.get(url);
    const zip = ResponseUrl.data;

    expect(zip).to.have.lengthOf.above(1);
  });

  it('File list', async () => {
    const FormatReadme = {
      name: 'README.md',
      path: 'README.md',
      sha: '360eee6c223cee31e2a59632a2bb9e710a52cdc0'
    };
    expect(readme).containSubset(FormatReadme);
  });

  it('Download Readme', async () => {
  });
});
