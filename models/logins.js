const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const loginSchema = new mongoose.Schema(
  {
    userName: {
        type: String,
        required: true,
        maxlength: 32,
      },
    email: {
        type: String,
        required: true,
        trim: true,
        index: { unique: true },
        match: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
      },
      password: {
        type: String,
        required: true,
      },  
      phone: {
        type: String,
      },     
      userTypeId: {
        type: ObjectId,
        ref: "usertype",
      },
},
{ timestamps: true }
);

const loginModel = mongoose.model("logins", loginSchema);
module.exports = loginModel;
