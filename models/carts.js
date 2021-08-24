const mongoose = require("mongoose");
const { ObjectId,Decimal } = mongoose.Schema.Types;
const cartSchema = new mongoose.Schema(
    {
      customerId: {
        type: ObjectId,
        ref: "customers",
      }, 
    menuItemId: {
        type: ObjectId,
        ref: "menuitems",
    }, 
    restaurantId: {
      type: ObjectId,
      ref: "restaurants",
    },
    tableId: {
      type: ObjectId,
      ref: "tables",
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

const cartModel = mongoose.model("carts", cartSchema);
module.exports = cartModel;