const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TokenLogSchema = new Schema(
  {
    access_token: {
      type: String,
      required: true,
      unique: true,
    },

    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  { timestamps: true }
);

const TokenLog = mongoose.model("token_log", TokenLogSchema);
module.exports = TokenLog;
