require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;
const routerExercise = require("./exercises/src/routes");
const routerBasicAPI = require("./practices/basic-api/src/routes");

const db = require("./practices/basic-api/src/database");

const Post = require("./practices/basic-api/src/models/post.model");
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
app.use("/exercise", routerExercise);
app.use("/basic-api", routerBasicAPI);

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
