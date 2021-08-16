const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const clientSchema = new mongoose.Schema(
  {
    loginId: {
      type: ObjectId,
      ref: "logins",
    }, 
    language: {
      type: String,
      required: true,
      maxlength: 32,
    },
    hotelRestName: {
      type: String,
      required: true,
      maxlength: 32,
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
    currency: {
      type: String,
      default: "INR",
      required: true,
    },	
    timeZone: {
      type: String,
      default: false,
      required: true,
    },
    timeFormat: {
      type: String,
      required: true,
    },
    dateFormat: {
      type: String,
      required: true,
    },
    commission:{
      type: Number,
      default: 0,
      required: true,
    },
    taxCommission:{
      type: Number,
      default: 0,
      required: true,
    },   
  },
  { timestamps: true }
);

const clientModel = mongoose.model("clients", clientSchema);
module.exports = clientModel;
