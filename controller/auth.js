const { toTitleCase, validateEmail,randomNumberUser } = require("../config/function");
const bcrypt = require("bcryptjs");
const userModel = require("../models/users");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");
const clienttypeModel = require("../models/clienttype");
const usertypesModel = require("../models/usertypes");
const loginModel = require("../models/logins");
class Auth {
  async isAdmin(req, res) {
    let { loggedInUserId } = req.body;
    try {
      let loggedInUserRole = await loginModel.findById(loggedInUserId);
     
      res.json({ role: loggedInUserRole.userTypeId });
    } catch {
      res.status(404);
    }
  }

  async allUser(req, res) {
    try {
      let allUser = await userModel.find({});
      res.json({ users: allUser });
    } catch {
      res.status(404);
    }
  }

  // get all user type
  async getUserType(req, res) {
    try {
      let allUserType = await usertypesModel.find({}, { _id : 1, typeName : 1});
     
      res.json({ userType: allUserType });
    } catch {
      res.status(404);
    }
  }

  /* User Registration/Signup controller  */
  async postSignup(req, res) {
    let { name, email, password } = req.body;
    
    let error = {};
    if (!name || !email || !password ) {
      error = {
        ...error,
        name: "Filed must not be empty",
        email: "Filed must not be empty",
        password: "Filed must not be empty",       
      };
      return res.json({ error });
    }
    if (name.length < 3 || name.length > 25) {
      error = { ...error, name: "Name must be 3-25 charecter" };
      return res.json({ error });
    } else {
      if (validateEmail(email)) {
        name = toTitleCase(name);
        if ((password.length > 255) | (password.length < 8)) {
          error = {
            ...error,
            password: "Password must be 8 charecter",
            name: "",
            email: "",
          };
          return res.json({ error });
        } else {
          // If Email & Number exists in Database then:
          try {
            password = bcrypt.hashSync(password, 10);
            const data = await userModel.findOne({ email: email });
            if (data) {
              error = {
                ...error,
                password: "",
                name: "",
                email: "Email already exists",
              };
              return res.json({ error });
            } else {
              let newUser = new userModel({
                name,
                email,
                password,
                // ========= Here role 1 for admin signup role 0 for customer signup =========
                role: 1,
              });
              newUser
                .save()
                .then((data) => {
                  return res.json({
                    success: "Account create successfully. Please login",
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
          name: "",
          email: "Email is not valid",
        };
        return res.json({ error });
      }
    }
  }

 /* Create Admin controller  */
 async postCreateAdmin(req, res) {
  let {userName, firstName,lastName, email, password,userTypeId,phone } = req.body; 
 
  let error = {};
  if (!userName ||!firstName||!lastName || !email || !password || !userTypeId ||!phone ) {
    error = {
      ...error,
      userName: "Filed must not be empty",
      firstName: "Filed must not be empty",
      lastName: "Filed must not be empty",
      email: "Filed must not be empty",
      password: "Filed must not be empty",     
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
      if ((password.length > 255) | (password.length < 8)) {
        error = {
          ...error,
          password: "Password must be 8 charecter",
          userName: "",
          email: "",
        };
        return res.json({ error });
      } else {
        // If Email & Number exists in Database then:
        try {
          password = bcrypt.hashSync(password, 10);
          const data = await loginModel.findOne({ email: email });
          if (data) {
            error = {
              ...error,
              password: "",              
              email: "Email already exists",
            };
            return res.json({ error });
          } else {           
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
                let newUser = new userModel({
                  loginId:data._id,                 
                  firstName,
                  lastName,                                 
                });
                newUser
                  .save()
                  .then((data) => {
                    return res.json({
                      success: "Admin account create successfully!",
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
        email: "Email is not valid",
      };
      return res.json({ error });
    }
  }
}

  /* User Login/Signin controller  */
  async postSignin(req, res) {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.json({
        error: "Fields must not be empty",
      });
    }
    try {
      const data = await loginModel.findOne({ email: email });
      if (!data) {
        return res.json({
          error: "Invalid email or password",
        });
      } else {
        const login = await bcrypt.compare(password, data.password);
        const _userType=await usertypesModel.findOne({_id:data.userTypeId});
        
        if (login) {
          const token = jwt.sign(
            { _id: data._id, role: _userType.typeName },
            JWT_SECRET
          );
          const encode = jwt.verify(token, JWT_SECRET);
          return res.json({
            token: token,
            user: encode,
            loginId:data._id
          });
        } else {
          return res.json({
            error: "Invalid email or password",
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

   /* insert client type controller  */
   async postClientType(req, res) {
    let { typeName } = req.body;
    if (!typeName) {
      return res.json({
        error: "Fields must not be empty",
      });
    }
    try {
      const data = await clienttypeModel.findOne({ typeName: typeName });
      if (data) {
        return res.json({
          error: "Client type already exists",
        });
      } else {
        let newClientType = new clienttypeModel({
          typeName
        });
        newClientType
          .save()
          .then((data) => {
            return res.json({
              success: "Client type inserted successfully!",
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

   /* insert user type controller  */
   async postUserType(req, res) {
    let { typeName} = req.body;
    if (!typeName) {
      return res.json({
        error: "Fields must not be empty",
      });
    }
    try {
      const data = await usertypesModel.findOne({ typeName: typeName });
      if (data) {
        return res.json({
          error: "User type already exists!",
        });
      } else {
        let newUserType = new usertypesModel({
          typeName
        });
        newUserType
          .save()
          .then((data) => {
            return res.json({
              success: "User type inserted successfully!",
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
}

const authController = new Auth();
module.exports = authController;
