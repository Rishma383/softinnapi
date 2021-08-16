const express = require("express");
const router = express.Router();
const clientsController = require("../controller/clients");
const { loginCheck } = require("../middleware/auth");

router.get("/all-clients",loginCheck, clientsController.getAllClients);
router.post("/create-client",loginCheck, clientsController.createClient);
router.post("/delete-client", loginCheck, clientsController.deleteClient);
router.post("/edit-client", loginCheck, clientsController.editClient);
router.post("/update-client", loginCheck, clientsController.updateClient);

router.post("/count-restaurants",loginCheck, clientsController.getRestaurantCount);
// router.post("/create-hoteladdress",loginCheck, clientsController.createHotelAddress);
// router.post("/update-hoteladdress",loginCheck, clientsController.updateHotelAddress);

module.exports = router;