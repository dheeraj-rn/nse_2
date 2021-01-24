const axios = require("axios");
const Stocks = require("../models").stocks;
const { v4: uuidv4 } = require('uuid');
let redis = require("redis");
const config = require("../config");


module.exports = {
    async populate() {

        try {
            let response = await axios.get('https://marketstack.com/stock_api.php?&exchange=XNSE&search=&offset=0');
            symbolData = {};
            response.data.data.slice(0, 20).forEach((el) => {
                symbolData[el.symbol] = el.name;
            });
            let stocksInfo = [];
            for (let symbol of Object.keys(symbolData)) {
                let stockInfo = await axios.get(`http://api.marketstack.com/v1/eod?access_key=${config.stock_api_key}&symbols=${symbol}&limit=1&offset=0`);
                setTimeout(function () { console.log('sleeping for 5 seconds') }, 5000);
                stocksInfo.push(stockInfo);
            }
            stocksInfo = stocksInfo.map((el) => {
                return el.data ? {
                    id: uuidv4(),
                    symbol: el.data.data[0].symbol,
                    name: symbolData[el.data.data[0].symbol],
                    open: el.data.data[0].open,
                    high: el.data.data[0].high,
                    low: el.data.data[0].low,
                    close: el.data.data[0].close,
                    volume: el.data.data[0].volume,
                    date: el.data.data[0].date,
                } : el.error.data;
            });
            // console.log(stocksInfo);
            let stockPromise = [];
            for (let stock of stocksInfo) {
                let dbdata = Stocks.upsert(stock);
                stockPromise.push(dbdata);
            }
            let dbResponse = await Promise.all(stockPromise);
            console.log(dbResponse);
            let client = redis.createClient(config.redis);
            client.flushall();
            return null;

        } catch (err) {
            console.log(err)
            return null;
        }

    }
};