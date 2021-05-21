require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 8000,
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
};
