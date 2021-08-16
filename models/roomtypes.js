const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const roomTypeSchema = new mongoose.Schema(
    {
      clientId: {
        type: ObjectId,
        ref: "clients",
      }, 
      typeName: {
        type: String,
        required: true,
        maxlength: 32,
      }
    },
    { timestamps: true }
);

const roomTypeModel = mongoose.model("roomtypes", roomTypeSchema);
module.exports = roomTypeModel;