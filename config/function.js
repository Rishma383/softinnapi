/* This all of are helper function */
const userModel = require("../models/users");

exports.toTitleCase = function (str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

exports.validateEmail = function (mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  } else {
    return false;
  }
};

exports.emailCheckInDatabase = async function (email) {
  let user = await userModel.findOne({ email: email });
  user.exec((err, data) => {
    if (!data) {
      return false;
    } else {
      return true;
    }
  });
};

exports.phoneNumberCheckInDatabase = async function (phoneNumber) {
  let user = await userModel.findOne({ phoneNumber: phoneNumber });
  user.exec((err, data) => {
    if (data) {
      return true;
    } else {
      return false;
    }
  });
};

exports.randomNumberClient = function () {
  let max=99999999;
  let min=10000000;
  return Math.floor(
    Math.random() * (max - min + 1) + min
  )
};
exports.randomNumberStaff = function () {
  let max=9999999;
  let min=1000000;
  return Math.floor(
    Math.random() * (max - min + 1) + min
  )
};
exports.randomNumberUser = function () {
  let max=999999;
  let min=100000;
  return Math.floor(
    Math.random() * (max - min + 1) + min
  )
};
