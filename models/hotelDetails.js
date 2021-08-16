const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const hotelDetailsSchema = new mongoose.Schema(
    {
      clientId: {
        type: ObjectId,
        ref: "clients",
      }, 
    countryCode: {
      type: String,
      required: true,
    }, 
    stateCode: {
      type: String,
      required: true,
    }, 
    hotelAddress: {
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
},
{ timestamps: true }
);

const hotelDetailsModel = mongoose.model("hotelDetails", hotelDetailsSchema);
module.exports = hotelDetailsModel;