const express = require("express");
const router = express.Router();
const tablesController = require("../controller/tables");
const { loginCheck } = require("../middleware/auth");

router.post("/all-tables",loginCheck, tablesController.getAllTables);
router.post("/create-table",loginCheck, tablesController.createTable);
router.post("/edit-table",loginCheck, tablesController.editTable);
router.post("/update-table",loginCheck, tablesController.updateTable);
router.post("/delete-table",loginCheck, tablesController.deleteTable);

module.exports = router;