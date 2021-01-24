const Stocks = require("../models").stocks;
let redis = require("redis");
const config = require("../config");
const uitl = require("util");

module.exports = {
  async dropdown() {
    let err = null;
    let client = redis.createClient(config.redis);
    client.get = uitl.promisify(client.get);
    let cachedShares = await client.get("shares");
    let response = null;
    if (cachedShares) {
      response = JSON.parse(cachedShares);
    } else {
      response = await Stocks.findAll({}).catch(error => {
        console.error(error);
        err = error.message;
      });
      client.set("shares", JSON.stringify(response));
    }
    if (err) return {
      status: 400,
      error: true,
      message: err.message,
    };
    else
      return {
        status: 200,
        error: false,
        data: response
      }
  },
};
