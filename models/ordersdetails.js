const mongoose = require("mongoose");
const { ObjectId,Decimal } = mongoose.Schema.Types;
const ordersdetailSchema = new mongoose.Schema(
  {
    orderId: {
      type: ObjectId,
      ref: "orders",
    }, 
    restaurantId: {
      type: ObjectId,
      ref: "restaurants",
    },
    tableId: {
      type: ObjectId,
      ref: "tables",
    },
    menuItemId: {
      type: ObjectId,
      ref: "menuitems",
    },     
    menuitemName: {
      type: String,
      required: true,
      maxlength: 32,
    },
    finalItemPrice: {
      type: Decimal,
      required: true,
      maxlength: 32,
    },
    itemImage: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    }, 
},
{ timestamps: true }
);

const ordersdetailsModel = mongoose.model("ordersdetails", ordersdetailSchema);
module.exports = ordersdetailsModel;