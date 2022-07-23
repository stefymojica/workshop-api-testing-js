const axios = require('axios');
const { expect } = require('chai');
const { StatusCodes } = require('http-status-codes');
require('dotenv').config();

describe('Should interact with the user', () => {
  const urlBase = 'https://api.github.com/user/following';
  const user = '/aperdomob';

  describe('Should follow the user', () => {
    let followUser;
    before(async () => {
      followUser = await axios.put(
        `${urlBase}${user}`,
        {},
        {
          headers: {
            Authorization: `token ${process.env.ACCESS_TOKEN}`
          }
        }
      );
    });
    it('Should verify that you follow the user', () => {
      expect(followUser.status).to.equal(StatusCodes.NO_CONTENT);
      expect(followUser.data).to.equal('');
    });
  });
  describe('Should interactive with de user list', () => {
    let response;
    let loginUser;
    before(async () => {
      response = await axios.get(`${urlBase}`, {
        headers: {
          Authorization: `token ${process.env.ACCESS_TOKEN}`
        }
      });
      loginUser = response.data.find(
        (elemento) => elemento.login === 'aperdomob'
      );
    });
    it('Should check the list and verify that follow the user', async () => {
      expect(loginUser.login).to.equal('aperdomob');
    });
  });
  describe('Following the user again', () => {
    let followUserAgain;
    before(async () => {
      followUserAgain = await axios.put(
        `${urlBase}${user}`,
        {},
        {
          headers: {
            Authorization: `token ${process.env.ACCESS_TOKEN}`
          }
        }
      );
    });
    it('Should verifiy that the user is followed', async () => {
      expect(followUserAgain.status).to.equal(StatusCodes.NO_CONTENT);
      expect(followUserAgain.data).to.equal('');
    });
  });
  describe('Should interactive with de user list', () => {
    let checkUser;
    let loginUser;
    before(async () => {
      checkUser = await axios.get(`${urlBase}`, {
        headers: {
          Authorization: `token ${process.env.ACCESS_TOKEN}`
        }
      });
      loginUser = checkUser.data.find(
        (elemento) => elemento.login === 'aperdomob'
      );
    });
    it('Should check the list and verify that follow the user', async () => {
      expect(loginUser.login).to.equal('aperdomob');
    });
  });
});
