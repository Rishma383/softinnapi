const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const restaurantSchema = new mongoose.Schema(
    {
      clientId: {
      type: ObjectId,
      ref: "clients",
    }, 
    countryId: {
      type: String,
      required: true,
    }, 
    stateId: {
      type: String,
      required: true,
    }, 
    restaurantName: {
        type: String,
        required: true,
        maxlength: 60,
      },
    restaurantAddress: {
      type: String,
      required: true,
      maxlength: 60,
    },
    addressLine: {
      type: String,
      required: true,
      maxlength: 50,
    },
    cityName: {
      type: String,
      required: true,
      maxlength: 32,
    },
    postCode: {
      type: String,
      required: true,
      maxlength: 15,
    },
    fromTime: {
      type: String,
      required: true,
      maxlength: 15,
    },
    toTime: {
      type: String,
      required: true,
      maxlength: 15,
    },
},
{ timestamps: true }
);

const restaurantModel = mongoose.model("restaurants", restaurantSchema);
module.exports = restaurantModel;