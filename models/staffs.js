const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const staffSchema = new mongoose.Schema(
  {
    loginId: {
      type: ObjectId,
      ref: "logins",
    },
    clientId: {
      type: ObjectId,
      ref: "clients",
    },     
    firstName: {
      type: String,
      required: true,
      maxlength: 32,
    },
    lastName: {
      type: String,
      required: true,
      maxlength: 32,
    },   
  },
  { timestamps: true }
);

const staffModel = mongoose.model("staffs", staffSchema);
module.exports = staffModel;
