const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const itemtypesSchema = new mongoose.Schema(
    {
     clientId: {
       type: ObjectId,
       ref: "clients",
     },
    itemtypeName: {
      type: String,
      required: true,
      maxlength: 32,
    }
    },
    { timestamps: true }
);

const itemtypesModel = mongoose.model("itemtypes", itemtypesSchema);
module.exports = itemtypesModel;