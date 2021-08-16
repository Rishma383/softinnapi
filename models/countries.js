const mongoose = require("mongoose");

const countriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
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

const countriesModel = mongoose.model("countries", countriesSchema);
module.exports = countriesModel;
