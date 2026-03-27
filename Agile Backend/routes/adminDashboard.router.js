const express = require("express");
const router = express.Router();
const adminController = require("../component/adminDashboard.controller");

// POST
router.post("/data", adminController.createData);

// GET
router.get("/data", adminController.getAllData);

module.exports = router;