/* eslint-disable no-useless-catch */
const axios = require('axios').default;
const { authen } = require('./authen');

class Product {
  /**
   * user {object}:
   * @param {string} Retailer  shop's name
   * @param {string} ClientId
   * @param {string} ClientSecret
   * body {object}:
   * @param {string} orderBy
   * @param {string} orderDirection - Asc,Desc
   * @param {string} lastModifiedFrom
   * @param {number} pageSize  max 100
   * @param {number} currentItem default 0
   * @param {boolean} includeInventory
   * @param {boolean} includePricebook
   * @param {boolean} IncludeSerials serial imei
   * @param {boolean} IncludeBatchExpires
   * @param {number} masterUnitId id hang hoa don vi can filter
   * @param {number} masterProductId id hang hoa cung loai can filter
   * @param {number} categoryId id nhom hang can filter
   * @param {boolean} includeRemoveIds
   * @param {number} productType -1: combo -3: dich vu -2 con lai
   * @param {boolean} includeMaterial danh sach hang thanh phan
   */
  async getProducts(user, body) {
    return new Promise(async (resolve, reject) => {
      try {
        const token = await authen.getAccessToken(user.ClientId, user.ClientSecret);
        const res = await
          axios({
            method: 'GET',
            url: 'https://public.kiotapi.com/products',
            data: body,
            headers: {
              Retailer: user.Retailer,
              Authorization: `${token.token_type} ${token.access_token}`,
            },
          });
          if (res) resolve(res.data);
      } catch (error) {
        reject(error.response.data);
      }
    });
  }

  /**
   * user {object}:
   * @param {string} Retailer  shop's name
   * @param {string} ClientId
   * @param {string} ClientSecret
   *
   * @param {numbre} id - product's id
   */
  getProductById(user, token, id) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios({
          method: 'GET',
          url: `https://public.kiotapi.com/products/${id}`,
          headers: {
            Retailer: user.Retailer,
            Authorization: `${token.token_type} ${token.access_token}`,
          },
        });
        if (res) resolve(res.data);
      } catch (error) {
         reject(error.response.data);
      }
    });
  }

  /**
   * user {object}:
   * @param {string} Retailer  shop's name
   * @param {string} ClientId
   * @param {string} ClientSecret
   * body {object}:
   * @param {numbre} code - product's code
   */

  getProductByCode(user, token, code) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios({
          method: 'GET',
          url: `https://public.kiotapi.com/products/code${code}`,
          headers: {
            Retailer: user.Retailer,
            Authorization: `${token.token_type} ${token.access_token}`,
          },
        });
        if (res) resolve(res.data);
      } catch (error) {
         reject(error.response.data);
      }
    });
  }

  /**
   * user {object}:
   * @param {string} Retailer  shop's name
   * @param {string} ClientId
   * @param {string} ClientSecret
   *
   */
  // this shit doesn't work
  getProductAttribute(user) {
    return new Promise((resolve, reject) => {
      authen
        .getAccessToken(user.ClientId, user.ClientSecret)
        .then((token) => {
          axios({
            method: 'GET',
            url: 'https://public.kiotapi.com/attributes/allwithdistinctvalue',
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

module.exports.product = new Product();
// ok
