const mongoose = require("mongoose");

const clienttypeSchema = new mongoose.Schema(
  {
    typeName: {
      type: String,
      required: true,
      maxlength: 32,
    },   
  },
  { timestamps: true }
);

const clienttypeModel = mongoose.model("clienttype", clienttypeSchema);
module.exports = clienttypeModel;
