const axios = require('axios').default;
const qs = require('qs');

class Authen {
   getAccessToken(ClientId, ClientSecret) {
    const body = {
      copes: 'PublicApi.Access',
      grant_type: 'client_credentials',
      client_id: ClientId,
      client_secret: ClientSecret,
    };

    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios({
          method: 'POST',
          url: 'https://id.kiotviet.vn/connect/token',
          data: qs.stringify(body),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
        if (res) resolve(res.data);
      } catch (error) {
        console.log('error');
        // console.log(error);
        reject(error.response.data);
      }
    });
  }
}

module.exports.authen = new Authen();
