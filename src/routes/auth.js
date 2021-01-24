const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");
const respond = require("../utils/Responder");
const { celebrate } = require('celebrate');
const validator = require("../validators/");

router.post(
  "/users/signup",
  // celebrate(validator.signup),
  async (req, res) => {
    const response = await userController.signup(req);
    respond(res, response.status, response);
  }
);

router.post("/users/login", async (req, res) => {
  const response = await userController.login(req);
  respond(res, response.status, response);
});

module.exports = router;
