const { verifySignUp } = require("../middlewares");
const express = require("express");

const controller = require("../controllers/auth.controller");

const routes = new express.Router();

routes.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

routes.post(
  "/signup",
  [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],
  controller.signup
);

routes.post("/signin", controller.signin);

module.exports = routes;
