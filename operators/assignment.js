// = : gán giá trị cho một biến
// let a = 5; // 5
// const PI = 3.14; // 3,14
// a+=b : a = a + b;
let a = 2;
let b = 3;
a+=b
console.log(a); // 5
let str1 = "Hi";
let str2 = "Ha";
console.log(str1+=str2); // HiHa
let te = 23;
te+=undefined;
console.log(te); // NaN

// với phép -= sẽ có sự khác biệt với += của kiểu dữ liệu string
console.log(str1-=str2); // NaN

// /=
// a /= b : a = a / b;
let num1 = 9;
let num2 = 2;
num1/=num2;
console.log(num1); // 4.5

// tương tự với %=
num1%=num2;
console.log(num1); // 0.5


