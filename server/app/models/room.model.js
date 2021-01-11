const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RoomSchema = new Schema(
  {
    room_no: { type: String, required: true },
    room_name: { type: String, required: true },
    summary: { type: String },
    room_type: { type: String },
    description: { type: String },
    beds: { type: Number, default: 0 },
    accommodates: { type: Number, default: 0 },
    price: { type: Number, default: 0 },
    cleaning_fee: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Room = mongoose.model("room", RoomSchema);
module.exports = Room;
