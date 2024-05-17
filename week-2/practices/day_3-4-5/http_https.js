// http

const http = require("http");
const path = require("path");

// // create server
// http.createServer((req, res) => {
//     // Sends a chunk of the res body
//     res.write("Hello World!");

//     // Signals the server that all of
//     // the res headers and body
//     // have been sent
//     res.end();
// }).listen(3001, () => {
//     console.log("Server listening on port 3001");
// });
// // Hello World!

// request

// let opts = {
//     host: 'www.lizai.co',
//     path: '/products',
//     method: 'GET'
// };

// // Making a get request to
// // 'www.lizai.co'
// http.request(opts, (res) => {
//     // the statusCode
//     console.log(res.statusCode); // 301
// }).end();

//properties

// connection
// // Create an HTTP server
// http.createServer((req, res) => {}).listen(3000, "127.0.0.1", () => {
//     // Getting client request
//     const req = http.request({
//         port: 3000,
//         host: "127.0.0.1",
//     });

//     // Getting request socket
//     // by using connection method
//     if (req.connection) {
//         console.log("Requested for Connection");
//     } else {
//         console.log("Not Requested for Connection");
//     }

//     process.exit(0);
// });
// // Not Requested for Connection

// aborted
// const server = http.createServer((req, res) => {
//     res.writeHead(200, { "Content-Type": "text/plain" });
//     res.end("okay");
// });

// Now that server is running
// server.listen(3000, "127.0.0.1", () => {
//     console.log("Server is Started");
//     // Make a request
//     const options = {
//         port: 3000,
//         host: "127.0.0.1",
//         headers: {
//             Connection: "Upgrade",
//             Upgrade: "websocket",
//         },
//     };

//     // Getting client request
//     const req = http.request(options);

//     // Aborting the request
//     // by using abort() api
//     req.abort();

//     // checking if the client request
//     // has been aborted or not
//     // by using aborted api
//     if (req.aborted) console.log("client request has been aborted");
//     else console.log("client request has not been aborted");
// });

// path

// Creating http Server
// const httpServer = http.createServer(function (req, res) {
//     // Getting request path
//     // by using request.path
//     const value = req.path;
//     console.log("Request URL: ", value);
// });
// // Listening to http Server
// httpServer.listen(3000, () => {
//     console.log("Server is running at port 3000...");
// });

// socket
// const httpServer = http.createServer(function (req, res) {
//     res.writeHead(200, { "Content-Type": "text/plain" });
//     res.end("okay");
//     console.log(req.socket); // socket object {}
// });
// // Listening to http Server
// httpServer.listen(3000, () => {
//     console.log("Server is running at port 3000...");
// });

// setHeaders - getHeaders

// const options = {
//     hostname: "jsonplaceholder.typicode.com", // Example hostname
//     port: 80, // HTTP port
//     path: "/posts", // Path to resource
//     method: "GET", // HTTP method
// };

// // Make the HTTP request
// const req = http.request(options, (res) => {
//     let data = "";

//     // Collect response data chunks
//     res.on("data", (chunk) => {
//         data += chunk;
//     });

//     // Handle the end of the response
//     res.on("end", () => {
//         console.log("Response received:");
//         console.log(JSON.parse(data)); // Parse and print the JSON response
//     });
// });

// // Handle request errors
// req.on("error", (e) => {
//     console.error(`Problem with request: ${e.message}`);
// });

// req.setHeader("foo", "bar");
// console.log(req.getHeaders());

// req.setTimeout(5000, () => {
//     // Timeout after 5000ms (5 seconds)
//     console.error("Request timed out");
//     req.destroy(); // Destroy the request
// });
// //  {
// //   host: 'jsonplaceholder.typicode.com',
// //   foo: 'bar'
// // }
// // End the request
// req.end();

// server

// create server
// const server = http.createServer((req, res) => {
//     // Sends a chunk of the res body
//     res.write("Hello World!");
//     res.end();
// });
// server.setTimeout(10000, () => {
//     console.log("Timeout occurred");
// });
// server.listen(3001, () => {
//     console.log("Server listening on port 3001");
// });

// close
// setTimeout(() => {
//     server.close(() => {
//         console.log("server on port 8000 closed successfully");
//     });
// }, 5000);

// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader("Content-Type", "text/plain");
//     res.end("Hello, World!\n");
// });

// // Set timeout to 10 seconds
// server.setTimeout(10000, () => {
//     console.log("Timeout occurred");
// });

// // Start the server
// server.listen(3000, () => {
//     console.log("Server is running...");
// });

// Server Response
const server = http.createServer((req, res) => {
    console.log(res.getHeaders()); // 200
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello, World!\n");
});

// Start the server
server.listen(3000, () => {
    console.log("Server is running...");
});
