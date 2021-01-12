const jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const config = require("../config/auth.config.js");
const error = require("../controllers/error.controller");
const db = require("../models");

const User = db.user;
const TokenLog = db.token_log;

insertLogTokenSignIn = (req, res, next) => {
  User.findOne({ username: req.body.username })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        error.InternalServerError({ message: err }, res);
        return;
      }

      if (!user) {
        return error.NotFound({ message: "User Not found." }, res);
      }
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });
      TokenLog.updateOne(
        { users: { $in: user._id } },
        { $set: { access_token: token } },
        { upsert: true } // ?? no documents found, insert a new document
      )
        .then((resp) => {
          req.body.nModified = resp.nModified;
          req.body.accessToken = token;
          req.body.passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
          );
          next();
          return;
        })
        .catch((err) => {
          error.InternalServerError({ message: err }, res);
          return;
        });
    });
};

const authLog = { insertLogTokenSignIn };
module.exports = authLog;
