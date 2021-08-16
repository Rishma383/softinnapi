const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const statesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
    },   
    countryCode:{
      type: String,
      required: true,
      maxlength: 5,
    },
    code: {
        type: String,
        required: true,
        maxlength: 5,
      },  
     active: {
        type: Boolean,
      },  
  },   
  { timestamps: true }
);

const statesModel = mongoose.model("states", statesSchema);
module.exports = statesModel;
