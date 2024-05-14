// Undefined : Đại diện cho một giá trị không xác định,
// Khi một biến được khai báo nhưng không khởi tạo giá trị hoặc không gán giá trị trị thì mặc định biến đó có giá trị là undefined
let d ;
console.log(d); // undefined
console.log(typeof(d)); // undefined - Vì thuộc primitive type nên typeof của undefined là undefined
function sayHi() {
    console.log("Hi");
}
let hi = sayHi();
console.log(hi); // undefined - Một hàm không trả về giá trị sẽ return về undefined

let person = {name : "Son"};
console.log(person.age); // undefined - Truy cập vào một thuộc tính không tồn tại của một object

// Sự khác nhau của null và undefined
// So sánh null và undefined
console.log(null == undefined); //true - bởi vì cả hai cùng giá trị
console.log(null === undefined); // fasle - bởi vì cả hai khác type với nhau 

function myAge(age = 0) {
    console.log(age);
}
myAge(null); // null
myAge(undefined); // 0
myAge(); // 0
// Null là vẫn có giá trị nhưng giá trị của nó là null, còn đối với undefined là không xác định.