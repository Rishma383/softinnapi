const mongoose = require("mongoose");
const { ObjectId,Decimal } = mongoose.Schema.Types;
const orderschema = new mongoose.Schema(
    {
      customerId: {
        type: ObjectId,
        ref: "customers",
      },     
    totalAmount: {
      type: Decimal,
      required: true,
      maxlength: 32,
    },   
},
{ timestamps: true }
);

const orderModel = mongoose.model("orders", orderschema);
module.exports = orderModel;