const { toTitleCase, validateEmail } = require("../config/function");
const staffModel = require("../models/staffs");
const loginModel = require("../models/logins");
const clientModel = require("../models/clients");
const usertypesModel = require("../models/usertypes");
const bcrypt = require("bcryptjs");
const { findById } = require("../models/staffs");

class Staff {
  async getAllStaff(req, res) {
    let{loginId}=req.body;
    try {         
      let client=await clientModel.findOne({loginId:loginId});
      let clientId=client._id;
      let staffs = await staffModel.aggregate([
        {
        //   $match: {
        //     clientId: clientId
        // },
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
      
      if (staffs) {
        return res.json({ staffs });
      }
    } catch (err) {
    
      console.log(err);
    }
  }

  async deleteStaff(req, res) {
    let { _id } = req.body;   
    if (!_id) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {
        // let deletedstaffFile = await staffModel.findById(_id);
        const data1 = await staffModel.findOne({ _id: _id}); 
        let deletestaff = await staffModel.findByIdAndDelete(_id);
        let deleteLoginDetail=await loginModel.findByIdAndDelete(data1.loginId);
        if (deletestaff) {
          return res.json({ success: "staff deleted successfully" });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  async editStaff(req, res) {
    let { _id } = req.body;   
    if (!_id) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {
        // let deletedstaffFile = await staffModel.findById(_id);
        let staff = await staffModel.findById(_id).populate("loginId","_id userName email phone userTypeId");        
        if (staff) {
          return res.json({ staff });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  /* update Staff detail */
 async updateStaff(req, res) {
    let {_id,loginId,userName, firstName,lastName, email,userTypeId,phone } = req.body;    
    let error = {};
    if (!loginId ||!userName ||!firstName||!lastName || !email || !userTypeId ||!phone ) {
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
           
            const data1 = await staffModel.findOne({ _id: _id
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
              let client=await clientModel.findOne({loginId:loginId});
              let clientId=client._id;
               let editLogin=  loginModel.findByIdAndUpdate(data1.loginId,{               
                userName,
                email,
                phone,
                userTypeId,
                updatedAt: Date.now(),
               }); 
               let edit1= editLogin.exec();    
              let editstaff = staffModel.findByIdAndUpdate(_id, {
                clientId,
                firstName,
                  lastName,                                    
                  updatedAt: Date.now(),
              });
              let edit = await editstaff.exec();
              if (edit) {
                return res.json({ success: "staff edit successfully" });
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

 /* create Staff detail */
 async createStaff(req, res) {
  let {loginId,userName, firstName,lastName, email,password,userTypeId,phone } = req.body;    
  let error = {};
  if (!loginId ||!userName ||!firstName||!lastName || !email ||!password || !userTypeId ||!phone ) {
    error = {
      ...error,
      userName: "Filed must not be empty",
      firstName: "Filed must not be empty",
      lastName: "Filed must not be empty",
      email: "Filed must not be empty",  
      password: "Filed must not be empty",
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
                  
          const data = await loginModel.findOne({ email: email });
          if (data) {
            error = {
              ...error,
              phone: "",
              userName: "",
              email: "Email already exists",
            };
            return res.json({ error });
          } else {  
            password = bcrypt.hashSync(password, 10);
            let client=await clientModel.findOne({loginId:loginId});
            let clientId=client._id;
             let Login= new loginModel({              
              userName,
              email,
              password,
              phone,
              userTypeId,
             }); 
             Login
             .save()
             .then((data) => {   
                    let staff = staffModel({
                      loginId:data._id,
                      clientId,
                      firstName,
                        lastName,                                    
                        updatedAt: Date.now(),
                    });
                    staff
                    .save()
                    .then((data2) => {
                      return res.json({
                        success: "Staff account create successfully!",
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

const staffsController = new Staff();
module.exports = staffsController;
