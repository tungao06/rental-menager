const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.room = require("./room.model");

db.ROLES = ["admin", "user", "moderator"];

module.exports = db;
