const { toTitleCase, validateEmail, randomNumberUser } = require("../config/function");
const customersModel = require("../models/customers");

class Customer{
     /* Customer Registration/Signup controller  */
  async createCustomer(req, res) {
    let { fullName, email, phone } = req.body;
    console.log(req.body);
    let error = {};
    if (!fullName || !email || !phone ) {
      error = {
        ...error,
        fullName: "Filed must not be empty",
        email: "Filed must not be empty",
        phone: "Filed must not be empty",       
      };
      return res.json({ error });
    }
    if (fullName.length < 3 || fullName.length > 25) {
      error = { ...error, fullName: "Name must be 3-25 charecter" };
      return res.json({ error });
    } else {
      if (validateEmail(email)) {       
        if ((phone.length > 20) | (phone.length < 10)) {
          error = {
            ...error,
            phone: "phone must be at least 10 digits",
            fullName: "",
            email: "",
          };
          return res.json({ error });
        } else {
          // If Email & Number exists in Database then:
          try {            
            const data = await customersModel.findOne({ email: email });
            console.log(data)
            if (data) {
              let _id=data._id;
              console.log(_id);
              let updateCustomer= customersModel.findByIdAndUpdate(_id,{
                fullName,                
                phone,  
                updatedAt: Date.now(),
              });
              let edit = await updateCustomer.exec();
              if (edit) {            
                return res.json({
                  success: "Customer detail updated successfully!",
                  _id:data._id
                });
              }
             
            } else {
              let newUser = new customersModel({
                fullName,
                email,
                phone,               
              });
              newUser
                .save()
                .then((data1) => {
                  return res.json({
                    success: "Account create successfully. Please scan QR code",
                    _id:data1._id
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
          phone: "",
          fullName: "",
          email: "Email is not valid",
        };
        return res.json({ error });
      }
    }
  }
  
}

const customerController = new Customer();
module.exports = customerController;