module.exports = app =>{
    const loginapi = require("../controller/loginAPI.js");
    // login admin
    router.post("/login", loginapi.login);  

    // Retrieve all records
   // router.get("/", loginapi.findAll);

    app.use("/loginapi", router);
}