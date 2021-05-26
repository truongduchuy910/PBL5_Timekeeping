------------ Upload by Urls ------------------

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({"url_list":["http://cb.dut.udn.vn/ImageSV/18/102180229.jpg","https://t-f18-zpg.zdn.vn/480/1632328878460392940/0af12ee54833bd6de422.jpg","https://t-f37-zpg.zdn.vn/480/3698243211045233685/ffff6b0500d3f58dacc2.jpg"],"txtusername":"Thuan2"});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://0.0.0.0:8000/uploadByUrls", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  
  ------------ Identified by Urls ------------------
  
  var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = "{\n    \"url_list\": [\"http://cb.dut.udn.vn/ImageSV/18/102180229.jpg\", \"https://t-f18-zpg.zdn.vn/480/1632328878460392940/0af12ee54833bd6de422.jpg\", \"https://t-f37-zpg.zdn.vn/480/3698243211045233685/ffff6b0500d3f58dacc2.jpg\"],\n}";

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://0.0.0.0:8000/identifiedStrList", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  
 ------------ Delete by id ------------------
 
 var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({"id":"Thuan2"});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://0.0.0.0:8000/deleteById", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
