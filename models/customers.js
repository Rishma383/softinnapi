const mongoose = require("mongoose");
//const { ObjectId } = mongoose.Schema.Types;
const customersSchema = new mongoose.Schema(
    {
    fullName: {
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
    phone: {
      type: String,
      required: true,
      maxlength: 15,
    }, 
    },
    { timestamps: true }
);

const customersModel = mongoose.model("customers", customersSchema);
module.exports = customersModel;