const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const userSchema = new mongoose.Schema(
  {
    loginId: {
      type: ObjectId,
      ref: "logins",
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
    // email: {
    //   type: String,
    //   required: true,
    //   trim: true,
    //   index: { unique: true },
    //   match: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
    // },
    // password: {
    //   type: String,
    //   required: true,
    // },
    // role: {
    //   type: Number,
    //   //default: 2, // By default 2 for Admin signup 1 for Super-admin signup
    //   required: true,
    // },
    // roleType: {
    //   type: String,
    //   required: true,
    // },   
    // userImage: {
    //   type: String,
    //   default: "user.png",
    // },
		// otp: {
    //   type: Number,
    //   default: 0,
    // },
    // verified: {
    //   type: String,
    //   default: false,
    // },
    // secretKey: {
    //   type: String,
    //   default: null,
    // },
    // history: {
    //   type: Array,
    //   default: [],
    // },
  },
  { timestamps: true }
);

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
