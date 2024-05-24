const express = require("express");
const app = express();
const port = 3000;

const router = require("./src/routes");

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.get("/", (req, res) => res.send("Hello World!"));
app.use("/api", router);
app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});
app.use((err, req, res, next) => {
    const statusCode = err.status || 500;
    return res.status(statusCode).json({
        status: "false",
        message: err.message || "Internal Server Error",
    });
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
