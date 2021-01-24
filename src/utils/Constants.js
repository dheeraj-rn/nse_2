module.exports = {
    RESPONSE_CODES: {
        REQUEST_OK: 200,
        BAD_REQUEST: 400,
        SERVER_ERROR: 500,
        UN_AUTHORIZED: 401,
        NOT_FOUND: 404
    }
};

console.log("Process.ENV", process.env.NODE_ENV)
