const { toTitleCase, validateEmail } = require("../config/function");
const userModel = require("../models/users");
const loginModel = require("../models/logins");
const usertypesModel = require("../models/usertypes");
const bcrypt = require("bcryptjs");
const { findById } = require("../models/users");

class User {
  async getAllUser(req, res) {
    try {    
     
    //   let Users = await userModel
    //   .find({})
    //   .populate("loginId","_id userName email userTypeId")         
    //   .populate("userTypeId","typeName")
    //   .sort({ _id: -1 }); 
      

      let Users = await userModel.aggregate([
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
           phone:1,
            login_info:"$login_info",
          }
        }
      ]);
      
      if (Users) {
        return res.json({ Users });
      }
    } catch (err) {
    
      console.log(err);
    }
  }

  async deleteUser(req, res) {
    let { id } = req.body;   
    if (!id) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {
        // let deletedUserFile = await userModel.findById(_id);
        const data1 = await userModel.findOne({ _id: id}); 
        let deleteUser = await userModel.findByIdAndDelete(id);
        let deleteLoginDetail=await loginModel.findByIdAndDelete(data1.loginId);
        if (deleteUser) {
          return res.json({ success: "User deleted successfully" });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  async editUser(req, res) {
    let { id } = req.body;   
    if (!id) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {
        // let deletedUserFile = await userModel.findById(_id);
        let User = await userModel.findById(id).populate("loginId","_id userName email phone userTypeId");        
        if (User) {
          return res.json({ User });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  /* Create Admin controller  */
 async updateUser(req, res) {
    let {_id,userName, firstName,lastName, email,userTypeId,phone } = req.body;    
    let error = {};
    if (!userName ||!firstName||!lastName || !email || !userTypeId ||!phone ) {
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
    if (userName.length < 4 || userName.length > 25) {
      error = { ...error, userName: "Name must be 4-25 charecter" };
      return res.json({ error });
    } else {
      if (validateEmail(email)) {  
        userName = toTitleCase(userName);     
          // If Email & Number exists in Database then:
          try {   
            const data1 = await userModel.findOne({ _id: _id
            });         
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
              let editUser = userModel.findByIdAndUpdate(_id, {
                firstName,
                  lastName,                                    
                  updatedAt: Date.now(),
              });
              let edit = await editUser.exec();
              if (edit) {
                return res.json({ success: "User edit successfully" });
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

}

const usersController = new User();
module.exports = usersController;
