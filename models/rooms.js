const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const roomsSchema = new mongoose.Schema(
    {
     clientId: {
       type: ObjectId,
       ref: "clients",
     }, 
    roomtypeId: {
      type: ObjectId,
      ref: "roomtypes",
    }, 
    roomName: {
      type: String,
      required: true,
      maxlength: 32,
    }
    },
    { timestamps: true }
);

const roomsModel = mongoose.model("rooms", roomsSchema);
module.exports = roomsModel;