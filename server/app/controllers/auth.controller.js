const config = require("../config/auth.config");
const error = require("./error.controller");
const db = require("../models");
const User = db.user;
const Role = db.role;
const TokenLog = db.token_log;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    phone: req.body.phone,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  if (req.body.roles) {
    Role.find(
      {
        name: { $in: req.body.roles },
      },
      (err, role) => {
        if (err) {
          error.InternalServerError({ message: err }, res);
          return;
        }
        if (!role) {
          return error.Forbidden(
            {
              message: "username or email already taken",
            },
            res
          );
        }
        user.roles = role.map((role) => role._id);
        user.save((err) => {
          if (err) {
            error.InternalServerError({ message: err }, res);
            return;
          }

          res.send({
            success: true,
            result: { user, message: "User was registered successfully!" },
          });
        });
      }
    );
  } else {
    Role.findOne({ name: "user" }, (err, role) => {
      if (err) {
        error.InternalServerError({ message: err }, res);
        return;
      }
      if (!role) {
        return error.Forbidden(
          {
            message: "username or email already taken",
          },
          res
        );
      }

      user.roles = [role._id];
      user.save((err) => {
        if (err) {
          error.InternalServerError({ message: err }, res);
          return;
        }

        res.status(200).send({
          success: true,
          result: { user, message: "User was registered successfully!" },
        });
      });
    });
  }
};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username,
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        error.InternalServerError({ message: err }, res);
        return;
      }

      if (!req.body.passwordIsValid) {
        return error.Forbidden({ message: "Invalid Password!" }, res);
      }

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        success: true,
        result: {
          id: user._id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: req.body.accessToken,
          logModified: req.body.nModified,
          message: "User was signin successfully!",
        },
      });
    });
};

exports.remove = (req, res) => {
  User.deleteOne({ _id: req.params._id }).exec((err, data) => {
    if (err) {
      error.InternalServerError({ message: err }, res);
      return;
    }
    if (data.n === 1) {
      TokenLog.deleteOne({ users: req.params._id }).exec((err, data) => {
        if (err) {
          error.InternalServerError({ message: err }, res);
          return;
        }
        if (data.n === 1) {
          res.status(200).send({
            success: true,
            result: { message: "user account deleted from db" },
          });
        } else {
          res.status(200).send({
            success: true,
            result: {
              message: "user account deleted from db but not find in logdb",
            },
          });
        }
      });
    } else {
      error.NotFound({ message: "no user with that _id to delete" }, res);
    }
  });
};
