const { LocalFileAdapter } = require("@itoa/file-adapters");
module.exports = {
  imageAdapter: new LocalFileAdapter({
    src: "./public/upload/img",
    path: "/upload/img",
  }),
  fileAdapter: new LocalFileAdapter({
    src: "./public/upload/file",
    path: "/upload/file",
  }),
};
