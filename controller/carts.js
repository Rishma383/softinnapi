const cartModel = require("../models/carts");
const menuitemsModel = require("../models/menuitems");
const orderModel = require("../models/orders");
const ordersdetailsModel = require("../models/ordersdetails");
class Cart{

/*-- get all Cart Items by customerId and MenuCode --*/
  async getCartItems(req, res) {
    let {customerId}=req.body;
   
    try {
        let cartitems = await cartModel.find({
            customerId :customerId,
        });
        
        if (cartitems) {
        return res.json({ cartitems });
        }
        else{
          console.log(cartitems);
        }
    } catch (err) {
        console.log(err);
    }    
  }


 /* Add item in cart  */
  async addCart(req, res) {
    let { _id,customerId,restaurantId,tableId,qty } = req.body;
           
      try {    
              
        let itemExists = await cartModel.find({
        customerId :customerId,
        menuItemId:_id,
        });
        if (itemExists.length!=0){
        return res.json({
            success: "Item added successfully!",
          });
        }
        else{
        let menuItem = await menuitemsModel.findById(_id);     
       
          let newUser = new cartModel({
            customerId :customerId,
            menuItemId:_id,
            restaurantId:restaurantId,
            tableId:tableId,
            menuitemName:menuItem.menuitemName,
            finalItemPrice:menuItem.finalItemPrice,
            itemImage:menuItem.itemImage[0],
            quantity:qty,               
          });
          newUser
            .save()
            .then((data1) => {
              return res.json({
                success: "One Item added in cart successfully",
              });
            })
            .catch((error) => {
              return res.json({
                error:"Item not added in cart",
              })
            });
        }
      } catch (error) {
        return res.json({
            error:"Item not added in cart",
          })
      }
  
  }
//-- update quantity in cart --
async updateCart(req, res){
  let {_id,quantity}=req.body;
  try{
    let updatecart=  cartModel.findByIdAndUpdate(_id,{
      quantity:quantity
    });
    let edit = await updatecart.exec();
    if (edit) {            
      return res.json({
        success: "Cart updated successfully!",
      });
    }
  }
  catch(error){
    return res.json({
      error:"There is technical issue, Please try again!"
    })
  }
}
//-- Place order --
async placeOrder(req, res){
  let {customerId}=req.body;
   
    try {
        let cartitems = await cartModel.find({
            customerId :customerId,
        });
        let hasSaved=0;
        if (cartitems) {
          
          let _totalAmount=0;
          for(let i=0;i<cartitems.length;i++){           
            let _convertToString=cartitems[i].finalItemPrice;
            const num = +_convertToString.toString(); //use toString(). It will convert the object to string.           
            let abc=parseFloat(num) * parseFloat(cartitems[i].quantity);            
            _totalAmount= parseFloat(_totalAmount) + parseFloat(abc);
          }
          
          let newOrder = new orderModel({
            customerId:customerId,
            totalAmount:_totalAmount,
          });
          newOrder
          .save()
          .then((data1) => {
            hasSaved=1;           
            for(let j=0;j<cartitems.length;j++){  
              let newOrderDetail= new ordersdetailsModel({
                orderId:data1._id,
                restaurantId:cartitems[j].restaurantId,
                tableId:cartitems[j].tableId,
                menuItemId:cartitems[j].menuItemId,
                menuitemName:cartitems[j].menuitemName,
                finalItemPrice:cartitems[j].finalItemPrice,
                itemImage:cartitems[j].itemImage,
                quantity:cartitems[j].quantity
              });
              newOrderDetail.save().then((data2)=>{   
                return res.json({
                  hasSaved:1
                })             
              }).catch((error) => {
                return res.json({
                  hasSaved:0,
                })
              });
          }
          
          })
          .catch((error) => {
            return res.json({
              error:"Item not added in cart",
            })
          });
          
        }
        else{
          return res.json({
            error:"There is no item in your cart, please select items"
          })
        }
    } catch (error) {
      return res.json({
        error:"There is technical issue, Please try again!"
      })
    }    
}

//-- Delete from cart --
async deleteCart(req, res) {
  let {customerId}=req.body;
 
  try {
    const result = await cartModel.deleteMany({customerId:customerId});
      
      if (result) {
      return res.json({ 
        success:1
       });
      }
      else{
        return res.json({ 
          success:0
         });
      }
  } catch (err) {
    return res.json({ 
      error:"There is technical issue, please try again"
     });
  }    
}
}

const cartsController = new Cart();
module.exports = cartsController;