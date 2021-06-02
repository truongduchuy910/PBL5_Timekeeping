const fetch = require("node-fetch");
class TFace {
  mode = "Test";
  url =
    this.mode === "Test"
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
  const { message } = await tface.uploadByUrls(
    [
      "http://cb.dut.udn.vn/ImageSV/18/102180229.jpg",
      "http://cb.dut.udn.vn/ImageSV/18/102180229.jpg",
      "http://cb.dut.udn.vn/ImageSV/18/102180229.jpg",
      "http://cb.dut.udn.vn/ImageSV/18/102180229.jpg",
      "http://cb.dut.udn.vn/ImageSV/18/102180229.jpg",
      "http://cb.dut.udn.vn/ImageSV/18/102180229.jpg",
      "http://cb.dut.udn.vn/ImageSV/18/102180229.jpg",
      "http://cb.dut.udn.vn/ImageSV/18/102180229.jpg",
      "http://cb.dut.udn.vn/ImageSV/18/102180229.jpg",
      "http://cb.dut.udn.vn/ImageSV/18/102180229.jpg",
      "http://cb.dut.udn.vn/ImageSV/18/102180229.jpg",
      "http://cb.dut.udn.vn/ImageSV/18/102180229.jpg",
      "http://cb.dut.udn.vn/ImageSV/18/102180229.jpg",
      "http://cb.dut.udn.vn/ImageSV/18/102180229.jpg",
      "http://cb.dut.udn.vn/ImageSV/18/102180229.jpg",
      "http://cb.dut.udn.vn/ImageSV/18/102180229.jpg",
      "http://cb.dut.udn.vn/ImageSV/18/102180229.jpg",
      "http://cb.dut.udn.vn/ImageSV/18/102180229.jpg",
      "http://cb.dut.udn.vn/ImageSV/18/102180229.jpg",
      "http://cb.dut.udn.vn/ImageSV/18/102180229.jpg",
    ],
    "tran-ngoc-huy"
  );
  console.log(message);
  const { name_list_rp } = await tface.getIdByUrls([
    "http://cb.dut.udn.vn/ImageSV/18/102180229.jpg",
  ]);
  console.log(name_list_rp);
  const { message: deleteMessage } = await tface.deleteById("1");
  console.log(deleteMessage);
})();
