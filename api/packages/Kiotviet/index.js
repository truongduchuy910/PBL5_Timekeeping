const kiotvietApi = require('./src/service');
const {authen} = require('./src/service/authen');
class Kiotviet {
  api;
  token;
  /**
   * @param {kiotvietApi} kiotvietApi
   */
  constructor(kiotvietApi)
  {
    this.api = kiotvietApi;
  }
  setToken(token) {
    this.token = token;
  }
  getToken(){
    return this.token;
  }
}
module.exports.kiotviet = new Kiotviet(kiotvietApi);
