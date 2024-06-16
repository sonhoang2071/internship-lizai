const express = require("express");
const router = express.Router();

const TaskController = require("../controllers/task.controller");

router.post("/start", TaskController.start);
router.post("/stop", TaskController.stop);
router.post("/restart", TaskController.restart);
router.post("/delete", TaskController.delete);
router.post("/show", TaskController.showData);

module.exports = router;