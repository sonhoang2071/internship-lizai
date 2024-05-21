// // basic express
// const express = require("express");
const express = require("express");
const app = express();
const PORT = 3000;
const router = express.Router();
// const app = express();
// const PORT = 3000;

// app.get("/", (req, res) => res.send("Hello"));

// app.listen(PORT, (error) => {
//     if (!error) console.log("App is listening on port " + PORT);
//     else console.log("Error occurred, app can't start", error);
// });

// // routing path
// const express = require("express");
// const app = express();

// // get post put patch delete method
// app.get("/", (req, res) => {
//     res.send("This is a get request");
// });
// app.post("/", (req, res) => {
//     res.send("This is a post request");
// });

// app.put("/", (req, res) => {
//     res.send("This is a put request");
// });

// app.patch("/", (req, res) => {
//     res.send("This is a patch request");
// });

// app.delete("/", (req, res) => {
//     res.send("This is a delete request");
// });

// // different path
// app.get("/me", (req, res) => {
//     res.send("Say hello !");
// });

// app.listen(3000);

// const express = require("express");
// const app = express();

// const route = require("./routes");

// app.use("/", route);

// app.listen(3000, (e) => {
//     console.log("App is running");
// });

// Express JS express() Methods

// // express.json()
// const express = require("express");
// const app = express();
// const PORT = 3000;

// app.use(express.json());

// app.post("/", function (req, res) {
//     console.log(req.body.name);
//     res.end();
// });
// app.use((req, res, next) => {
//     const error = new Error("Not Found");
//     error.status = 404;
//     next(error);
// });

// app.use((error, req, res, next) => {
//     const statusCode = error.status || 500;
//     return res.status(statusCode).json({
//         status: "error",
//         code: statusCode,
//         message: error.message || "Internal Server Error",
//         stack: error.stack,
//     });
// });

// app.listen(PORT, function (err) {
//     if (err) console.log(err);
//     console.log("Server listening on PORT", PORT);
// });

// app.use()

// // This middleware will not allow the
// // request to go beyond it
// app.use(function (req, res, next) {
//     console.log("Middleware passing");
//     next();
// });

// // Requests will never reach this route
// app.get('/user', function (req, res) {
//     res.send("GET User Request");
// });

// // Handling POST Request
// app.post('/user', function (req, res) {
//     res.send("POST User Request");
// });

// // Handling DELETE Request
// app.delete('/user', function (req, res) {
//     res.send("DELETE User Request");
// });

// app.listen(PORT, function (err) {
//     if (err) console.log(err);
//     console.log(`Server listening on PORT ${PORT}`);
// });

// app.route()

// app.route("/user")
//     .get((req, res, next) => {
//         res.send("GET USER Request");
//     })
//     .post((req, res, next) => {
//         res.send("POST USER Request");
//     })
//     .all((req, res, next) => {
//         res.send("Other Requests");
//     });

// app.listen(PORT, function (err) {
//     if (err) console.log(err);
//     console.log("Server listening on PORT", PORT);
// });

// app.all()
// app.all("/user", function (req, res, next) {
//     res.send("USER API CALLED");
// });

// app.listen(PORT, function (err) {
//     if (err) console.log(err);
//     console.log("Server listening on PORT", PORT);
// });

// app.get() & app.set()
// app.set("name", "Son");

// app.get("/", (req, res) => {
//     res.send(app.get("name"));
// });

// disable
// app.set("name", "Son");

// app.disable("name");

// console.log(app.get("name")); // false

// enable
// app.enable("name");

// console.log(app.get("name")); // true

// Express Request Methods

// req.app Property

// app.get("/", function (req, res) {
//     console.log(req.app);
//     res.send();
// });

// req.baseUrl
// const user = express.Router();
// user.get("/login", function (req, res) {
//     console.log(req.baseUrl); // /user
//     res.end();
// });

// app.use("/user", user);

// // req.body
// app.use(express.json());

// app.post("/user", function (req, res) {
//     res.send(req.body);
// });
// // {
// //     "name": "Son",
// //     "age": 21
// // }

// app.post("/user", function (req, res) {
//     res.send(req.body);
// });

// const cookieParser = require("cookie-parser");

// app.use(cookieParser());

// app.get("/", function (req, res) {
//     req.cookies.title = "Internship LizAI";
//     res.send(req.cookies);
// });

// // {
// //     "title": "Internship LizAI"
// // }

// // req.method

// app.get("/", function (req, res) {
//     res.send(req.method); // GET
// });

// // req.route
// app.get("/", function (req, res) {
//     res.send(req.route);
// });

// // {
// //     "path": "/",
// //     "stack": [
// //         {
// //             "name": "<anonymous>",
// //             "keys": [],
// //             "regexp": {
// //                 "fast_star": false,
// //                 "fast_slash": false
// //             },
// //             "method": "get"
// //         }
// //     ],
// //     "methods": {
// //         "get": true
// //     }
// // }

// req.params
// const user = express.Router();
// app.use("/user", user);

// app.get("/user/:id/:name", function (req, res) {
//     console.log(req.params);
//     res.send();
// });
// // { id: '1', name: 'son' }

// // app.query
// app.get("/users", function (req, res) {
//     console.log(req.query);
//     res.send();
// });
// // { name: 'Son', age: '21' }

// Express Response Function
// res.app Property

// app.get("/", (req, res) => {
//     console.log(res.app);
//     res.end();
// });

// res.append()

// app.get("/", function (req, res) {
//     res.append("name", "Son");
//     console.log(res.get("name")); // Son
// });

// // res.cookie()
// app.get("/", function (req, res) {
//     // key-value
//     res.cookie("name", "Son");
//     res.send("Cookie is set");
// });

// res.clearCookie()
// app.get("/", function (req, res) {
//     // Setting cookie (key-value)
//     res.cookie("name", "Son");
//     // Clearing the cookie
//     res.clearCookie("name");

//     console.log("Cookie is cleared");
// });

// // res.send()
// app.get("/", function (req, res) {
//     res.send({ name: "Son" }); // {"name": "Son"}
// });

// // res.redirect()
// app.get("/", function (req, res) {
//     res.redirect("/home");
// });

// app.get("/home", function (req, res) {
//     res.send("Redirected to Home Page");
// });

// // Redirected to Home Page

// res.status()
// app.get("/home", function (req, res) {
//     res.status(200).send("Home Page");
// });

// app.get("/shop", function (req, res) {
//     res.status(301).send("Shop Page");
// });

// // Without middleware
// app.get("/", function (req, res) {
//     // Setting the response
//     res.set({ name: "Son" });

//     // "application/json"
//     console.log(res.get("name")); // Son
//     res.end();
// });

// router.use(function (req, res, next) {
//     console.log("Middleware Here");
//     next();
// });
// router.get("/", (req, res) => {
//     console.log("Welcome");
//     res.end();
// });
// app.use("/", router);

// router.route("/user").get((req, res, next) => {
//     console.log("Welcome");
//     res.end();
// });
// router.all("/user", function (req, res) {
//     console.log("User API Request");
//     res.end();
// });
// app.use(router);

// Middleware types
// Application-level middleware
// app.use((req, res, next) => {
//     console.log("Middleware here");
//     next();
// });

// Router-level middleware:
router.use((req, res, next) => {
    console.log("Middleware here");
    next();
});

app.use("/router", router);
app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    const statusCode = error.status || 500;
    return res.status(statusCode).json({
        status: "error",
        code: statusCode,
        message: error.message || "Internal Server Error",
        stack: error.stack,
    });
});

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});
