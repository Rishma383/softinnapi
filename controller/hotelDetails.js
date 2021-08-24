const clientModel = require("../models/clients");
const hotelDetailsModel = require("../models/hotelDetails");

class HotelDetail{
   /*-- Get Hotel name and object id --*/
    async getClientName(req, res) {
      let { id } = req.body;  
      
      if (!id) {
        return res.json({ error: "All filled must be required" });
      } else {
        try {
          // let deletedUserFile = await clientModel.findById(_id);
          await clientModel.find({loginId:id},{_id:1,hotelRestName:1},function(err,result){
              if (err) return res.json({status:-100,message:"error",data:null});
              return res.json({status:1,message:"success", data: result });
          });
          
          } catch (err) {
          console.log(err);
        }
      }
    }

     /*-- Get Hotel/Restaurant Detail and client object id --*/
     async getHotelDetail(req, res) {
      let { id } = req.body;   
     
      if (!id) {
        return res.json({ error: "All filled must be required" });
      } else {
        try {
        //   let hotelres = await hotelDetailsModel.findOne({clientId:id}).populate("clientId","_id hotelRestName");
        //   console.log(hotelres)
        // if (hotelres) {
        //   return res.json({ hotelres });
        // }
        // else{
        //   return res.json({ error: "No record found" });
        // }
        let hotelres = await hotelDetailsModel.aggregate([
          {
            $lookup: {
              from: "clients",
              localField: "clientId",
              foreignField: "loginId",
              as: "hotel_info",
            },
          },
          {
            $unwind: {
              path: "$hotel_info",
              preserveNullAndEmptyArrays: true
            }
          },
          {
            $project: {
             _id:1,
             clientId:1,
             countryCode:1,
             stateCode:1,hotelAddress:1,addressLine:1,cityName:1,postCode:1,
             hotel_info:"$hotel_info",
            }
          }
        ]);
        console.log(hotelres);
         if (hotelres) {
          return res.json({ hotelres });
        }
        else{
          return res.json({ error: "No record found" });
        }

        } catch (err) {
          console.log(err);
        }
      }
    }

    /*-- Update hotel address --*/
    async insertUpdateHotelAddress(req, res){
       let {loginId,countryCode,stateCode,hotelAddress,addressLine,cityName,postCode}= req.body;  
      
       let error = {};
       if(!loginId ||!countryCode ||!stateCode ||!hotelAddress ||!cityName ||!postCode){
         error={
          ...error,
          loginId: "Client id must not be empty",
          countryCode: "Please select your country",
          stateCode: "Please select your state",
          hotelAddress: "Hotel address must not be empty",          
          cityName: "City must not be empty",
          postCode: "Post code must not be empty",
         };
         return res.json({ error });
       }
       else{
        let client=await clientModel.findOne({loginId:loginId});
        let clientId=client._id;
        const data1 = await hotelDetailsModel.findOne({ clientId: clientId });
       
        if(data1==null){
          let newHotelDetails=new hotelDetailsModel({
            clientId,
            countryCode,
            stateCode,
            hotelAddress,
            addressLine,cityName,postCode
          })
          newHotelDetails.save()
            .then((data) => {
              console.log(data);
              return res.json({
                success: "Hotel address inserted successfully!",
              });
            })
        }
        else{
          
          let updateHotelAdd= hotelDetailsModel.findByIdAndUpdate(data1._id,{
            clientId,
            countryCode,
            stateCode,
            hotelAddress,
            addressLine,cityName,postCode,
            updatedAt: Date.now(),
          });
          let edit = await updateHotelAdd.exec();
          if (edit) {            
            return res.json({
              success: "Hotel address updated successfully!",
            });
          }
        }
       }
    }


}

const hotelDetailController = new HotelDetail();
module.exports = hotelDetailController;