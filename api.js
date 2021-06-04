const fetch = require("node-fetch");
class TFace {
  mode = "Test";
  url =
    this.mode === false
      ? `http://d3f205c6b472.ngrok.io`
      : `https://tfacev1project.herokuapp.com`;

  option = {
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    method: "POST",
    redirect: "follow",
  };
  constructor(mode) {
    if (mode === "production") this.mode = "";
  }
  /**
   * @param {Array.<String>} urls
   * @param {String} id
   * @returns
   */
  async uploadByUrls(urls, id) {
    const url = `${this.url}/uploadByUrls${this.mode}`;
    console.log(url);
    const body = JSON.stringify({
      url_list: urls,
      txtusername: id,
    });
    const response = await fetch(url, {
      ...this.option,
      body,
    });
    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else console.error(response.status, response.statusText);
  }
  /**
   * @param {Array.<String>} urls
   * @returns {name_list_rp: Array.<String>}
   */
  async getIdByUrls(urls) {
    const url = `${this.url}/identifiedStrList${this.mode}`;
    console.log(url);
    const body = JSON.stringify({
      url_list: urls,
    });
    const response = await fetch(url, {
      ...this.option,
      body,
    });
    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else console.error(response.statusText);
  }
  /**
   * @param {String} id
   * @returns
   */
  async deleteById(id) {
    const url = `${this.url}/deleteById${this.mode}`;
    console.log(url);
    const body = JSON.stringify({
      id,
    });
    const response = await fetch(url, {
      ...this.option,
      body,
    });
    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else console.error(response.statusText);
  }
}
(async () => {
  const tface = new TFace();
  // const uploadByUrls = await tface.uploadByUrls(
  //   [
  //     "https://scontent-hkg4-2.xx.fbcdn.net/v/t1.6435-9/120660089_393393651679331_1736612289947580072_n.jpg?_nc_cat=111&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=WdxI6LNNORYAX_aO8hA&_nc_ht=scontent-hkg4-2.xx&oh=00ea2a8a1b4aec1845fa6f40af74b205&oe=60DDA1CF",
  //     "https://scontent.fdad2-1.fna.fbcdn.net/v/t1.6435-9/97809765_301050514246979_4483881806176714752_n.jpg?_nc_cat=100&ccb=1-3&_nc_sid=174925&_nc_ohc=70ysF2VTy-IAX-NO6AM&_nc_ht=scontent.fdad2-1.fna&oh=0ff5879dda5b909f3bf475de873ccc7f&oe=60DE7FF0",
  //     "https://scontent.fdad2-1.fna.fbcdn.net/v/t1.6435-9/56578205_163129111372454_5737897709830930432_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=174925&_nc_ohc=tEdt-7lanr8AX_Ytw68&_nc_ht=scontent.fdad2-1.fna&oh=32a1966f42869d999418eb55670341f4&oe=60DE1357",
  //     "https://scontent.fdad2-1.fna.fbcdn.net/v/t1.6435-9/58377893_165968861088479_2752142088962310144_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=730e14&_nc_ohc=Nr5Pa6idTS0AX-n3eK4&_nc_ht=scontent.fdad2-1.fna&oh=27d5f211da14ced95e04f044f145cc40&oe=60DE723A",
  //     "https://scontent-hkg4-1.xx.fbcdn.net/v/t1.6435-9/60047210_170309117321120_7903570071883087872_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=730e14&_nc_ohc=a2Y0d1ygaJEAX9AyiM8&_nc_ht=scontent-hkg4-1.xx&oh=9ca579cbfcb763a2135284dac3d2c87d&oe=60E1348C",
  //     "https://scontent-hkg4-2.xx.fbcdn.net/v/t1.6435-9/120660089_393393651679331_1736612289947580072_n.jpg?_nc_cat=111&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=WdxI6LNNORYAX_aO8hA&_nc_ht=scontent-hkg4-2.xx&oh=00ea2a8a1b4aec1845fa6f40af74b205&oe=60DDA1CF",
  //     "https://scontent.fdad2-1.fna.fbcdn.net/v/t1.6435-9/97809765_301050514246979_4483881806176714752_n.jpg?_nc_cat=100&ccb=1-3&_nc_sid=174925&_nc_ohc=70ysF2VTy-IAX-NO6AM&_nc_ht=scontent.fdad2-1.fna&oh=0ff5879dda5b909f3bf475de873ccc7f&oe=60DE7FF0",
  //     "https://scontent.fdad2-1.fna.fbcdn.net/v/t1.6435-9/56578205_163129111372454_5737897709830930432_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=174925&_nc_ohc=tEdt-7lanr8AX_Ytw68&_nc_ht=scontent.fdad2-1.fna&oh=32a1966f42869d999418eb55670341f4&oe=60DE1357",
  //     "https://scontent.fdad2-1.fna.fbcdn.net/v/t1.6435-9/58377893_165968861088479_2752142088962310144_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=730e14&_nc_ohc=Nr5Pa6idTS0AX-n3eK4&_nc_ht=scontent.fdad2-1.fna&oh=27d5f211da14ced95e04f044f145cc40&oe=60DE723A",
  //     "https://scontent-hkg4-1.xx.fbcdn.net/v/t1.6435-9/60047210_170309117321120_7903570071883087872_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=730e14&_nc_ohc=a2Y0d1ygaJEAX9AyiM8&_nc_ht=scontent-hkg4-1.xx&oh=9ca579cbfcb763a2135284dac3d2c87d&oe=60E1348C",
  //     "https://scontent-hkg4-2.xx.fbcdn.net/v/t1.6435-9/120660089_393393651679331_1736612289947580072_n.jpg?_nc_cat=111&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=WdxI6LNNORYAX_aO8hA&_nc_ht=scontent-hkg4-2.xx&oh=00ea2a8a1b4aec1845fa6f40af74b205&oe=60DDA1CF",
  //     "https://scontent.fdad2-1.fna.fbcdn.net/v/t1.6435-9/97809765_301050514246979_4483881806176714752_n.jpg?_nc_cat=100&ccb=1-3&_nc_sid=174925&_nc_ohc=70ysF2VTy-IAX-NO6AM&_nc_ht=scontent.fdad2-1.fna&oh=0ff5879dda5b909f3bf475de873ccc7f&oe=60DE7FF0",
  //     "https://scontent.fdad2-1.fna.fbcdn.net/v/t1.6435-9/56578205_163129111372454_5737897709830930432_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=174925&_nc_ohc=tEdt-7lanr8AX_Ytw68&_nc_ht=scontent.fdad2-1.fna&oh=32a1966f42869d999418eb55670341f4&oe=60DE1357",
  //     "https://scontent.fdad2-1.fna.fbcdn.net/v/t1.6435-9/58377893_165968861088479_2752142088962310144_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=730e14&_nc_ohc=Nr5Pa6idTS0AX-n3eK4&_nc_ht=scontent.fdad2-1.fna&oh=27d5f211da14ced95e04f044f145cc40&oe=60DE723A",
  //     "https://scontent-hkg4-1.xx.fbcdn.net/v/t1.6435-9/60047210_170309117321120_7903570071883087872_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=730e14&_nc_ohc=a2Y0d1ygaJEAX9AyiM8&_nc_ht=scontent-hkg4-1.xx&oh=9ca579cbfcb763a2135284dac3d2c87d&oe=60E1348C",
  //     "https://scontent-hkg4-2.xx.fbcdn.net/v/t1.6435-9/120660089_393393651679331_1736612289947580072_n.jpg?_nc_cat=111&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=WdxI6LNNORYAX_aO8hA&_nc_ht=scontent-hkg4-2.xx&oh=00ea2a8a1b4aec1845fa6f40af74b205&oe=60DDA1CF",
  //     "https://scontent.fdad2-1.fna.fbcdn.net/v/t1.6435-9/97809765_301050514246979_4483881806176714752_n.jpg?_nc_cat=100&ccb=1-3&_nc_sid=174925&_nc_ohc=70ysF2VTy-IAX-NO6AM&_nc_ht=scontent.fdad2-1.fna&oh=0ff5879dda5b909f3bf475de873ccc7f&oe=60DE7FF0",
  //     "https://scontent.fdad2-1.fna.fbcdn.net/v/t1.6435-9/56578205_163129111372454_5737897709830930432_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=174925&_nc_ohc=tEdt-7lanr8AX_Ytw68&_nc_ht=scontent.fdad2-1.fna&oh=32a1966f42869d999418eb55670341f4&oe=60DE1357",
  //     "https://scontent.fdad2-1.fna.fbcdn.net/v/t1.6435-9/58377893_165968861088479_2752142088962310144_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=730e14&_nc_ohc=Nr5Pa6idTS0AX-n3eK4&_nc_ht=scontent.fdad2-1.fna&oh=27d5f211da14ced95e04f044f145cc40&oe=60DE723A",
  //     "https://scontent-hkg4-1.xx.fbcdn.net/v/t1.6435-9/60047210_170309117321120_7903570071883087872_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=730e14&_nc_ohc=a2Y0d1ygaJEAX9AyiM8&_nc_ht=scontent-hkg4-1.xx&oh=9ca579cbfcb763a2135284dac3d2c87d&oe=60E1348C",
  //   ],
  //   "tran-ngoc-huy"
  // );
  // console.log(uploadByUrls);
  const { name_list_rp } = await tface.getIdByUrls([
    "https://scontent-hkg4-2.xx.fbcdn.net/v/t1.6435-9/120660089_393393651679331_1736612289947580072_n.jpg?_nc_cat=111&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=WdxI6LNNORYAX_aO8hA&_nc_ht=scontent-hkg4-2.xx&oh=00ea2a8a1b4aec1845fa6f40af74b205&oe=60DDA1CF",
  ]);
  console.log(name_list_rp);
  const { message: deleteMessage } = await tface.deleteById("5");
  console.log(deleteMessage);
})();
