const itemcategoriesModel = require("../models/itemcategories");
const clientModel = require("../models/clients");
class itemcategories{
  /*-- get all item categories s --*/
  async getAllItemCategories(req, res) {
    let {loginId}=req.body;
    try {
      let client=await clientModel.findOne({loginId:loginId});
      let clientId=client._id;
        let itemcategories = await itemcategoriesModel.find({clientId:clientId});
        
        if (itemcategories) {
        return res.json({ itemcategories });
        }
        else{
          return res.json({ error: "No record found" });
        }
    } catch (err) {
        console.log(err);
    }    
  }

  /*-- insert new item categories  --*/
  async createItemCategory(req, res){
    let {loginId,itemcategoryName}= req.body;
   
    let error = {};
    if(!loginId ||!itemcategoryName){
        error = {
            ...error,
            loginId: "Client must not be empty",
            itemcategoryName: "item categories must not be empty",
        };
        return res.json({ error });
    }
    else{
      let client=await clientModel.findOne({loginId:loginId});
      let clientId=client._id;
        const data = await itemcategoriesModel.findOne({ itemcategoryName: itemcategoryName, clientId: clientId });  
        
        if (data) {
            error = {
              ...error,
              itemcategoryName: "item category name already exists",
            };
            return res.json({ error });
          } 
          else{
              try{                
                let itemcategories= new itemcategoriesModel({
                    clientId,itemcategoryName
                })
                itemcategories.save().then((data1) => {
                    return res.json({
                      success: "item category saved successfully!",
                    });
                  })
              }catch (err) {
               console.log(err);
             }
          }
      }
   }

/* Edit item categories  detail */
async editItemCategory(req, res) {
    let { _id } = req.body;   
    if (!_id) {
      return res.json({ error: "All filled must be required" });
    } 
    else {
      try {        
        let itemcategories = await itemcategoriesModel.findById(_id);
        if (itemcategories) {
          return res.json({ itemcategories });
        }
        else{
          return res.json({ error: "No record found" });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

   /*-- update item categories  --*/
   async updateItemCategory(req, res){
    let {_id,loginId,itemcategoryName}= req.body;
    let error = {};
    if(!loginId ||!itemcategoryName){      
        error = {
            ...error,
            loginId: "Client must not be empty",
            itemcategoryName: "Item category name  must not be empty",
        };
        return res.json({ error });
    }
    else{
      let client=await clientModel.findOne({loginId:loginId});
      let clientId=client._id;
        const data = await itemcategoriesModel.findOne({ itemcategoryName: itemcategoryName, clientId: clientId, _id: { $ne: _id } });          
        if (data) {          
            error = {
              ...error,
              itemcategoryName: "Item category name already exists",
            };
            return res.json({ error });
          } 
          else{
              try{                
                let itemcategories=  itemcategoriesModel.findByIdAndUpdate(_id,{
                    clientId,itemcategoryName, updatedAt: Date.now(),
                })
                let edit = await itemcategories.exec();
                if (edit) {
                    return res.json({ success: "Item category name updated successfully" });
                  } 
              }catch (err) {
               console.log(err);
             }
          }
      }
   }

   /*-- delete item categories  name */
   async deleteItemCategory(req, res) {
    let { _id } = req.body;   
    if (!_id) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {        
        let _delete = await itemcategoriesModel.findByIdAndDelete(_id);        
        if (_delete) {
          return res.json({ success: "Item category deleted successfully" });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

}

const itemcategoriesController = new itemcategories();
module.exports = itemcategoriesController;
