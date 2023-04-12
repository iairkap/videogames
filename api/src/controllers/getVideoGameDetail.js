const axios = require("axios");
const { Videogame, Genre } = require("../db.js");
const { API_KEY, URL } = process.env;

module.exports = {
  getVideoGameDetail,
};
