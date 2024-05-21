const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("This is a get request");
});
router.post("/", (req, res) => {
    res.send("This is a post request");
});

router.put("/", (req, res) => {
    res.send("This is a put request");
});

router.patch("/", (req, res) => {
    res.send("This is a patch request");
});

router.delete("/", (req, res) => {
    res.send("This is a delete request");
});

module.exports = router;
