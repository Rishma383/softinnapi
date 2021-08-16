const mongoose = require("mongoose");

const usertypesSchema = new mongoose.Schema(
  {
    typeName: {
      type: String,
      required: true,
      maxlength: 32,
    },   
  },
  { timestamps: true }
);

const usertypesModel = mongoose.model("usertypes", usertypesSchema);
module.exports = usertypesModel;
