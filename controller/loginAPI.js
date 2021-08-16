const db = require("../models");

const Op = db.Sequelize.Op;
const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  ssl: {
    rejectUnauthorized: false
  },
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});


//-- login api to get only id of admin
exports.login=(req,res)=>{   
    var email1=req.body.email;
    var pass1=req.body.password;     
    AdminLogin.findAll({ 
        attributes:['id','role'],
        where: {email:email1 , password:pass1} 
    })
      .then(data => {  
        if(data.length>0) {
          res.status(200).send({
            status:1,
            message:"Admin login successfully",
            data:data});
        }
        else{
          res.status(200).send({
            status:0,
            message:"Login credentials are incorrect",
            data:data});
        }
      })
      .catch(err => {
        res.status(500).send({
          status:-100,
          message:
            err.message || "There is some technical error, please try again.",
            data:[]
        });
      });    
};