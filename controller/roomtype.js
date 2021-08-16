const roomtypeModel = require("../models/roomtypes");
const clientModel = require("../models/clients");
class roomType{

    /*-- get all room types --*/
 async getAllRoomTypes(req, res) {
  let {loginId}=req.body;
  let error={};
    try {
      let client=await clientModel.findOne({loginId:loginId});
      let clientId=client._id;
        let types = await roomtypeModel.find({clientId:clientId});
       
        if (types) {
        return res.json({ types });
        }
        else{
          error="No record found";
          return res.json({ error });
        }
    } catch (err) {
        console.log(err);
    }    
  }

  /*-- insert new room type --*/
  async createRoomType(req, res){
    let {loginId,typeName}= req.body;
    console.log(req.body);
    let error = {};
    if(!loginId ||!typeName){
        error = {
            ...error,
            loginId: "Client must not be empty",
            typeName: "Room type must not be empty",
        };
        return res.json({ error });
    }
    else{
      let client=await clientModel.findOne({loginId:loginId});
      let clientId=client._id;
        const data = await roomtypeModel.findOne({ typeName: typeName, clientId: clientId });         
        if (data) {
            error = {
              ...error,
              typeName: "Room type name already exists",
            };
            return res.json({ error });
          } 
          else{
              try{                
                let roomT= new roomtypeModel({
                    clientId,typeName
                })
                roomT.save().then((data1) => {
                    return res.json({
                      success: "Room type saved successfully!",
                    });
                  })
              }catch (err) {
               console.log(err);
             }
          }
      }
   }

/* Edit room type detail */
async editRoomType(req, res) {
    let { _id } = req.body;   
    if (!_id) {
      return res.json({ error: "All filled must be required" });
    } 
    else {
      try {        
        let roomT = await roomtypeModel.findById(_id);
        if (roomT) {
          return res.json({ roomT });
        }
        else{
          return res.json({ error: "No record found" });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

   /*-- update room type --*/
   async updateRoomType(req, res){
    let {_id,loginId,typeName}= req.body;
    let error = {};
    if(!loginId ||!typeName){
        error = {
            ...error,
            loginId: "Client must not be empty",
            typeName: "Room type must not be empty",
        };
        return res.json({ error });
    }
    else{
      let client=await clientModel.findOne({loginId:loginId});
      let clientId=client._id;
        const data = await roomtypeModel.findOne({ typeName: typeName, clientId: clientId, _id: { $ne: _id } });  
        if (data) {
            error = {
              ...error,
              typeName: "Room type name already exists",
            };
            return res.json({ error });
          } 
          else{
              try{
                let roomT=  roomtypeModel.findByIdAndUpdate(_id,{
                    clientId,typeName, updatedAt: Date.now(),
                })
                let edit = await roomT.exec();
                if (edit) {
                    return res.json({ success: "Room type name updated successfully" });
                  } 
              }catch (err) {
               console.log(err);
             }
          }
      }
   }

   /*-- delete room type name */
   async deleteRoomType(req, res) {
    let { _id } = req.body;   
    if (!_id) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {        
        let deleteType = await roomtypeModel.findByIdAndDelete(_id);        
        if (deleteType) {
          return res.json({ success: "Room type deleted successfully" });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

}
const roomTypeController = new roomType();
module.exports = roomTypeController;
