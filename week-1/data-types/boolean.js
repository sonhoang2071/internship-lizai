//Boolean : là kiểu dữ liệu return về true hoặc false
let done = true;
console.log(done); // true
console.log(typeof(done)); // boolean - Vì là primitive type nên typeof là boolean
console.log(1 == 2); // false - Các biểu thức so sánh đều trả về giá trị boolean

// khái niệm truthy & falsy value

// Falsy value :
// false
// 0, -0, 0n
// "", ''
// null, undefined, NaN

//Truthy value : các giá trị còn lại

if([]){
    console.log("Truthy");
}
if(null) {
    console.log("Falsy");
}
if(NaN) {
    console.log("Falsy");
}
if(Infinity) {
    console.log("Truthy");
}