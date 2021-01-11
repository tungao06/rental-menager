const { authJwt } = require("../middlewares");
const express = require("express");

const controller = require("../controllers/user.controller");

const routes = new express.Router();

routes.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

routes.post("/users", controller.store);
routes.delete("/users", controller.delete);

// routes.get("/api/test/all", controller.allAccess);

// routes.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

// routes.get(
//   "/api/test/mod",
//   [authJwt.verifyToken, authJwt.isModerator],
//   controller.moderatorBoard
// );

// routes.get(
//   "/api/test/admin",
//   [authJwt.verifyToken, authJwt.isAdmin],
//   controller.adminBoard
// );

module.exports = routes;
