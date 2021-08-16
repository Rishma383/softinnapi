const express = require("express");
const router = express.Router();
const customersController = require("../controller/customers");
const { loginCheck } = require("../middleware/auth");

//router.post("/all-customers", customersController.getAllCustomers);
router.post("/create-customer", customersController.createCustomer);

module.exports = router;