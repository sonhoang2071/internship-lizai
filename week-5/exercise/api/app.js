const express = require('express');

const app = express();
const PORT = 3000;

const routeApi = require("./src/routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    return res.status(200).send('Welcome');
})

app.use("/", routeApi);

// handle not found error
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
        stack: err.stack,
        err : err
    });
});

app.listen(PORT, () => console.log(`App API is listening on port ${PORT}`));