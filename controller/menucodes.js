const menucodesModel = require("../models/menucodes");

class Menucodes{
  /*-- get all menucodes --*/
  async getAllMenuCodes(req, res) {
    let {restaurantId}=req.body;
    console.log(restaurantId);
    try {
        let menucodes = await menucodesModel.find({restaurantId:restaurantId});
        
        if (menucodes) {
        return res.json({ menucodes });
        }
    } catch (err) {
        console.log(err);
    }    
  }

  /*-- insert new menucode  --*/
  async createMenuCode(req, res){
    let {restaurantId,menucodeName,menuCode,taxName,taxAmount}= req.body;
   
    let error = {};
    if(!restaurantId ||!menucodeName ||!menuCode ||!taxName ||!taxAmount){
        error = {
            ...error,
            restaurantId: "Client must not be empty",
            menucodeName: "menu code name must not be empty",
            menuCode: "menu code must not be empty",
            taxName: "tax name must not be empty",
            taxAmount: "tax amount must not be empty",
        };
        return res.json({ error });
    }
    else{
        const data = await menucodesModel.findOne({ menucodeName: menucodeName, restaurantId: restaurantId });  
        
        if (data) {
            error = {
              ...error,
              menucodeName: "menu code name already exists",
            };
            return res.json({ error });
          } 
          else{
            const datacode = await menucodesModel.findOne({ menuCode: menuCode });          
            if (datacode) {          
                error = {
                  ...error,
                  menuCode: "menu code already exists",
                };
                return res.json({ error });
              } 
              else{
              try{                
                let menucode= new menucodesModel({
                    restaurantId,menucodeName,menuCode,taxName,taxAmount
                })
                menucode.save().then((data1) => {
                    return res.json({
                      success: "menu code saved successfully!",
                    });
                  })
              }catch (err) {
               console.log(err);
             }
            }
          }
      }
   }

/* Edit menucode  detail */
async editMenuCode(req, res) {
    let { _id } = req.body;   
    if (!_id) {
      return res.json({ error: "All filled must be required" });
    } 
    else {
      try {        
        let menucode = await menucodesModel.findById(_id);
        if (menucode) {
          return res.json({ menucode });
        }
        else{
          return res.json({ error: "No record found" });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

   /*-- update menucode  --*/
   async updateMenuCode(req, res){
    let {_id,restaurantId,menucodeName,menuCode,taxName,taxAmount}= req.body;
    let error = {};
    if(!restaurantId ||!menucodeName ||!menuCode ||!taxName ||!taxAmount){      
        error = {
            ...error,
            restaurantId: "Client must not be empty",
            menucodeName: "menu code name must not be empty",
            menuCode: "menu code must not be empty",
            taxName: "tax name must not be empty",
            taxAmount: "tax amount must not be empty",
        };
        return res.json({ error });
    }
    else{
        const data = await menucodesModel.findOne({ menucodeName: menucodeName, restaurantId: restaurantId, _id: { $ne: _id } });          
        if (data) {          
            error = {
              ...error,
              menucodeName: "menu code name already exists",
            };
            return res.json({ error });
          } 
          else{
            const datacode = await menucodesModel.findOne({ menuCode: menuCode, _id: { $ne: _id } });          
            if (datacode) {          
                error = {
                  ...error,
                  menuCode: "menu code already exists",
                };
                return res.json({ error });
              } 
              else{
              try{                
                let menucode=  menucodesModel.findByIdAndUpdate(_id,{
                    restaurantId,menucodeName,menuCode,taxName,taxAmount,updatedAt: Date.now(),
                })
                let edit = await menucode.exec();
                if (edit) {
                    return res.json({ success: "menu code name updated successfully" });
                  } 
              }catch (err) {
               console.log(err);
             }
            }
          }
      }
   }

   /*-- delete menucode  name */
   async deleteMenuCode(req, res) {
    let { _id } = req.body;   
    if (!_id) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {        
        let _delete = await menucodesModel.findByIdAndDelete(_id);        
        if (_delete) {
          return res.json({ success: "menu code deleted successfully" });
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

const menucodesController = new Menucodes();
module.exports = menucodesController;
