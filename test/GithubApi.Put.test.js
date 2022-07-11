const axios = require('axios');
const { expect } = require('chai');
const { StatusCodes } = require('http-status-codes');

describe('Should interact with the user', () => {
  const urlBase = 'https://api.github.com/user/following';
  const user = '/aperdomob';

  describe('Should follow the user', () => {
    let followUser;
    before(async () => {
      followUser = await axios.put(`${urlBase}${user}`, {username: user}, {
        headers: {
          Authorization: `token ${process.env.ACCESS_TOKEN}`
        }
      });
    });
    it('', () => {
      expect(followUser.status).to.equal(StatusCodes.OK);
    });
  });
});
