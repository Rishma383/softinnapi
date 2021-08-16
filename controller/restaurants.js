const restaurantModel=require("../models/restaurants");
const clientModel = require("../models/clients");
class Restaurants{
     /*-- get all restaurants --*/
  async getAllRestaurants(req, res) {
    let {id}=req.body;
    let client=await clientModel.findOne({loginId:id});
    try {
        let restaurants = await restaurantModel.find({clientId:client._id});        
        if (restaurants) {
        return res.json({ restaurants });
        }
    } catch (err) {
        console.log(err);
    }    
  }

  /*-- insert new Restaurants  --*/
  async createRestaurants(req, res){
      let {loginId,countryId,stateId,restaurantName,restaurantAddress,addressLine,cityName,postCode,fromTime,toTime}=req.body;
      console.log(req.body);
      let error={};
      if(!loginId ||!countryId ||!stateId ||!restaurantName ||!restaurantAddress ||!cityName ||!postCode ||!fromTime ||!toTime){
        error = {
            ...error,
            loginId: "Client must not be empty",
            countryId: "You must select country",
            stateId: "You must select state",
            restaurantName: "Restaurant name  must not be empty",
            restaurantAddress: "Restaurant address must not be empty",
            cityName: "City name  must not be empty",
            postCode: "Post code  must not be empty",
            fromTime: "Restaurant start time must not be empty",
            toTime: "Restaurant end time must not be empty",
        };
        return res.json({ error });
      }
      else{
        let client=await clientModel.findOne({loginId:loginId});
        let clientId=client._id;
        const data = await restaurantModel.findOne({ restaurantName: restaurantName, clientId: client._id });  
        console.log(data);
        if (data) {
            error = {
              ...error,
              restaurantName: "Restaurant name already exists",
            };
            return res.json({ error });
          } 
        else{
            try{                
                let restaurant= new restaurantModel({
                    clientId,countryId,stateId,restaurantName,restaurantAddress,addressLine,cityName,postCode,fromTime,toTime
                })
                restaurant.save().then((data1) => {
                    return res.json({
                      success: "Restaurant detail saved successfully!",
                    });
                  })
              }catch (err) {
               console.log(err);
             }
         }
      }
  }

  /* Edit restaurant  detail */
async editRestaurants(req, res) {
    let { _id } = req.body;   
    if (!_id) {
      return res.json({ error: "All filled must be required" });
    } 
    else {
      try {        
        let restaurant = await restaurantModel.findById(_id);
        if (restaurant) {
          return res.json({ restaurant });
        }
        else{
          return res.json({ error: "No record found" });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

   /* Edit restaurant  detail */
async getRestaurantDetail(req, res) {
  let { _id } = req.body;   
  if (!_id) {
    return res.json({ error: "All filled must be required" });
  } 
  else {
    try {        
      let restaurant = await restaurantModel.findById(_id);
      if (restaurant) {
        return res.json({ restaurant });
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
  async updateRestaurants(req, res){
    let {_id,loginId,countryId,stateId,restaurantName,restaurantAddress,addressLine,cityName,postCode,fromTime,toTime}= req.body;
    let error = {};
    if(!loginId ||!countryId ||!stateId ||!restaurantName ||!restaurantAddress ||!cityName ||!postCode ||!fromTime ||!toTime){      
        error = {
            ...error,
            loginId: "Client must not be empty",
            countryId: "You must select country",
            stateId: "You must select state",
            restaurantName: "Restaurant name  must not be empty",
            restaurantAddress: "Restaurant address must not be empty",
            cityName: "City name  must not be empty",
            postCode: "Post code  must not be empty",
            fromTime: "Restaurant start time must not be empty",
            toTime: "Restaurant end time must not be empty",
        };
        return res.json({ error });
    }
    else{
      let client=await clientModel.findOne({loginId:loginId});
        let clientId=client._id;
        const data = await restaurantModel.findOne({ restaurantName: restaurantName, clientId: clientId, _id: { $ne: _id } });          
        if (data) {          
            error = {
              ...error,
              restaurantName: "Restaurant name already exists",
            };
            return res.json({ error });
          } 
          else{
              try{                
                let restaurant=  restaurantModel.findByIdAndUpdate(_id,{
                    clientId,countryId,stateId,restaurantName,restaurantAddress,addressLine,cityName,postCode,fromTime,toTime, updatedAt: Date.now(),
                })
                let edit = await restaurant.exec();
                if (edit) {
                    return res.json({ success: "Restaurant detail updated successfully" });
                  } 
              }catch (err) {
               console.log(err);
             }
          }
      }
   }

    /*-- delete room  name */
    async deleteRestaurants(req, res) {
        let { _id } = req.body;   
        console.log(req.body);
        if (!_id) {
          return res.json({ error: "All filled must be required" });
        } else {
          try {        
            let _delete = await restaurantModel.findByIdAndDelete(_id);        
            if (_delete) {
              return res.json({ success: "Restaurant detail deleted successfully" });
            }
          } catch (err) {
            console.log(err);
          }
        }
      }

}

const restaurantsController = new Restaurants();
module.exports = restaurantsController;
