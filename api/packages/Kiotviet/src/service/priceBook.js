const axios = require('axios').default;
const { authen } = require('./authen');

class PriceBook {
  /**
   * user {object}:
   * @param {string} Retailer  priceBook's name
   * @param {string} ClientId
   * @param {string} ClientSecret
   * body {object}:
   * @param {string} orderBy
   * @param {string} orderDirection - Asc,Desc
   * @param {string} lastModifiedFrom
   * @param {number} pageSize  max 100
   * @param {number} currentItem default 0
   * @param {boolean} includePriceBookBranch optional
   * @param {boolean} includePriceBookCustomerGroups optional
   * @param {boolean} includePriceBookUsers optional
   */
  getPriceBooks(user, body) {
    return new Promise((resolve, reject) => {
      authen
        .getAccessToken(user.ClientId, user.ClientSecret)
        .then((token) => {
          axios({
            method: 'GET',
            url: 'https://public.kiotapi.com/pricebooks',
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

  /**
   * user {object}:
   * @param {string} Retailer  shop's name
   * @param {string} ClientId
   * @param {string} ClientSecret
   *
   * @param {numbre} id - pricebook's id
   */
  getPriceBookById(user, id) {
    return new Promise((resolve, reject) => {
      authen
        .getAccessToken(user.ClientId, user.ClientSecret)
        .then((token) => {
          axios({
            method: 'GET',
            url: `https://public.kiotapi.com/pricebooks/${id}`,
            headers: {
              Retailer: user.Retailer,
              Authorization: `${token.token_type} ${token.access_token}`,
            },
          })
            .then((res) => resolve(res.data))
            .catch((err) => reject(err.response.data));
        })
        .catch((error) => reject(error));
    });
  }
}

module.exports.priceBook = new PriceBook();
// ok
