const axios = require('axios').default;
const { authen } = require('./authen');

class OrderSupplier {
  /**
   * user {object}:
   * @param {string} Retailer  shop's name
   * @param {string} ClientId
   * @param {string} ClientSecret
   * body {object}:
   * @param {number} branchId
   * @param {number} status
   * @param {string} productKey
   * @param {string} supplierKey
   * @param {string} userNamKey
   * @param {string} userNamCreatedKey
   * @param {string} expensesOthersIds
   * @param {string} descriptionKey
   * @param {string} codeKey
   * @param {string} purchaseOrderCode
   */
  getOrderSuppliers(user, body) {
    return new Promise((resolve, reject) => {
      authen
        .getAccessToken(user.ClientId, user.ClientSecret)
        .then((token) => {
          axios({
            method: 'GET',
            url: 'https://public.kiotapi.com/ordersuppliers',
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
   * @param {numbre} id - ordersupplier's id
   */
  getOrderSupplierById(user, id) {
    return new Promise((resolve, reject) => {
      authen
        .getAccessToken(user.ClientId, user.ClientSecret)
        .then((token) => {
          axios({
            method: 'GET',
            url: `https://public.kiotapi.com/ordersupplier/${id}`,
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

module.exports.orderSuppliers = new OrderSupplier();
