const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.room = require("./room.model");
db.token_log = require("./token_log.model");

db.ROLES = ["master", "admin", "user"];

module.exports = db;
