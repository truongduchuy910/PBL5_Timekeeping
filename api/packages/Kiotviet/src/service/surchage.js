const axios = require('axios').default;
const { authen } = require('./authen');

class Surchage {
  /**
   * user {object}:
   * @param {string} Retailer  shop's name
   * @param {string} ClientId
   * @param {string} ClientSecret
   * body {object}:
   * @param {string} orderBy ex: 'name'
   * @param {string} orderDirection - Asc,Desc
   * @param {string} lastModifiedFrom
   * @param {number} pageSize  max 100
   * @param {number} currentItem default 0
   * @param {number} branchId
   */
  getSurchage(user, body) {
    return new Promise((resolve, reject) => {
      authen
        .getAccessToken(user.ClientId, user.ClientSecret)
        .then((token) => {
          axios({
            method: 'GET',
            url: 'https://public.kiotapi.com/surchages',
            data: body,
            headers: {
              Retailer: user.Retailer,
              Authorization: `${token.token_type} ${token.access_token}`,
            },
          })
            .then((res) => resolve(res.data))
            .catch((err) => reject(err.response.data));
        })
        .catch((err) => reject(err));
    });
  }
}

module.exports.surchage = new Surchage();
