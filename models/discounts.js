const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const discountsSchema = new mongoose.Schema(
    {
     clientId: {
       type: ObjectId,
       ref: "clients",
     },
     discountName: {
      type: String,
      required: true,
      maxlength: 32,
    },
    discountType: {
     type: String,
     required: true,
     maxlength: 32,
   },
   discountAmount: {
    type: String,
    required: true,
    maxlength: 32,
  }
 },
 { timestamps: true }
);

const discountsModel = mongoose.model("discounts", discountsSchema);
module.exports = discountsModel;