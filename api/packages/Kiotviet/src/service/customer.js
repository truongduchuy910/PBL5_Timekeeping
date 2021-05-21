const axios = require('axios').default;
const { authen } = require('./authen');

class Customer {
  /**
   * user {object}:
   * @param {string} Retailer  shop's name
   * @param {string} ClientId
   * @param {string} ClientSecret
   * body {object}:
   * @param {string} code optional
   * @param {string} name optional
   * @param {string} contactNumber optional
   * @param {string} lastModifiedFrom
   * @param {number} pageSize  max 100
   * @param {number} currentItem default 0
   * @param {string} orderBy
   * @param {string} orderDirection - Asc,Desc
   * @param {boolean} includeRemoveIds
   * @param {boolean} includeTotal TotalInvoice, TotalPoint, TotalRevenue
   * @param {boolean} includeCustomerGroup
   * @param {string} birthDate
   * @param {number} groupId
   * @param {boolean} includeCustomerSocial customer's psid facebook fanpage
   */
  getCustomers(user, body) {
    return new Promise((resolve, reject) => {
      authen
        .getAccessToken(user.ClientId, user.ClientSecret)
        .then((token) => {
          axios({
            method: 'GET',
            url: 'https://public.kiotapi.com/customers',
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
   * @param {number} id - customer's id
   */
  getCustomerById(user, id) {
    return new Promise((resolve, reject) => {
      authen
        .getAccessToken(user.ClientId, user.ClientSecret)
        .then((token) => {
          axios({
            method: 'GET',
            url: `https://public.kiotapi.com/customers/${id}`,
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

  /**
   *
   * @param {string} Retailer - shop's name
   * @param {numbre} code - customer's code
   */

  getCustomerByCode(user, code) {
    return new Promise((resolve, reject) => {
      authen
        .getAccessToken(user.ClientId, user.ClientSecret)
        .then((token) => {
          axios({
            method: 'GET',
            url: `https://public.kiotapi.com/customers/code${code}`,
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

   /**
   * user {object}:
   * @param {string} Retailer  shop's name
   * @param {string} ClientId
   * @param {string} ClientSecret
   */

  getCustomerGroup(user) {
    return new Promise((resolve, reject) => {
      authen
        .getAccessToken(user.ClientId, user.ClientSecret)
        .then((token) => {
          axios({
            method: 'GET',
            url: 'https://public.kiotapi.com/customers/group',
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

module.exports.customer = new Customer();
