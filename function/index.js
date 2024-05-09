// Có ba cách khai báo một hàm
// Declare Function
// function hello() {
//     console.log("hello");
// }
// hello(); // hello

//Expression Function
// let hello = function () {
//     console.log("hello");
// };
// hello(); // hello

//Arrow Function
// let hello = () => {
//     console.log("hello");
// };
// hello(); // hello

// let a = 1;
// function plus(num) {
//     ++num;
// }
// plus(a);
// console.log(a); // 1

// let person = { name: "Son" };
// changeName = (obj) => {
//     obj.name = "Name";
// };
// changeName(person);
// console.log(person); // { name: 'Name' }

//hoisting

console.log(square(3)); // 9

function square(n) {
  return n * n;
}
