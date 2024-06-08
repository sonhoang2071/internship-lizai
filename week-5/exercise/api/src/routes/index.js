const express = require("express");
const router = express.Router();

const ExerciseController = require("../controllers");

router.get("/api", ExerciseController.callApi);

module.exports = router;