const orderModel= require("../models/orders");
const ordersdetailsModel=require("../models/ordersdetails");
const tablesModel=require("../models/tables");

class Orders{

 /*-- get all Orders for Kitchen --*/
  async getOrdersInKitchen(req, res) {
    try {
        let allOrders = await orderModel.aggregate([
            {
                $lookup: {
                  from: "ordersdetails",
                  localField: "_id",
                  foreignField: "orderId",
                  as: "order_info",
                },
              },       
              {
                $unwind: {
                  path: "$order_info",
                  //preserveNullAndEmptyArrays: true
                }
              },
              {
                $lookup: {
                  from: "tables",
                  localField: "order_info.tableId",
                  foreignField: "_id",
                  as: "order_info.tables",
                },
              },
              {
                $unwind: "$order_info.tables"
              },        
              {
                $project: {
                 _id:1,customerId:1,totalAmount:1,
                 orderId:1,tableId:1,menuItemId:1,menuitemName:1,finalItemPrice:1,quantity:1,
                 tableName:1,tableCapacity:1,
                  login_info:"$order_info",
                }
              }
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