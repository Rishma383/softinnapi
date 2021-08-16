const mongoose = require("mongoose");
const { ObjectId,Decimal } = mongoose.Schema.Types;
const menuitemsSchema = new mongoose.Schema(
    {
      restaurantId: {
        type: ObjectId,
        ref: "restaurants",
      },
     menucode: {
      type: String,
      ref: "menucodes",
    },
     menuitemName: {
      type: String,
      required: true,
      maxlength: 32,
    },
    description: {
     type: String,
     required: true,
     maxlength: 32,
   },
   itemIs: {
    type: String,
    required: true,
    maxlength: 50,
  },
  dessertIs: {
    type: String,   
    maxlength: 50,
  },
  categoryId: {
    type: ObjectId,
    ref: "itemcategories",
  },
  itemTypeId: {
    type: ObjectId,
    ref: "itemtypes",
  },
  kitchenId: {
    type: ObjectId,
    ref: "kitchens",
  },
  price: {
    type: Decimal,
    required: true,
    maxlength: 32,
  },
  priceOfferTax: {
    type: Decimal,
    required: true,
    maxlength: 32,
  },
  availability: {
    type: String,
    required: true,
    maxlength: 50,
  },
  finalItemPrice: {
    type: Decimal,
    required: true,
    maxlength: 32,
  },
  roomTypeId: {
    type:String,
    // type: ObjectId,
    // ref: "roomtypes",
  },
  showInRoomMenu:{
    type:String,
    required:true
  },
  displayOnDays: {
    type: String,    
    maxlength: 1000,
  },
  fromTime:{
    type:String,
    required:true
  },
  toTime:{
    type:String,
    required:true
  },
  itemImage: {
    type: Array,
    required: true,
  },
 },
 { timestamps: true }
);

const menuitemsModel = mongoose.model("menuitems", menuitemsSchema);
module.exports = menuitemsModel;