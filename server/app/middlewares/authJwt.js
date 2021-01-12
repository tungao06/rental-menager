const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const error = require("../controllers/error.controller");
const db = require("../models");
const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return error.Forbidden({ message: "No token provided!" }, res);
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return error.Unauthorized({ message: "Unauthorized!" }, res);
    }
    req.userId = decoded.id;
    next();
  });
};

isMaster = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      error.InternalServerError({ message: err }, res);
      return;
    }
    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          error.InternalServerError({ message: err }, res);
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "master") {
            next();
            return;
          }
        }
        error.Forbidden({ message: "Require Master Role!" }, res);
        return;
      }
    );
  });
};

isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      error.InternalServerError({ message: err }, res);
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          error.InternalServerError({ message: err }, res);
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }

        error.Forbidden({ message: "Require Admin Role!" }, res);
        return;
      }
    );
  });
};

isUser = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      error.InternalServerError({ message: err }, res);
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          error.InternalServerError({ message: err }, res);
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "user") {
            next();
            return;
          }
        }

        error.Forbidden({ message: "Require User Role!" }, res);
        return;
      }
    );
  });
};

const authJwt = {
  verifyToken,
  isMaster,
  isAdmin,
  isUser,
};
module.exports = authJwt;
