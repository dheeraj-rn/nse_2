const dotenv = require('dotenv');

dotenv.config();
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 3000;

module.exports = {

    port: parseInt(PORT, 10),
    pg_url: process.env.DATABASE_URL,
    jwt_secret: process.env.JWT_SECRET,
    redis: process.env.REDIS_TLS_URL,
    stock_api_key: process.env.MARKET_API_KEY
};
