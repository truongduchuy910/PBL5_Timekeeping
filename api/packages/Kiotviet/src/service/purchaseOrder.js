const axios = require('axios').default;
const { authen } = require('./authen');

class PurchaseOrder {
  /**
   * user {object}:
   * @param {string} Retailer  shop's name
   * @param {string} ClientId
   * @param {string} ClientSecret
   * body {object}:
   * @param {number} pageSize  max 100
   * @param {number[]} branchIds
   * @param {number[]} status
   * @param {boolean} includePayment
   * @param {boolean} includeOrderDelivery
   * @param {number} currentItem default 0
   */
  getPurchaseOrders(user, body) {
    return new Promise((resolve, reject) => {
      authen
        .getAccessToken(user.ClientId, user.ClientSecret)
        .then((token) => {
          axios({
            method: 'GET',
            url: 'https://public.kiotapi.com/purchaseorders',
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
   * @param {numbre} id - purchaseorder's id
   */
  getPurchaseOrderById(user, id) {
    return new Promise((resolve, reject) => {
      authen
        .getAccessToken(user.ClientId, user.ClientSecret)
        .then((token) => {
          axios({
            method: 'GET',
            url: `https://public.kiotapi.com/purchaseorders/${id}`,
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

module.exports.purchaseOrder = new PurchaseOrder();
