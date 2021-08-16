const tablesModel = require("../models/tables");

class Tables{
  /*-- get all tables --*/
  async getAllTables(req, res) {
    let {restaurantId}=req.body;
    try {
        let tables = await tablesModel.find({restaurantId:restaurantId});       
        if (tables) {
        return res.json({ tables });
        }
    } catch (err) {
        console.log(err);
    }    
  }

  /*-- insert new table  --*/
  async createTable(req, res){
    let {restaurantId,tableName,tableCapacity}= req.body;
   
    let error = {};
    if(!restaurantId ||!tableName ||!tableCapacity){
        error = {
            ...error,
            restaurantId: "Client must not be empty",
            tableName: "table name must not be empty",
            tableCapacity:"table capacity must not be empty"
        };
        return res.json({ error });
    }
    else{
        const data = await tablesModel.findOne({ tableName: tableName, restaurantId: restaurantId });  
        
        if (data) {
            error = {
              ...error,
              tableName: "table name already exists",
            };
            return res.json({ error });
          } 
          else{
              try{                
                let table= new tablesModel({
                    restaurantId,tableName,tableCapacity
                })
                table.save().then((data1) => {
                    return res.json({
                      success: "table  saved successfully!",
                    });
                  })
              }catch (err) {
               console.log(err);
             }
          }
      }
   }

/* Edit table  detail */
async editTable(req, res) {
    let { _id } = req.body;   
    if (!_id) {
      return res.json({ error: "All filled must be required" });
    } 
    else {
      try {        
        let table = await tablesModel.findById(_id);
        if (table) {
          return res.json({ table });
        }
        else{
          return res.json({ error: "No record found" });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

   /*-- update table  --*/
   async updateTable(req, res){
    let {_id,restaurantId,tableName,tableCapacity}= req.body;
    let error = {};
    if(!restaurantId ||!tableName ||!tableCapacity){      
        error = {
            ...error,
            restaurantId: "Client must not be empty",
            tableName: "table  must not be empty",
            tableCapacity:"table capacity must not be empty"
        };
        return res.json({ error });
    }
    else{
        const data = await tablesModel.findOne({ tableName: tableName, restaurantId: restaurantId, _id: { $ne: _id } });          
        if (data) {          
            error = {
              ...error,
              tableName: "table  name already exists",
            };
            return res.json({ error });
          } 
          else{
              try{                
                let table=  tablesModel.findByIdAndUpdate(_id,{
                    restaurantId,tableName,tableCapacity,updatedAt: Date.now(),
                })
                let edit = await table.exec();
                if (edit) {
                    return res.json({ success: "table name updated successfully" });
                  } 
              }catch (err) {
               console.log(err);
             }
          }
      }
   }

   /*-- delete table  name */
   async deleteTable(req, res) {
    let { _id } = req.body;   
    if (!_id) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {        
        let _delete = await tablesModel.findByIdAndDelete(_id);        
        if (_delete) {
          return res.json({ success: "table deleted successfully" });
        }
        else{
            return res.json({ error: "No record found" });
          }
      } catch (err) {
        console.log(err);
      }
    }
  }

}

const tablesController = new Tables();
module.exports = tablesController;
