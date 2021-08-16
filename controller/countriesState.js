const countriesModel = require("../models/countries");
const statesModel = require("../models/states");

class CountryState{
 async getAllCountry(req, res) {
    try {
        let allCountries = await countriesModel.find({});        
        res.json({ country: allCountries });
    } catch {
        res.status(404);
    }
  }
async getAllStates(req, res) {
    let {countryCode}=req.body;    
    try {
        let allStates = await statesModel.find({ countryCode: countryCode});        
        res.json({ state: allStates });
    } catch {
        res.status(404);
    }
 }

 async insertCountry(req, res){
  let {name,code}=req.body;
  let country= await countriesModel({
    name,code
  })
  country.save().then((data)=>{
    return res.json({
        success: "Country inserted successfully!",
      });
  })
 }

 async insertState(req, res){
    let {name,countryCode,code}=req.body;
    let state= await statesModel({
      name,countryCode,code,updatedAt: Date.now(),
    })
    state.save().then((data)=>{
      return res.json({
          success: "State inserted successfully!",
        });
    })
   }

}

const countryStateController = new CountryState();
module.exports = countryStateController;
