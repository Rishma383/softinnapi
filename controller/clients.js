
const { toTitleCase, validateEmail,randomNumberClient } = require("../config/function");
const clientModel = require("../models/clients");
const loginModel = require("../models/logins");
const restaurantModel = require("../models/restaurants");
const bcrypt = require("bcryptjs");

class Client {
  async getAllClients(req, res) {
    try {
      // let Clients = await clientModel
      //   .find({})        
      //   .sort({ _id: -1 });
      
      let Clients = await clientModel.aggregate([
        {
          $lookup: {
            from: "logins",
            localField: "loginId",
            foreignField: "_id",
            as: "login_info",
          },
        },       
        {
          $unwind: {
            path: "$login_info",
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $lookup: {
            from: "usertypes",
            localField: "login_info.userTypeId",
            foreignField: "_id",
            as: "login_info.usertypes",
          },
        },
        {
          $unwind: "$login_info.usertypes"
        },        
        {
          $project: {
           _id:1,
           firstName:1,
           lastName:1,
           language:1,hotelRestName:1,currency:1,timeZone:1,timeFormat:1,dateFormat:1,commission:1,taxCommission:1,
           phone:1,
            login_info:"$login_info",
          }
        }
      ]);
      if (Clients) {
        return res.json({ Clients });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async deleteClient(req, res) {
    let { id } = req.body;   
    if (!id) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {
        // let deletedUserFile = await clientModel.findById(_id);
        const data1 = await clientModel.findOne({ _id: id}); 
        let deleteClient = await clientModel.findByIdAndDelete(id);
        let deleteLoginDetail=await loginModel.findByIdAndDelete(data1.loginId);
        if (deleteClient) {
          return res.json({ success: "Client deleted successfully" });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  async editClient(req, res) {
    let { id } = req.body;   
    if (!id) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {
        // let deletedUserFile = await clientModel.findById(_id);
        let Client = await clientModel.findById(id).populate("loginId","_id userName email phone userTypeId");
        if (Client) {
          return res.json({ Client });
        }
        else{
          return res.json({ error: "No record found" });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

/* Create client controller  */
async createClient(req, res) {
    let {language,userName,hotelRestName, firstName,lastName, email, password,userTypeId,phone,currency,timeZone,timeFormat,dateFormat,commission,taxCommission } = req.body; 
 
    let error = {};
    if (!language ||!userName || !hotelRestName || !firstName || !lastName|| !email|| !password|| !userTypeId || !phone|| !currency || !timeZone || !timeFormat || !dateFormat || !commission || !taxCommission ) {
      error = {
        ...error,
        hotelRestName: "Filed must not be empty",
        firstName: "Filed must not be empty",
        lastName: "Filed must not be empty",
        email: "Filed must not be empty",
        password: "Filed must not be empty", 
        userTypeId: "Filed must not be empty", 
        phone: "Filed must not be empty",      
      };
      return res.json({ error });
    }
    if (userName.length < 3 || userName.length > 25) {
      error = { ...error, userName: "Name must be 3-25 charecter" };
      return res.json({ error });
    } else {
      if (validateEmail(email)) {
        userName = toTitleCase(userName);
        if ((password.length > 255) | (password.length < 8)) {
          error = {
            ...error,
            password: "Password must be 8 charecter",
            hotelRestName: "",
            email: "",
          };
          return res.json({ error });
        } else {
          // If Email & Number exists in Database then:
          try {
            password = bcrypt.hashSync(password, 10);
            const data = await clientModel.findOne({ email: email });           
            if (data) {
              error = {
                ...error,
                password: "",
                hotelRestName: "",
                email: "Email already exists",
              };
              return res.json({ error });
            } else {
              // let cid=randomNumberClient(); 
              let newlogin=new loginModel({
                userName,
                email,
                password,
                phone,
                userTypeId,
              })
              newlogin
                .save()
                .then((data) => {               
                  let newUser = new clientModel({
                    loginId:data._id,                 
                    language,hotelRestName,firstName,lastName,currency,timeZone,timeFormat,dateFormat,commission,taxCommission                               
                  });
              newUser
                .save()
                .then((data) => {
                  return res.json({
                    success: "Client account create successfully!",
                  });
                })
                .catch((err) => {
                  console.log(err);
                });
              })
              .catch((err) => {
                console.log(err);
              });
            }
          } catch (err) {
            console.log(err);
          }
        }
      } else {
        error = {
          ...error,
          password: "",
          hotelRestName: "",
          email: "Email is not valid",
        };
        return res.json({ error });
      }
    }
  }

  /* update client detail  */
 async updateClient(req, res) {
    let {_id,language,userName,hotelRestName, firstName,lastName, email, userTypeId,phone,currency,timeZone,timeFormat,dateFormat,commission,taxCommission } = req.body; 
    
    let error = {};
    if (!language ||!userName || !hotelRestName || !firstName || !lastName|| !email|| !userTypeId || !phone|| !currency || !timeZone || !timeFormat || !dateFormat || !commission || !taxCommission ) {
      error = {
        ...error,
        userName: "Filed must not be empty",
        firstName: "Filed must not be empty",
        lastName: "Filed must not be empty",
        email: "Filed must not be empty", 
        userTypeId: "Filed must not be empty", 
        phone: "Filed must not be empty",           
      };     
      return res.json({ error });
    }
    if (userName.length < 3 || userName.length > 25) {
      error = { ...error, userName: "Name must be 3-25 charecter" };
     
      return res.json({ error });
    } else {
      if (validateEmail(email)) {  
        userName = toTitleCase(userName);    
          // If Email & Number exists in Database then:
          try {    
            const data1 = await clientModel.findOne({ _id: _id });       
            const data = await loginModel.findOne({ email: email,
              _id: { $ne: data1.loginId }
             });
            if (data) {
              error = {
                ...error,
                phone: "",
                userName: "",
                email: "Email already exists",
              };
              
              return res.json({ error });
            } else {   
                
              let editLogin=  loginModel.findByIdAndUpdate(data1.loginId,{
               userName,
               email,
               phone,
               userTypeId,
               updatedAt: Date.now(),
              }); 
              let edit1= editLogin.exec();             
              let editClient = clientModel.findByIdAndUpdate(_id, {               
                language,hotelRestName,firstName,lastName,currency,timeZone,timeFormat,dateFormat,commission,taxCommission,
                updatedAt: Date.now(),
              });
              let edit = await editClient.exec();
              if (edit) {
                return res.json({ success: "Client edit successfully" });
              }              
            }
          } catch (err) {
            console.log(err);
          }       
      } else {
        error = {
          ...error,
          phone: "",
          userName: "",
          email: "Email is not valid",
        };       
        return res.json({ error });
      }
    }
  }

  // get hotel name and total number of restaurants of it
  async getRestaurantCount(req, res) {
    let { id } = req.body;
    console.log(req.body);   
    if (!id) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {
        
        // let Hotel = await restaurantModel.aggregate([
        //   {
        //     $lookup:{
        //       from:"clients",
        //       localField:"clientId",
        //       foreignField:"_id",
        //       as:"dateDetails"
        //     }
        //   },
        //       {$unwind:"$dateDetails"},
        //       {$group:{
        //         _id:{clientId:"$dateDetails._id"},
        //         count:{$sum:"$_id"}}
        //       },
        //       {
        //         $project: {  
        //           _id:1,                        
        //           login_info:"$dateDetails",
        //         }
        //       }
        //     ])
        // let Hotel = await clientModel.aggregate([
        //   { $group: { _id: null, myCount: { $sum: 1 } } },
        //   {
        //     $lookup: {
        //       from: "restaurants",
        //       localField: "_id",
        //       foreignField: "clientId",
        //       as: "restaurantCount",
        //     },
        //   },       
        //   { $unwind: "$restaurantCount" },   
                   
          // {
          //   $project: {
          //    _id:1,
          //    hotelRestName:1,            
          //     login_info:"$restaurantCount",
          //   }
          // }
        // ]);
        //let Hotel = await restaurantModel.countDocuments();
        let client=await clientModel.findOne({loginId:id});
       
        let countRes=await restaurantModel.countDocuments({clientId:client._id});
       
        let Hotel =[];
        if(countRes>0){
           Hotel = await restaurantModel.aggregate([
            {$match:{clientId:client._id}},
            {$count:"restauratns"},
            {
              $lookup: {
                from: "clients",              
                 let: { idd: client._id},
                 pipeline: [
                  {$project: {_id: 1,hotelRestName:1, bid: {"$toObjectId": "$$idd"}}},
                  {$match: {$expr: {$eq: ["$_id", "$bid"]}}}
               ],            
                as: "restaurantCount",              
              },
            },       
            { $unwind: "$restaurantCount" },            
            {
              $project: {
                "restaurantCount._id":1,
               "restaurantCount.hotelRestName":1,            
               "restauratns":1,
              }
            },
             
          ]);
          console.log(Hotel);
          if (Hotel) {
            return res.json({ Hotel });
          }
        }
        else{
          Hotel.push({"restaurantCount._id": client._id, "restaurantCount.hotelRestName": client.hotelRestName,"restauratns":countRes});
          console.log(Hotel);
          if (Hotel) {
            return res.json({ Hotel });
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
}

const clientController = new Client();
module.exports = clientController;
