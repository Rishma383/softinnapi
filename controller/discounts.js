const discountsModel = require("../models/discounts");
const clientModel = require("../models/clients");
class Discounts{
  /*-- get all discounts --*/
  async getAllDiscounts(req, res) {
    let {loginId}=req.body;
    try {
      let client=await clientModel.findOne({loginId:loginId});
        let clientId=client._id;
        let discounts = await discountsModel.find({clientId:clientId});
        
        if (discounts) {
        return res.json({ discounts });
        }
    } catch (err) {
        console.log(err);
    }    
  }

  /*-- insert new discount  --*/
  async createDiscount(req, res){
    let {loginId,discountName,discountType,discountAmount}= req.body;
   console.log(req.body);
    let error = {};
    if(!loginId ||!discountName ||!discountType ||!discountAmount){
        error = {
            ...error,
            loginId: "Client must not be empty",
            discountName: "discount name must not be empty",
            discountType: "discount type must not be empty",
            discountAmount: "discount amount must not be empty",
        };
        return res.json({ error });
    }
    else{
      let client=await clientModel.findOne({loginId:loginId});
        let clientId=client._id;
        const data = await discountsModel.findOne({ discountName: discountName, clientId: clientId });  
        
        if (data) {
            error = {
              ...error,
              discountName: "discount name already exists",
            };
            return res.json({ error });
          } 
          else{
              try{                
                let discount= new discountsModel({
                    clientId,discountName,discountType,discountAmount
                })
                discount.save().then((data1) => {
                    return res.json({
                      success: "discount saved successfully!",
                    });
                  })
              }catch (err) {
               console.log(err);
             }
          }
      }
   }

/* Edit discount  detail */
async editDiscount(req, res) {
    let { _id } = req.body;   
    if (!_id) {
      return res.json({ error: "All filled must be required" });
    } 
    else {
      try {        
        let discount = await discountsModel.findById(_id);
        if (discount) {
          return res.json({ discount });
        }
        else{
          return res.json({ error: "No record found" });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

   /*-- update discount  --*/
   async updateDiscount(req, res){
    let {_id,loginId,discountName,discountType,discountAmount}= req.body;
    let error = {};
    if(!loginId ||!discountName ||!discountType ||!discountAmount){      
        error = {
            ...error,
            loginId: "Client must not be empty",
            discountName: "discount name must not be empty",
            discountType: "discount type must not be empty",
            discountAmount: "discount amount must not be empty",
        };
        return res.json({ error });
    }
    else{
      let client=await clientModel.findOne({loginId:loginId});
        let clientId=client._id;
        const data = await discountsModel.findOne({ discountName: discountName, clientId: clientId, _id: { $ne: _id } });          
        if (data) {          
            error = {
              ...error,
              discountName: "discount name already exists",
            };
            return res.json({ error });
          } 
          else{
              try{                
                let discount=  discountsModel.findByIdAndUpdate(_id,{
                    clientId,discountName,discountType,discountAmount,updatedAt: Date.now(),
                })
                let edit = await discount.exec();
                if (edit) {
                    return res.json({ success: "discount name updated successfully" });
                  } 
              }catch (err) {
               console.log(err);
             }
          }
      }
   }

   /*-- delete discount  name */
   async deleteDiscount(req, res) {
    let { _id } = req.body;   
    if (!_id) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {        
        let _delete = await discountsModel.findByIdAndDelete(_id);        
        if (_delete) {
          return res.json({ success: "discount deleted successfully" });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

}

const discountsController = new Discounts();
module.exports = discountsController;
