const User = require("../models").user;
const Commons = require("../utils/Commons");
const AuthController = require("../controllers/auth");

module.exports = {
  async signup(req) {
    let body = req.body;
    if (!body.username || !body.password) {
      return {
        status: 400,
        error: true,
        message: 'username or password missing'
      }
    }

    // Salt hash password
    body.password = await Commons.generatePasswordHash(body.password);

    let err = null;
    let response = await User.create(body).catch(error => {
      console.error(error);
      err = error.message;
    });
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
  async login(req) {
    let body = req.body;
    if (!body.username || !body.password)
      return {
        status: 400,
        error: true,
        message: 'username or password missing'
      }

    let user = await User.findOne({
      where: { username: body.username }
    });
    if (!user) return {
      status: 400,
      error: true,
      message: 'username not found'
    };
    if (Commons.compareHashes(user, body.password))
      return {
        status: 200,
        error: false,
        data: await AuthController.createAndRegisterToken(user)
      };
    else return {
      status: 400,
      error: true,
      message: 'error'
    };
  },
};
