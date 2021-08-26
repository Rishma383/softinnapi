const orderModel= require("../models/orders");
const ordersdetailsModel=require("../models/ordersdetails");
const tablesModel=require("../models/tables");

class Orders{

 /*-- get all Orders for Kitchen --*/
  async getOrdersInKitchen(req, res) {
    try {
        let allOrders = await orderModel.aggregate([
          {
            $graphLookup:{
              from: "ordersdetails",
              startWith:"$_id",
              connectFromField:"_id",
              connectToField:"orderId",  
              as: "order",
            }
          },
          {
            $unwind: {
              path: "$order",
            }
          },          
          {
            $lookup: {
              from: "tables",
              localField: "order.tableId",
              foreignField: "_id",
              as: "ordertables",
            },
          },
          {
            $unwind: {
              path: "$ordertables",
            }
          },
          {
            $group: {
              _id: "$_id",              
              order: { $push: "$order" },
              ordertables: { $first: "$ordertables" },
              customerId:{$first:"$customerId"},
              totalAmount:{$first:"$totalAmount"}
            }
          },
          
        ]);    
        console.log(allOrders);    
        res.json({ orders: allOrders });
    } catch {
        res.status(404);
    }   
  }
}

const ordersController = new Orders();
module.exports = ordersController;