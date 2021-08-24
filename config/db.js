const express=require("express");
const mongoose = require("mongoose");
// try {
//   mongoose.connect("mongodb+srv://softinn:Softinn765!@cluster0.8yo49.mongodb.net/softinndb?retryWrites=true&w=majority", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//   });
//   console.log("Database Connected Successfully");
// } catch (err) {
//   console.log("Database Not Connected");
// }

try {
  mongoose.connect("mongodb://localhost:27017/Softinn", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log("Database Connected Successfully");
} catch (err) {
  console.log("Database Not Connected");
}
