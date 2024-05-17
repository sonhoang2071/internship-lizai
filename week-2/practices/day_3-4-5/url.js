const url = require("url");

// using new URL object
// const newUrl = new URL("https://www.lizai.co/");
// console.log(newUrl);
// // URL {
// //     href: 'https://www.lizai.co/',
// //     origin: 'https://www.lizai.co',
// //     protocol: 'https:',
// //     username: '',
// //     password: '',
// //     host: 'www.lizai.co',
// //     hostname: 'www.lizai.co',
// //     port: '',
// //     pathname: '/',
// //     search: '',
// //     searchParams: URLSearchParams {},
// //     hash: ''
// // }
// // using parse()
// const myURL = url.parse("https://www.lizai.co/");
// console.log(myURL);
// // Url {
// //     protocol: 'https:',
// //     slashes: true,
// //     auth: null,
// //     host: 'www.lizai.co',
// //     port: null,
// //     hostname: 'www.lizai.co',
// //     hash: null,
// //     search: null,
// //     query: null,
// //     pathname: '/',
// //     path: '/',
// //     href: 'https://www.lizai.co/'
// // }
// // check
// console.log(newUrl == myURL);

const newURL = new URL("https://www.lizai.co:123/?file=newFile&#pass");
const objUrl = url.parse("https://www.lizai.co:123/?file=newFile&#pass", true);

// href

console.log(newURL.href); // https://www.lizai.co/#file?=newFile
console.log(objUrl.href); // https://www.lizai.co/#file?=newFile

// hash

console.log(newURL.hash); // #file?=newFile
console.log(objUrl.hash); // #file?=newFile

// change hash
newURL.hash = "hash";
objUrl.hash = "hash";

// after change
console.log(newURL.href); // https://www.lizai.co/#hash
console.log(objUrl.href); // https://www.lizai.co/#file?=newFile

// host

console.log(newURL.host); // www.lizai.co:123
console.log(objUrl.host); // www.lizai.co:123

// search
console.log(newURL.search); // ?file=newFile
console.log(objUrl.search); // ?file=newFile

// query & searchParam

console.log(newURL.searchParams); // URLSearchParams { 'file' => 'newFile' }
console.log(objUrl.query); // [Object: null prototype] { file: 'newFile' }

// protocol
console.log(newURL.protocol); // https
console.log(objUrl.protocol); // https

// port
console.log(newURL.port); // 123
console.log(objUrl.port); // 123

// pathname
console.log(newURL.pathname); // "/"
console.log(objUrl.pathname); // "/"

// search Param

// forEach()
newURL.searchParams.forEach((value ,key) => console.log(key + " : " + value));
// file : newFile

// keys()

let keys = newURL.searchParams.keys();
console.log(keys); // URLSearchParams Iterator { 'file' }
for (const i of keys) {
    console.log(i); 
}
// file

//values()
let values = newURL.searchParams.values();
console.log(values); // URLSearchParams Iterator { 'newFile' }
for (const i of values) {
    console.log(i); 
}
// newFile

// get()
console.log(newURL.searchParams.get("file")); // newFile


// set()
newURL.searchParams.set("file","oldFile");
newURL.searchParams.set("age",10);
console.log(newURL.searchParams.toString()); // file=oldFile&age=10

// append
newURL.searchParams.append("file","salary");
console.log(newURL.searchParams.toString()); // file=oldFile&age=10&file=salary

// entries
console.log(newURL.searchParams.entries()); // URLSearchParams Iterator { [ 'file', 'oldFile' ], [ 'age', '10' ], [ 'file', 'salary' ] }

// getAll
console.log(newURL.searchParams.getAll("file")); // [ 'oldFile', 'salary' ]

// delete
newURL.searchParams.delete("age");
console.log(newURL.searchParams.toString()); // file=oldFile&file=salary



