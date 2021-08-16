const roomsModel = require("../models/rooms");
const clientModel = require("../models/clients");
class Rooms{
  /*-- get all room s --*/
  async getAllRooms(req, res) {
    let {roomtypeId}=req.body;
    try {
      // let client=await clientModel.findOne({loginId:loginId});
      // let clientId=client._id;
        let s = await roomsModel.find({roomtypeId:roomtypeId,});
        console.log(s);
        if (s) {
        return res.json({ s });
        }
    } catch (err) {
        console.log(err);
    }    
  }

  /*-- insert new room  --*/
  async createRoom(req, res){
    let {loginId,roomtypeId,roomName}= req.body;
   
    let error = {};
    if(!loginId ||!roomtypeId ||!roomName){
        error = {
            ...error,
            loginId: "Client must not be empty",
            roomName: "Room  must not be empty",
        };
        return res.json({ error });
    }
    else{
      let client=await clientModel.findOne({loginId:loginId});
      let clientId=client._id;
        const data = await roomsModel.findOne({ roomName: roomName, roomtypeId: roomtypeId });  
        
        if (data) {
            error = {
              ...error,
              roomName: "Room  name already exists",
            };
            return res.json({ error });
          } 
          else{
              try{                
                let room= new roomsModel({
                    clientId,roomtypeId,roomName
                })
                room.save().then((data1) => {
                    return res.json({
                      success: "Room  saved successfully!",
                    });
                  })
              }catch (err) {
               console.log(err);
             }
          }
      }
   }

/* Edit room  detail */
async editRoom(req, res) {
    let { _id } = req.body;   
    if (!_id) {
      return res.json({ error: "All filled must be required" });
    } 
    else {
      try {        
        let room = await roomsModel.findById(_id);
        if (room) {
          return res.json({ room });
        }
        else{
          return res.json({ error: "No record found" });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

   /*-- update room  --*/
   async updateRoom(req, res){
    let {_id,loginId,roomtypeId,roomName}= req.body;
    let error = {};
    if(!loginId ||!roomtypeId ||!roomName){      
        error = {
            ...error,
            loginId: "Client must not be empty",
            roomName: "Room  must not be empty",
        };
        return res.json({ error });
    }
    else{
      let client=await clientModel.findOne({loginId:loginId});
      let clientId=client._id;
        const data = await roomsModel.findOne({ roomName: roomName, clientId: clientId, _id: { $ne: _id } });          
        if (data) {          
            error = {
              ...error,
              roomName: "Room  name already exists",
            };
            return res.json({ error });
          } 
          else{
              try{                
                let room=  roomsModel.findByIdAndUpdate(_id,{
                    clientId,roomtypeId,roomName, updatedAt: Date.now(),
                })
                let edit = await room.exec();
                if (edit) {
                    return res.json({ success: "Room  name updated successfully" });
                  } 
              }catch (err) {
               console.log(err);
             }
          }
      }
   }

   /*-- delete room  name */
   async deleteRoom(req, res) {
    let { _id } = req.body;   
    if (!_id) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {        
        let _delete = await roomsModel.findByIdAndDelete(_id);        
        if (_delete) {
          return res.json({ success: "Room  deleted successfully" });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

}

const roomsController = new Rooms();
module.exports = roomsController;
