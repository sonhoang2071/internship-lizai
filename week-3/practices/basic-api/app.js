require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;
const router = require("./src/routes");
const db = require("./src/database");

const Post = require("./src/models/post.model");
db.sync()
    .then((result) => {
        console.log("Database is connected");
    })
    .catch((err) => {
        console.log(err);
    });
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.get("/", (req, res) => res.send("Hello World!"));
app.use("/api", router);

// handle not found error
app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});
app.use((err, req, res, next) => {
    const statusCode = err.status || 500;
    return res.status(statusCode).json({
        status: "error",
        message: err.message || "Internal Server Error",
        stack: err.stack,
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
