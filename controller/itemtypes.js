const itemtypesModel = require("../models/itemtypes");
const clientModel = require("../models/clients");
class ItemTypes{
  /*-- get all itemtype s --*/
  async getAllItemTypes(req, res) {
    let {loginId}=req.body;
    try {
      let client=await clientModel.findOne({loginId:loginId});
        let clientId=client._id;
        let itemtypes = await itemtypesModel.find({clientId:clientId});
        
        if (itemtypes) {
        return res.json({ itemtypes });
        }
    } catch (err) {
        console.log(err);
    }    
  }

  /*-- insert new itemtype  --*/
  async createItemType(req, res){
    let {loginId,itemtypeName}= req.body;
   
    let error = {};
    if(!loginId ||!itemtypeName){
        error = {
            ...error,
            loginId: "Client must not be empty",
            itemtypeName: "itemtype  must not be empty",
        };
        return res.json({ error });
    }
    else{
      let client=await clientModel.findOne({loginId:loginId});
        let clientId=client._id;
        const data = await itemtypesModel.findOne({ itemtypeName: itemtypeName, clientId: clientId });  
        
        if (data) {
            error = {
              ...error,
              itemtypeName: "item type name already exists",
            };
            return res.json({ error });
          } 
          else{
              try{                
                let itemtype= new itemtypesModel({
                    clientId,itemtypeName
                })
                itemtype.save().then((data1) => {
                    return res.json({
                      success: "item type  saved successfully!",
                    });
                  })
              }catch (err) {
               console.log(err);
             }
          }
      }
   }

/* Edit itemtype  detail */
async editItemType(req, res) {
    let { _id } = req.body;   
    if (!_id) {
      return res.json({ error: "All filled must be required" });
    } 
    else {
      try {        
        let itemtype = await itemtypesModel.findById(_id);
        if (itemtype) {
          return res.json({ itemtype });
        }
        else{
          return res.json({ error: "No record found" });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

   /*-- update itemtype  --*/
   async updateItemType(req, res){
    let {_id,loginId,itemtypeName}= req.body;
    let error = {};
    if(!loginId ||!itemtypeName){      
        error = {
            ...error,
            loginId: "Client must not be empty",
            itemtypeName: "Item type name  must not be empty",
        };
        return res.json({ error });
    }
    else{
      let client=await clientModel.findOne({loginId:loginId});
        let clientId=client._id;
        const data = await itemtypesModel.findOne({ itemtypeName: itemtypeName, clientId: clientId, _id: { $ne: _id } });          
        if (data) {          
            error = {
              ...error,
              itemtypeName: "Item type  name already exists",
            };
            return res.json({ error });
          } 
          else{
              try{                
                let itemtype=  itemtypesModel.findByIdAndUpdate(_id,{
                    clientId,itemtypeName, updatedAt: Date.now(),
                })
                let edit = await itemtype.exec();
                if (edit) {
                    return res.json({ success: "Item type  name updated successfully" });
                  } 
              }catch (err) {
               console.log(err);
             }
          }
      }
   }

   /*-- delete itemtype  name */
   async deleteItemType(req, res) {
    let { _id } = req.body;   
    if (!_id) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {        
        let _delete = await itemtypesModel.findByIdAndDelete(_id);        
        if (_delete) {
          return res.json({ success: "Item type  deleted successfully" });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

}

const itemtypesController = new ItemTypes();
module.exports = itemtypesController;
