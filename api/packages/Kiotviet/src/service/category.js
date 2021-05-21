const axios = require('axios').default;
const { authen } = require('./authen');

class Category {
  /**
   * user {object}:
   * @param {string} Retailer  shop's name
   * @param {string} ClientId
   * @param {string} ClientSecret
   * body {object}:
   * @param {string} lastModifiedFrom
   * @param {number} pageSize max 100
   * @param {number} currentItem default 0
   * @param {string} orderBy // ex : categoryId
   * @param {string} orderDirection - Asc,Desc
   * @param {boolean} hierachicalData neu HierachicalData=true thi minh se lay nhom hang theo cap ma
      khong quan tam lastModifiedFrom. Nguoc lai, HierachicalData=false thi se lay 1 list nhom hang
      theo lastModifiedFrom nhung khong co phan cap
   */
  getCategories(user, body) {
    return new Promise((resolve, reject) => {
      authen.getAccessToken(user.ClientId, user.ClientSecret)
        .then((token) => {
          axios({
            method: 'GET',
            url: 'https://public.kiotapi.com/categories',
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
   * @param {numbre} id - category's id
   */
  getCategoryById(user, id) {
    return new Promise((resolve, reject) => {
      authen.getAccessToken(user.ClientId, user.ClientSecret)
        .then((token) => {
          axios({
            method: 'GET',
            url: `https://public.kiotapi.com/categories/${id}`,
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

module.exports.category = new Category();
