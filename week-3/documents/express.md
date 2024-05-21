# ExpressJS

<aside>
💡 **Express.js** is a fast, flexible and minimalist web framework for Node.js. It’s effectively a tool that simplifies building web applications and APIs using JavaScript on the server side. Express is an open-source that is developed and maintained by the Node.js foundation.

</aside>

# 1. Express Basic

<aside>
💡 **Express** is a small framework that sits on top of Node.js’s web server functionality to simplify its APIs and add helpful new features. It makes it easier to organize your application’s functionality with middle ware and routing; it adds helpful utilities to Node.js’s HTTP objects;it facilitates the rendering of dynamic HTTP objects.

</aside>

## 1.1 **Getting Started Express**

- Install Express using npm:

```jsx
$ npm install express
```

- Create a file **app.js**

```jsx
const express = require('express'); 
  
const app = express(); 
const PORT = 3000; 

app.get("/", (req, res) => res.send("Hello, World!"));
  
app.listen(PORT, (error) =>{ 
    if(!error) 
        console.log("App is listening on port "+ PORT) 
    else 
        console.log("Error occurred, app can't start", error); 
    } 
); 
```

- Step to run the application

```jsx
node app.js
```

## 1.2 Basic Express Guide

### 1.2.1 Routing Path

<aside>
💡 **What and Why ?**

Routing in ExpressJS is used to subdivide and organize the web application into multiple mini-applications each having its own functionality. It provides more functionality by subdividing the web application rather than including all of the functionality on a single page. These mini-applications combine together to form a web application. Each route in Express responds to a client request to a particular route/endpoint and an HTTP request method (GET, POST, PUT, DELETE, UPDATE and so on).

</aside>

**How it is done in Express ?**

- **Without using Router:** Instead of using express.router, we make use of app.method (route, function)

```jsx
const express = require("express");
const app = express();

// get post put patch delete method
app.get("/", (req, res) => {
    res.send("This is a get request");
});
app.post("/", (req, res) => {
    res.send("This is a post request");
});

app.put("/", (req, res) => {
    res.send("This is a put request");
});

app.patch("/", (req, res) => {
    res.send("This is a patch request");
});

app.delete("/", (req, res) => {
    res.send("This is a delete request");
});

// different path
app.get("/me", (req, res) => {
    res.send("Say hello !");
});

app.listen(3000);
```

- **Using the Router:** We can make use of express.router to simplify our code. Instead of specifying the path every time for a specific request, we just have to specify the path once and then we can chain the request methods to that path using the express router
    - routes/index.js
    
    ```jsx
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
    ```
    
    - app.js
    
    ```jsx
    const express = require("express");
    const app = express();
    
    const route = require("./routes");
    
    app.use("/", route);
    
    app.listen(3000, (e) => {
        console.log("App is running");
    });
    ```
    

### 1.2.2 **req and res objects in Express JS**

- **req (Request) Object:**
    - **Accessing the Request Data:** By using the req object, we can access the various components of the incoming HTTP request which consists of data, headers, parameters, etc.
    - **Middleware Interaction:** Using the req object in Express.js, middleware functions can change and modify the request object by allowing various tasks of logging and authentication.
    - **Routing:** By implementing the dynamic routes in the application, the req object can be used as it captures the URL parameters and also allows it to respond dynamically based on the client’s input.
- **res (Response) Object:**
    - **Send Responses:** The res object is used to send the HTP responses to the client which includes the resource, data, status codes, and headers.
    - **Error Handling:** Using the res object we can send the error responses which is important for handling the errors and providing feedback to the client.
    - **Content Modification:** We can set the custom response headers, status codes, and content through which the response control can be managed by us.

### 1.2.3 S**tatic files in Express JS**

```jsx
app.use(express.static(path.join(__dirname, 'public')));
```

In this approach, we are going to use the built-in middleware of Express called **[express.static](https://www.geeksforgeeks.org/express-js-express-static-function/)**, which is used to server static files. This middleware will convert your root folder into an argument and return a function that you can use in your server-side application. Express.static is a built-in feature of Express JS , users do not need to install it separately. Path module is used in it to join the path from public directory to the required file.

# **2. Express JS express() Methods**

## 2.1 **express.json() Function**

<aside>
💡 The **express.json()** function is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on **body-parser**.

</aside>

```jsx
app.use(express.json());
```

## 2.2 **express.urlencoded() Function**

<aside>
💡 The **express.urlencoded()** function is a built-in middleware function in Express. It parses incoming requests with URL-encoded payloads and is based on a body parser.

</aside>

```jsx
app.use(express.urlencoded({ extended: false }));
```

## 2.3 **express.Router() Function**

<aside>
💡 The **express.Router()** function is used to create a new router object. This function is used when you want to create a new router object in your program to handle requests.

</aside>

```jsx
const router = express.Router();
```

# **3. Express Applications Methods**

## 3.1 **app.use() Function**

<aside>
💡 The **app.use()** function is used to mount the specified middleware function(s) at the path that is being specified. It is mostly used to set up middleware for your application.

</aside>

- **app.use**(path, callback) :
    - **path:** It is the path for which the middleware function is being called. It can be a string representing a path or path pattern or a regular expression pattern to match the paths.
    - **callback:** It is a middleware function or a series/array of middleware functions.

```jsx
app.use(function (req, res, next) {
    console.log("Middleware passing");
    next();
});
```

## 3.2 **app.listen() Function**

<aside>
💡 **app.listen()** in Express is like telling your app to start listening for visitors on a specific address and port, much like how Node listens for connections. The app, created by `express()`, is just a handy function that handles different types of requests, making it easy to serve both HTTP and HTTPS versions of your app without extra complexity.

</aside>

- **app.listen**([port[, host[, backlog]]][, callback])
    - **Port**: It specifies the port on which we want our app to listen.
    - **Host** (Optional): It specifies the IP Address of the host on which we want our app to listen. You can specify the host if and only if you have already specified the port. ( since you have a closing(‘]’) bracket after ([, host[, backlog]]) as you can see in the above syntax, so this means the port must be specified before specifying host and backlog).
    - **Backlog** (Optional): It specifies the max length of the queue of pending connections. You can specify the backlog if and only if you have already specified the port and host. ( since you have a closing bracket after ([, backlog]), so this means you will have to specify the host before specifying backlogs)
    - **Callback** (Optional): It specifies a function that will get executed, once your app starts listening to the specified port. You can specify callback alone i.e., without specifying port, host, and backlogs.( since this is a separate set of arguments in opening and closing brackets([, callback]), this means you can specify these arguments without specifying the argument of previous opening and closing square brackets.

```jsx
app.listen(PORT, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
})
```

## 3.3 **app.[http_methods]() Function**

<aside>
💡 is used to route an HTTP request, where METHOD is the HTTP method of the request, such as GET, PUT, POST, and so on, in lowercase. Thus, the actual methods are app.get(), app.post(), app.put(), and so on.

</aside>

- **app.[http_methods]**(path, callback [, callback ...])
    - **Path:** The path for which the middleware function is invoked and can be any of:
        - A string represents a path.
        - A path pattern.
        - A regular expression pattern to match paths.
        - An array of combinations of any of the above.
    - **Callback:** Callback functions can be:
        - A middleware function.
        - A series of middleware functions (separated by commas).
        - An array of middleware functions.
        - A combination of all of the above.

```jsx
app.get('/user', function (req, res) {
    res.send("GET User Request");
});
 
app.post('/user', function (req, res) {
    res.send("POST User Request");
});
 
app.delete('/user', function (req, res) {
    res.send("DELETE User Request");
});
```

## 3.4 **app.route() Function**

<aside>
💡 The **app.route() function** returns an instance of a single route, which you can then use to handle HTTP verbs with optional middleware. Use app.route() to avoid duplicate route names (and thus typo errors).

</aside>

- **app.route**( path )

```jsx
app.route("/user")
    .get((req, res, next) => {
        res.send("GET USER Request");
    })
    .post((req, res, next) => {
        res.send("POST USER Request");
    })
    .all((req, res, next) => {
        res.send("Other Requests");
    });
```

## 3.4 **app.all() Function**

<aside>
💡 The **app.all()** function is used to route all types of HTTP requests. Like if we have POST, GET, PUT, DELETE, etc, requests made to any specific route, let’s say */user*, so instead of defining different APIs like app.post(‘/user’), app.get(‘/user’), etc, we can define single API **app.all(‘/user’)** which will accept all type of HTTP request.

</aside>

- **app.all**( path, callback )
    - **Path:** It is the path for which the middleware function is called.
    - **Callback:** It can be a middleware function or a series/array of functions.

```jsx
app.all('/user', function (req, res, next) {
    console.log('User API Request ')
});
```

## 3.5 **app.get-set() Function**

<aside>
💡 The **app.get()** function returns the value *name* app setting. The **app.set()** function is used to assign the setting name to value.

</aside>

- **app.get**(name)
- **app.set**(name, value)

```jsx
app.set("name", "Son");

app.get("/", (req, res) => {
    res.send(app.get("name"));
});
```

## 3.6 **app.disable() Function**

<aside>
💡 function is used to set the boolean setting name to false. It is basically the shorthand for the app.set(name, false).

</aside>

- **app.disable**(name)

```jsx
app.set("name", "Son");

app.disable("name");

console.log(app.get("name")); // false
```

## 3.7 **app.enable() Function**

<aside>
💡 function is used to set the boolean value i.e. name to true. It is basically the shorthand for the app.set(name, true) or app.set(name, false). So instead we can use **app.enable(name)** function to set boolean values to some system Express.js settings

</aside>

- **app.enable**(name)

```jsx
app.enable("name");

console.log(app.get("name")); // true
```

# 4. **Express Request Methods**

## 4.1 **req.app Property**

<aside>
💡 The **req.app** property holds the reference to the instance of the Express application that is using the middleware.

</aside>

- **req.app**

## 4.2 **req.baseUrl Property**

<aside>
💡 The **req.baseUrl** property is the URL path on which a router instance was mounted. The req.baseUrl property is similar to the mount path property of the app object, except app.mountpath returns the matched path pattern(s).

</aside>

- req.baseUr

```jsx
const user = express.Router();

user.get("/login", function (req, res) {
    console.log(req.baseUrl); // /user
    res.end();
});

app.use("/user", user);
```

## 4.3 **req.body Property**

<aside>
💡 The **req.body** property contains key-value pairs of data submitted in the request body. By default, it is undefined and is populated when you use a middleware called body-parsing such as express.urlencoded() or express.json().

</aside>

- **req.body**

```
app.use(express.json());

app.post("/user", function (req, res) {
    res.send(req.body);
});
```

## 4.4 req.cookies Property

<aside>
💡 The **req.cookies** property is used when the user is using cookie-parser middleware. This property is an object that contains cookies sent by the request.

</aside>

- **req.cookies**

```jsx
const cookieParser = require("cookie-parser");

app.use(cookieParser());

app.get("/", function (req, res) {
    req.cookies.title = "Internship LizAI";
    res.send(req.cookies);
});

// {
//     "title": "Internship LizAI"
// }
```

## 4.5 **req.fresh Property**

<aside>
💡 The **req.fresh** property returns true if the response is still ‘fresh’ in the client’s cache else it will return false.

</aside>

- **req.fresh**

## 4.6 req.method Property

<aside>
💡 The **req.method** property contains a string corresponding to the HTTP method of the request which can be either GET, POST, PUT, DELETE, etc.

</aside>

- **req.method**

```jsx
app.get("/", function (req, res) {
    res.send(req.method); // GET
});
```

## 4.7 **req.route Property**

<aside>
💡 The **req.route** property contains the currently-matched route which is a string.

</aside>

- **req.route**

```jsx
app.get("/", function (req, res) {
    res.send(req.route);
});
// {
//     "path": "/",
//     "stack": [
//         {
//             "name": "<anonymous>",
//             "keys": [],
//             "regexp": {
//                 "fast_star": false,
//                 "fast_slash": false
//             },
//             "method": "get"
//         }
//     ],
//     "methods": {
//         "get": true
//     }
// }
```

## 4.8 **req.params Property**

<aside>
💡 The **req.params** property is an object containing properties mapped to the named route “parameters”. For example, if you have the route /student/:id, then the “id” property is available as req.params.id. This object defaults to {}.

</aside>

- **req.params**

```jsx
app.get("/user/:id/:name", function (req, res) {
    console.log(req.params);
    res.send();
});
// { id: '1', name: 'son' }
```

## 4.9 **req.query Property**

<aside>
💡 The **req.query** property allows you to access the query parameters from the URL of an incoming **HTTP** request. Query parameters are key-value pairs included in the URL after the “?” symbol, and they are separated by “&” symbols.

</aside>

- **req.query**

```jsx
app.get("/users", function (req, res) {
    console.log(req.query);
    res.send();
});
// { name: 'Son', age: '21' }
```

# 5. **Express Response Function**

## 5.1 **res.app Property**

<aside>
💡 The **res.app** property holds a reference to the instance of the Express application that is using the middleware.

</aside>

```jsx
app.get("/", (req, res) => {
    console.log(res.app);
    res.end();
});
```

## 5.2 **res.append() Function**

<aside>
💡 The **res.append()** function appends the specified value to the HTTP response header field and if the header is not already set then it creates the header with the specified value.

</aside>

```jsx
app.get("/", function (req, res) {
    res.append("name", "Son");
    console.log(res.get("name")); // Son
});
```

## 5.3 res.cookie() Function

<aside>
💡 The **res.cookie()** function is used to set the cookie name to value. The value parameter may be a string or object converted to JSON.

</aside>

- **res.cookie**(name, value [, options])
    - The name parameter holds the name of the cookie and the value parameter is the value assigned to the cookie name. The options parameter contains various properties like encode, expires, domain, etc.

```jsx
app.get("/", function (req, res) {
    // key-value
    res.cookie("name", "Son");
});
```

## 5.4 **res.clearCookie() Function**

<aside>
💡 The **res.clearCookie()** function is used to clear the cookie specified by name. This function is called for clearing the cookies which as already been set. For example, if a *user* cookie is set, then it can be cleared using this function.

</aside>

- **res.clearCookie**(name, [ options ])
    - **Name:** It is the name of the cookie which is to be cleared. Like in the following example, we have cleared the *title* cookie.
    - **Options:** It is an object that can have various properties like domain, encode, path, secure, etc.

```jsx
app.get("/", function (req, res) {
    // Setting cookie (key-value)
    res.cookie("name", "Son");
    // Clearing the cookie
    res.clearCookie("name");

    console.log("Cookie is cleared");
});
```

## 5.5 **res.send() Function**

<aside>
💡 The **res.send()** function sends the HTTP response. The body parameter can be a String or a Buffer object or an object or an Array.

</aside>

- **res.send**( [body] )

```jsx
app.get('/', function (req, res) {
    res.send({ name: 'Son' });
});
```

## 5.6 **res.end() Function**

<aside>
💡 The **res.end()** function concludes the response process and is derived from the HTTP.ServerResponse’s **response.end()** method in the Node core. It is employed to promptly conclude the response without including any data.

</aside>

- **res.end**([data] [, encoding])

```jsx
app.get('/', function (req, res) {
    res.end();
});
```

## 5.7 **res.redirect() Function**

<aside>
💡 The **res.redirect()** function redirects to the URL derived from the specified path, with specified status, an integer (positive) which corresponds to an HTTP status code. The default status is “302 Found”.

</aside>

- **res.redirect**([status] path)

```jsx
app.get("/", function (req, res) {
    res.redirect("/home");
});

app.get("/home", function (req, res) {
    res.send("Redirected to Home Page");
});

// Redirected to Home Page
```

## 5.8 **res.status() Function**

<aside>
💡 The **res.status()** function sets the HTTP status for the response. It is a chainable alias of Node’s response.statusCode.

</aside>

- **res.status**( code )

```jsx
app.get("/home", function (req, res) {
    res.status(200).send("Home Page");
});
```

## 5.9 res.set() Function

<aside>
💡 The **res.set()** function is used to set the response HTTP header field to value. To set multiple fields at once, pass an object as the parameter.

</aside>

- **res.set**(field [, value])

```jsx
app.get("/", function (req, res) {
    // Setting the response
    res.set({ name: "Son" });

    // "application/json"
    console.log(res.get("name")); // Son
    res.end();
});
```

# 6. **Express Router Function**

## 6.1 **router.use() Function**

<aside>
💡 The **router.use()** function uses the specified middleware function or functions. It basically mounts middleware for the routes which are being served by the specific router.

</aside>

- **router.use**( path, function )

```jsx
router.use(function (req, res, next) {
    console.log("Middleware Here");
    next();
});
router.get("/", (req, res) => {
    console.log("Welcome");
    res.end();
});
app.use("/", router);
// Middleware Here
// Welcome
```

## 6.2 **router.METHOD() Function**

<aside>
💡 The **router.METHOD()** method provides the routing functionality in Express, where METHOD is one of the HTTP methods, such as GET, PUT, POST, and so on, in lowercase.

</aside>

- **router.METHOD**(path, [callback, ...] callback)

```jsx
router.get("/", (req, res) => {
    console.log("Welcome");
    res.end();
});
```

## 6.3 **router.route() Function**

<aside>
💡 The **router.route()** function returns an instance of a single route that you can then use to handle HTTP verbs with optional middleware. You can also use the router.route() function to avoid duplicate route naming as well as typing errors.

</aside>

- **router.route**( path )

```jsx
router.route("/user")
		.get((req, res, next) => {
		    console.log("Welcome");
		    res.end();
		});
```

## 6.4 **router.all() Function**

<aside>
💡 The **router.all()** function is just like the router.METHOD() methods, except that it matches all HTTP methods (verbs). It is very helpful for mapping *global* logic for arbitrary matches or specific path prefixes.

</aside>

- **router.all**(path, [callback, ...] callback)

```jsx
router.all("/user", function (req, res) {
    console.log("User API Request");
    res.end();
});
```

# 7. Express Middleware

## 7.1 **Working of the middleware functions**

![https://media.geeksforgeeks.org/wp-content/uploads/20211007175759/MiddlewareChaining.png](https://media.geeksforgeeks.org/wp-content/uploads/20211007175759/MiddlewareChaining.png)

<aside>
💡 ***Middleware*** functions are functions that have access to the [request object](https://expressjs.com/en/4x/api.html#req) (**req**), the [response object](https://expressjs.com/en/4x/api.html#res) (**res**), and the **next** function in the application’s request-response cycle. The **next** function is a function in the Express router which, when invoked, executes the middleware succeeding the current middleware.

</aside>

## 7.2 **How Middleware Works**

- Middleware functions are executed sequentially in the order they are defined.
- Each middleware function must call **next()** to pass control to the next middleware function. If **next()** is not called, the request will be left hanging.
- Middleware can end the request-response cycle by sending a response using **res.send()**, **res.json()**, **res.end()**, etc., and not calling **next()**.

## 7.3 **Types of Middleware in Express.js**

- **Application-level middleware**:

<aside>
💡 Defined at the app level and bound to an instance of the **express** object.

</aside>

```jsx
app.use((req, res, next) => {
    console.log("Middleware here");
    next();
});
```

- **Router-level middleware**

<aside>
💡 Similar to application-level middleware but applied to an instance of **express.Router()**.

</aside>

```jsx
router.use((req, res, next) => {
    console.log("Middleware here");
    next();
});
app.use("/", router);
```

- **Error-handling middleware**

<aside>
💡 Defined with four arguments: (err, req, res, next). Used to catch and handle errors.

</aside>

```jsx
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
```

- **Built-in middleware**

<aside>
💡 Provided by Express.js to handle common tasks

</aside>

```jsx
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(express.static('public')); // Serve static files
```

- **Third-party middleware**

<aside>
💡 Middleware created by the community and available through npm.

</aside>

```jsx
const morgan = require('morgan');
app.use(morgan("dev"));
```