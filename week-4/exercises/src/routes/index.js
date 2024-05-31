const express = require("express");
const router = express.Router();
const controller = require("../controllers");

router.post("/api1", controller.api1);
router.post("/api2", controller.api2);


module.exports = router;
