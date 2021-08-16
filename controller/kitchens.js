const kitchensModel = require("../models/kitchens");
const clientModel = require("../models/clients");
class kitchens{
  /*-- get all kitchens --*/
  async getAllKitchens(req, res) {
    let {loginId}=req.body;
    try {
      let client=await clientModel.findOne({loginId:loginId});
        let clientId=client._id;
        let kitchens = await kitchensModel.find({clientId:clientId});
      
        if (kitchens) {
        return res.json({ kitchens });
        }
    } catch (err) {
        console.log(err);
    }    
  }

  /*-- insert new kitchen  --*/
  async createKitchen(req, res){
    let {loginId,kitchenName}= req.body;   
    let error = {};
    if(!loginId ||!kitchenName){
        error = {
            ...error,
            loginId: "Client must not be empty",
            kitchenName: "kitchen name must not be empty",
        };
        return res.json({ error });
    }
    else{
      let client=await clientModel.findOne({loginId:loginId});
        let clientId=client._id;
        const data = await kitchensModel.findOne({ kitchenName: kitchenName, clientId: clientId });  
        
        if (data) {
            error = {
              ...error,
              kitchenName: "kitchen name already exists",
            };
            return res.json({ error });
          } 
          else{
              try{                             
                let kitchen= new kitchensModel({
                    clientId,kitchenName
                })
                kitchen.save().then((data1) => {
                    return res.json({
                      success: "kitchen saved successfully!",
                    });
                  })
              }catch (err) {
               console.log(err);
             }
          }
      }
   }

/* Edit kitchen  detail */
async editKitchen(req, res) {
    let { _id } = req.body;   
    if (!_id) {
      return res.json({ error: "All filled must be required" });
    } 
    else {
      try {  
        let kitchen = await kitchensModel.findById(_id);
        if (kitchen) {
          return res.json({ kitchen });
        }
        else{
          return res.json({ error: "No record found" });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

   /*-- update kitchen  --*/
   async updateKitchen(req, res){
    let {_id,loginId,kitchenName}= req.body;
    let error = {};
    if(!loginId ||!kitchenName){      
        error = {
            ...error,
            loginId: "Client must not be empty",
            kitchenName: "kitchen name  must not be empty",
        };
        return res.json({ error });
    }
    else{
      let client=await clientModel.findOne({loginId:loginId});
        let clientId=client._id;
        const data = await kitchensModel.findOne({ kitchenName: kitchenName, clientId: clientId, _id: { $ne: _id } });          
        if (data) {          
            error = {
              ...error,
              kitchenName: "kitchen name already exists",
            };
            return res.json({ error });
          } 
          else{
              try{     
                let kitchen=  kitchensModel.findByIdAndUpdate(_id,{
                    clientId,kitchenName, updatedAt: Date.now(),
                })
                let edit = await kitchen.exec();
                if (edit) {
                    return res.json({ success: "kitchen name updated successfully" });
                  } 
              }catch (err) {
               console.log(err);
             }
          }
      }
   }

   /*-- delete kitchen  name */
   async deleteKitchen(req, res) {
    let { _id } = req.body;   
    if (!_id) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {        
        let _delete = await kitchensModel.findByIdAndDelete(_id);        
        if (_delete) {
          return res.json({ success: "kitchen deleted successfully" });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

}

const kitchensController = new kitchens();
module.exports = kitchensController;
