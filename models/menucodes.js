const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const menucodesSchema = new mongoose.Schema(
    {
      restaurantId: {
       type: ObjectId,
       ref: "restaurants",
     },
     menucodeName: {
      type: String,
      required: true,
      maxlength: 32,
    },
    menuCode: {
     type: String,
     required: true,
     maxlength: 32,
   },
   taxName: {
    type: String,
    required: true,
    maxlength: 32,
  },
  taxAmount: {
    type: Number,
    required: true,
    maxlength: 32,
  }
 },
 { timestamps: true }
);

const menucodesModel = mongoose.model("menucodes", menucodesSchema);
module.exports = menucodesModel;