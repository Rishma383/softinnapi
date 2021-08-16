const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const kitchensSchema = new mongoose.Schema(
    {
     clientId: {
       type: ObjectId,
       ref: "clients",
     },
     kitchenName: {
      type: String,
      required: true,
      maxlength: 32,
    }
    },
    { timestamps: true }
);

const kitchensModel = mongoose.model("kitchens", kitchensSchema);
module.exports = kitchensModel;