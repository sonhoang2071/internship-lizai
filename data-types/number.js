// Number: Trong javascript kiểu dữ liệu số chỉ có một loại là Number đại diện cho toàn bộ các loại số. 

console.log(Number.MAX_VALUE); // 1.7976931348623157e+308
console.log(Number.MIN_VALUE); // 5e-324
console.log(Infinity); // Infinity
console.log(-Infinity); // -Infinity
console.log(Number(undefined)); // NaN
console.log(Number(null)); // 0
console.log(Number(false)); // 0
console.log(Number(true)); // 1
console.log(Number("S")); // NaN
console.log(Number([])); // 0
console.log(Number({})); // NaN
console.log(2 + NaN); // NaN
console.log(3.14 + NaN); // NaN