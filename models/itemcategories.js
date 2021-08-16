const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const itemcategoriesSchema = new mongoose.Schema(
    {
     clientId: {
       type: ObjectId,
       ref: "clients",
     },
    itemcategoryName: {
      type: String,
      required: true,
      maxlength: 32,
    }
    },
    { timestamps: true }
);

const itemcategoriesModel = mongoose.model("itemcategories", itemcategoriesSchema);
module.exports = itemcategoriesModel;