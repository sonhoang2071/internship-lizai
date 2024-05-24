const express = require("express");
const router = express.Router();
const { ex1, ex2 } = require("../controllers");

router.post("/ex1", ex1);
router.post("/ex2", ex2);

module.exports = router;
