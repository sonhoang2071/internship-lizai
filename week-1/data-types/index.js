// Javascript là dynamic language với dynamic type.
// Các biến trong javascript không cần phải khai báo kiểu dữ liệu,
// Tất cả các biến đều có thể được gán hoặc gán lại giá trị của tất cả kiểu dữ liệu.
// Để khai báo biến trong javascript có thể sử dụng các từ khoá:
// + const
// + let
// + var
// Sự khác biệt giữa const, let, var:
// const: dùng để khai báo 1 hằng số, giá trị của biến không thay đổi trong suốt chương trình
const pi = 3.14;
// pi = 1; // TypeError: Assignment to constant variable.
// const pi = 2.13; // Cannot redeclare block-scoped variable

// let: dùng để khai báo một biến, biến chỉ truy cập được trong phạm vi bao quanh nó
let a = 9;
// console.log(a); // 9
// let a = 10; // Cannot redeclare block-scoped variable 'a'
// {
//     let b = "Hi";
// }
// console.log(b); // ReferenceError: b is not defined

// var : dùng để khai báo một biến có phạm vi toàn cục khi khai báo ngoài hàm nếu khai báo trong hàm (hoisting)
// {
//     var x = 1;
// }
// console.log(x); // 1

// age = 18;
// console.log(age); // 18
// var age;

var point = 7;
var point = 8;
console.log(point); // 8

// Với var
var age = 10;
console.log(age); // 10
if (true) {
    var age = 20;
    console.log(age); // 20
}
console.log(age); // 20

// Với let
let height = 10;
console.log(height); // 10
if (true) {
    let height = 20;
    console.log(height); // 20
}
console.log(height); // 10

// Data types trong javascript phân làm 2 loại : Primitive Types(nguyên thuỷ) và Object
// Primitive Type:
// + Null
// + Undefined
// + Boolean
// + Number 
// + String
// + BigInt
// + Symbol

// Object:
// + Object
// + Date
// + Array

// Primitive type là kiểu dữ liệu chỉ thuần chứa dữ liệu
// let pi = 3.14;
// let name = "Son";
// let check = true;

// Ngoài ra biến đối tượng primitive thành một wrapper. 
// Wrapper là kiểu primitive, được gói thành một object và sử dụng như object
// let pi = new Number(3.14);
// console.log(pi); // [Number: 3.14]
// console.log(typeof(pi)); // object
// console.log(pi.toString()); // 3.14 (String)

// Object type là kiểu dữ liệu đối tượng bao gồm: Object, Date, Array
// Function trong javascript cũng được coi là một Object
