const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const tablesSchema = new mongoose.Schema(
    {
      restaurantId: {
        type: ObjectId,
        ref: "restaurants",
      },
     tableName: {
      type: String,
      required: true,
      maxlength: 32,
    },
    tableCapacity:{
        type:Number,
        required: true,
    }
    },
    { timestamps: true }
);

const tablesModel = mongoose.model("tables", tablesSchema);
module.exports = tablesModel;