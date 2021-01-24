const express = require("express");
const router = express.Router();
const stockController = require("../controllers/stocks");
const respond = require("../utils/Responder");
const { celebrate } = require('celebrate');
const validator = require("../validators/");
const AuthController = require("../controllers/auth");

router.get(
  "/dropdown",
  // celebrate(validator.signup),
  AuthController.verifyToken,
  async (req, res) => {
    const response = await stockController.dropdown();
    respond(res, response.status, response);
  }
);

router.post("/users/login", async (req, res) => {
  const response = await userController.login(req);
  respond(res, response.status, response);
});

module.exports = router;
