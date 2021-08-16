const menuitemsModel = require("../models/menuitems");
const menucodesModel = require("../models/menucodes");
const ObjectId = require('mongoose').Types.ObjectId
class Menuitems{
  /*-- get menu name and code only by id --*/
  async getMenuCodeName(req,res){
    let {menucode}=req.body;
    try {
        let menuc = await menucodesModel.find({_id:menucode});        
        if (menuc) {
        return res.json({ menuc });
        }
    } catch (err) {
        console.log(err);
    }   
  }

  /*-- get all menuitems by restaurantId --*/
  async getAllMenuItemsByRestaurant(req, res) {
    let {restaurant_Id}=req.body;
 
    try {
      let menucodes=[];
      menucodes= await menucodesModel.aggregate([
        {$match:{restaurantId:ObjectId(restaurant_Id)}},
        {
          $graphLookup:{
            from: "menuitems",
            startWith:"$menuCode",
            connectFromField:"restaurantId",
            connectToField:"menucode",
            as: "menuItemDetail"
          }
        }
      ]);      
        
        if (menucodes) {
        return res.json({ menucodes });
        }
        else{
          console.log(menucodes);
        }
    } catch (err) {
        console.log(err);
    }    
  }

  /*-- get all menuitems by restaurantId and MenuCode --*/
  async getAllMenuItems(req, res) {
    let {restaurantId,menucode}=req.body;
   
    try {
        let menuitems = await menuitemsModel.find({
          restaurantId:restaurantId,
          menucode:menucode
        });
        
        if (menuitems) {
        return res.json({ menuitems });
        }
        else{
          console.log(menuitems);
        }
    } catch (err) {
        console.log(err);
    }    
  }

  /*-- insert new menuitem  --*/
  async createMenuItem(req, res){
   
    let {restaurantId,menucode,menuitemName,description,itemIs,dessertIs,categoryId,itemTypeId,kitchenId,price,
        priceOfferTax,availability,finalItemPrice,roomTypeId,showInRoomMenu,displayOnDays,fromTime,toTime}= req.body;
    let itemImage = req.files[0].filename;
  
    let error = {};
    if(!menuitemName ||!description ||!itemIs ||!categoryId ||!itemTypeId ||!kitchenId ||!price ||!finalItemPrice ||!fromTime ||!toTime){
        error = {
            ...error,            
            menuitemName: "menu item name must not be empty",
            description:"description must not be empty",
            itemIs: "Item contains must not be empty",
            // dessertIs: "Dessert must not be empty",
            categoryId: "Please select category",
            itemTypeId: "Please select item type",
            kitchenId:"Please select kitchen",
            price:"Please mention price",
            finalItemPrice:"Please mention final price",           
            // displayOnDays:"Please select at least one day to display item",
            fromTime:"Please enter Start time",
            toTime:"Please enter End time"
        };
        return res.json({ error });
    }
    else{
        const data = await menuitemsModel.findOne({ menuitemName: menuitemName, restaurantId: restaurantId });  
        
        if (data) {
            error = {
              ...error,
              menuitemName: "menu item name already exists",
            };
            return res.json({ error });
          } 
          else{           
              try{                
                let menuitem= new menuitemsModel({restaurantId,menucode,menuitemName,description,itemIs,dessertIs,categoryId,itemTypeId,kitchenId,price,
        priceOfferTax,availability,finalItemPrice,roomTypeId,showInRoomMenu,displayOnDays,fromTime,toTime,itemImage
                })
                menuitem.save().then((data1) => {
                    return res.json({
                      success: "menu item saved successfully!",
                    });
                  })
              }catch (err) {
               console.log(err);
             }           
          }
      }
   }

/* Edit menuitem  detail */
async editMenuItem(req, res) {
    let { _id } = req.body;   
    if (!_id) {
      return res.json({ error: "All filled must be required" });
    } 
    else {
      try {        
        let menuitem = await menuitemsModel.findById(_id);
        if (menuitem) {
          return res.json({ menuitem });
        }
        else{
          return res.json({ error: "No record found" });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

   /*-- update menuitem  --*/
   async updateMenuItem(req, res){
    let {_id,restaurantId,menucode,menuitemName,description,itemIs,dessertIs,categoryId,itemTypeId,kitchenId,price,
        priceOfferTax,availability,finalItemPrice,roomTypeId,showInRoomMenu,displayOnDays,fromTime,toTime}= req.body;
        let itemImage = req.files[0].filename;
        console.log(itemImage);
    let error = {};
    if(!menuitemName ||!description ||!itemIs ||!categoryId ||!itemTypeId ||!kitchenId ||!price ||!finalItemPrice ||!displayOnDays ||!fromTime ||!toTime){
        error = {
            ...error,            
            menuitemName: "menu item name must not be empty",
            description:"description must not be empty",
            itemIs: "Item contains must not be empty",
            // dessertIs: "Dessert must not be empty",
            categoryId: "Please select category",
            itemTypeId: "Please select item type",
            kitchenId:"Please select kitchen",
            price:"Please mention price",
            finalItemPrice:"Please mention final price",           
            displayOnDays:"Please select at least one day to display item",
            fromTime:"Please enter Start time",
            toTime:"Please enter End time"
        };
        return res.json({ error });
    }
    else{
        const data = await menuitemsModel.findOne({ menuitemName: menuitemName, restaurantId: restaurantId, _id: { $ne: _id } });          
        if (data) {          
            error = {
              ...error,
              menuitemName: "menu item name already exists",
            };
            return res.json({ error });
          } 
          else{            
              try{  
                if(itemImage==undefined){
                  let menuitem=  menuitemsModel.findByIdAndUpdate(_id,{
                    restaurantId,menucode,menuitemName,description,itemIs,dessertIs,categoryId,itemTypeId,kitchenId,price,priceOfferTax,
        availability,finalItemPrice,roomTypeId,showInRoomMenu,displayOnDays,fromTime,toTime,updatedAt: Date.now(),
                })
                let edit = await menuitem.exec();
                if (edit) {
                    return res.json({ success: "menu item name updated successfully" });
                  } 
                }              
               else{
                let menuitem=  menuitemsModel.findByIdAndUpdate(_id,{
                  restaurantId,menucode,menuitemName,description,itemIs,dessertIs,categoryId,itemTypeId,kitchenId,price,priceOfferTax,
      availability,finalItemPrice,roomTypeId,showInRoomMenu,displayOnDays,fromTime,toTime,itemImage,updatedAt: Date.now(),
              })
              let edit = await menuitem.exec();
              if (edit) {
                  return res.json({ success: "menu item name updated successfully" });
                } 
               }
              }catch (err) {
               console.log(err);
             }           
          }
      }
   }

   /*-- delete menuitem  name */
   async deleteMenuItem(req, res) {
    let { _id } = req.body;   
    if (!_id) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {        
        let _delete = await menuitemsModel.findByIdAndDelete(_id);        
        if (_delete) {
          return res.json({ success: "menu item deleted successfully" });
        }
        else{
            return res.json({ error: "No record found" });
          }
      } catch (err) {
        console.log(err);
      }
    }
  }

}

const menuitemsController = new Menuitems();
module.exports = menuitemsController;
