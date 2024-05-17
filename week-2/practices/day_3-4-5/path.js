const path = require("path");

// // sep property
// console.log(path.sep); // /

// // delimiter property
// console.log(path.delimiter); // :

// // basename()
// console.log(path.basename(__filename)); // path.js

// //using extension param
// console.log(path.basename(__filename, ".js"));

// // dirname()

// let path1 = path.dirname("website/index.html");
// console.log(path1); // website

// // Only file name
// // returns a period (.)
// let path2 = path.dirname("readme.md");
// console.log(path2); // "."

// // Path with file not specified
// let path3 = path.dirname("website/post/comments");
// console.log(path3); // website/post

// let path4 = path.dirname(1);
// console.log(path4); // TypeError [ERR_INVALID_ARG_TYPE]: The "path" argument must be of type string.

// console.log(path.dirname(__dirname));
// // /home/sonhoang2071/workspace/internship/nodejs/basic-nodejs/week-2/practices
// console.log(path.dirname(__filename));
// // /home/sonhoang2071/workspace/internship/nodejs/basic-nodejs/week-2/practices/day_3-4-5

// extname()

// console.log(path.extname('index.html')); // .html
// console.log(path.extname('app.js')); // .js
// console.log(path.extname('node.js.md')); // .md

// format()
// let pathToFile = path.format({
//     dir: 'public_html/home',
//     name : "main",
//     ext: ".js"
// });

// console.log(pathToFile); // public_html/home/main.js

// isAbsolute()
// let result = path.isAbsolute('/node/js/');
// console.log(result); // true

// result = path.isAbsolute('/node/..');
// console.log(result); // true

// result = path.isAbsolute('node/');
// console.log(result); // false

// result = path.isAbsolute('.');
// console.log(result); // false

// // join()
// let pathToDir = path.join('/home', 'public', 'js', 'app.js');
// console.log(pathToDir); // /home/public/js/app.js

// normalize()
// let path1 = path.normalize("/users/admin/.");
// console.log(path1); // /users/admin

// let path2 = path.normalize(".");
// console.log(path2); // "."

// let path3 = path.normalize("/users/admin/../download");
// console.log(path3); // /users/download

// let path4 = path.normalize("/users///admin///download");
// console.log(path4); // /users/admin/download

// parse()
// let pathObj = path.parse(__filename);
// console.log(pathObj);
// // {
// //     root: '/',
// //     dir: '/home/sonhoang2071/workspace/internship/nodejs/basic-nodejs/week-2/practices/day_3-4-5',
// //     base: 'path.js',
// //     ext: '.js',
// //     name: 'path'
// // }

// // relative()
// let path1 = path.relative("nodejs/website", "nodejs/main.js");
// console.log(path1); // ../main.js

// let path2 = path.relative("home/users", "users/son/nodejs");
// console.log(path2); // ../../users/son/nodejs

// // When both the paths are same
// // It returns blank string
// let path3 = path.relative("home/users", "home/users");
// console.log(path3); // ""

// resolve()
// let path1 = path.resolve("home/users", "readme.md");
// console.log(path1);
// // /home/sonhoang2071/workspace/internship/nodejs/basic-nodejs/week-2/practices/day_3-4-5/home/users/readme.md

// // Resolving 3 path-segments 
// // with the current directory
// let path2 = path.resolve("home", "users", "readme.md");
// console.log(path2);
// // /home/sonhoang2071/workspace/internship/nodejs/basic-nodejs/week-2/practices/day_3-4-5/home/users/readme.md

// // Treating of the first segment
// // as root, ignoring the current directory
// let path3 = path.resolve("/home/users", "readme.md");
// console.log(path3);
// // /home/users/readme.md

