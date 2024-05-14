// Trong javascript Array không phải là một kiểu dữ liệu nguyên thuỷ mà là một kiểu dữ liệu Object
// Array trong javascript có thể thay đổi kích thước chứ không cố định, có thể chứa nhiều kiểu dữ liệu

// let person = [
//     "Son",
//     18,
//     { pet: "Dog" },
//     function sayHello()  {
//         console.log("Hello");
//     },
// ];
// console.log(person[0]); // Son
// console.log(person[1]); // 18
// console.log(person["2"]); // { pet: 'Dog' }
// let a = person["03"];
// // a(); // TypeError
// let b = person["3"];
// b(); // Hello
// // person.0; // Type Error
// console.log(person.length); // 4
// // Vì array là một kiểu dữ liệu object nên có thể sử dụng các hàm static Object
// console.log(Object.keys(person)); // [ '0', '1', '2', '3' ]
// console.log(Object.values(person)); // [ 'Son', 18, { pet: 'Dog' }, [Function: sayHello] ]

// // có thể sử dụng for in hoặc for of

// for(let key in person) {
//     console.log(key);
// }
// // 0
// // 1
// // 2
// // 3
// for(let value of person) {
//     console.log(value);
// }
// // Son
// // 18
// // { pet: 'Dog' }
// // [Function: sayHello]

// //Methods

// //at(index) => phương thức trả về phần tử thứ index trong mảng, index có thể là số nguyên âm hoặc nguyên dương, nếu nguyên âm sẽ tính từ cuối mảng
// console.log(person.at(1)); // 18
// console.log(person.at(-2)); // { pet: 'Dog' }
// console.log(person.at("0")); // Son
// console.log(person.at("")); // Son
// console.log(person.at(true)); // 18
// console.log(person.at(NaN)); // Son

// //concat( || value, ...) => phương thức dùng để merge một hoặc nhiều mảng lại với nhau, không làm thay đổi mảng cũ và return về mảng mới sau khi merge
// let student1 =  ["Son", 18];
// let student2 = [{school: "Huflit"}, false];
// let student3 = student1.concat();
// console.log(student3); // [ 'Son', 18 ]
// let student4 = student1.concat(student2);
// console.log(student4); // [ 'Son', 18, { school: 'Huflit' }, false ]

// //entries() => hàm trả về một array iterator chứa các cặp key/value tương ứng với index/value của array cũ
// let fruits = ["Apple", "Pineapple", "Guava"];

// for (let [index, element] of fruits.entries()) {
//   console.log(index, element);
// }
// // 0 Apple
// // 1 Pineapple
// // 2 Guava

// // every(callback) => hàm kiểm tra các phần tử trong mảng thoả mãn callback function, nếu tất cả thoả mãn thì trả về true ngược lại trả lại false
// // callback funtion sẽ nhận vào 3 tham số:
// // - phần tử hiện tại
// // - vị trí của phần tử hiện tại
// // - array
// let prices = [10, 5, 8, 21];
// let check1 = prices.every(e => e > 10);
// let check2 = prices.every(e => e < 30);
// console.log(check1); // false
// console.log(check2); // true
// // console.log(prices.every()); // TypeError: undefined is not a function
// console.log(prices.every(() => {})); // false

// //fill(value, start, end) => Hàm sẽ thay đổi các phần tử của mảng từ vị trí start đến end bằng giá trị value
// // start:
// // Nếu -array.length <= start < 0 , start = start + array.length
// // Nếu start < -array.length, hoặc không đưa vào thì start = 0;
// // Nếu start > array.length , không phần tử nào được fill
// //end:
// // Tương tự như start
// // Nếu end < -array.length, end = 0
// // Nếu end >= array.length hoặc end không được đưa vào, end = array.length,
// console.log([1, 2, 3, 4, 5].fill()); // [ undefined, undefined, undefined, undefined, undefined ]
// console.log([1, 2, 3, 4, 5].fill("")); // [ '', '', '', '', '' ]
// console.log([1, 2, 3, 4, 5].fill(4)); // [ 4, 4, 4, 4, 4 ]
// console.log([1, 2, 3, 4, 5].fill(4, 1, 1)); // [ 1, 2, 3, 4, 5 ]
// console.log([1, 2, 3, 4, 5].fill(4, 1, 2)); // [ 1, 4, 3, 4, 5 ]
// console.log([1, 2, 3, 4, 5].fill(4, -3, -2)); // [ 1, 2, 4, 4, 5 ]

// filter(callback) => phương thức trả về mảng các phần tử thoả mãn callback function
// tương tự callback cũng nhận vào 3 tham số :
// Phần tử hiện tại
// Vị trị hiện tại của phần tử
// Mảng
// let fruits = ["Apple", "Pineapple", "Guava", "Strawberry"];
// console.log(fruits.filter(e => e.length > 7)); // [ 'Pineapple', 'Strawberry' ]
// // let newFruits = fruits.filter();// TypeError: undefined is not a function
// console.log(fruits.filter(() => {})); //  []
// let newFruits = fruits.filter(() => true);
// console.log(newFruits); // [ 'Apple', 'Pineapple', 'Guava', 'Strawberry' ]
// newFruits.push("Xin chao");
// console.log(fruits); // [ 'Apple', 'Pineapple', 'Guava', 'Strawberry' ]
// console.log(newFruits); // [ 'Apple', 'Pineapple', 'Guava', 'Strawberry', 'Xin chao' ]

// let fruits2 = [{name : "Apple"},{name:  "Pineapple"}];
// let fruits3 = fruits2.filter(() => true);
// console.log(fruits2); // [ { name: 'Apple' }, { name: 'Pineapple' } ]
// console.log(fruits3); // [ { name: 'Apple' }, { name: 'Pineapple' } ]
// fruits3[0].name = "Banana";
// console.log(fruits2); // [ { name: 'Banana' }, { name: 'Pineapple' } ]
// console.log(fruits3); // [ { name: 'Banana' }, { name: 'Pineapple' } ]

// find(callback) => phương thức trả về phần tử đầu tiên thoả callback function, nếu không tìm được phần tử nào thì return về undefined

// let ages = [10, 14, 8, 19, 20];
// console.log(ages.find((e) => e > 18)); // 19
// console.log(ages.find((e) => e < 6)); // undefined

// let fruits = [
//     { name: "apples", quantity: 2 },
//     { name: "bananas", quantity: 0 },
//     { name: "cherries", quantity: 5 },
// ];

// let result = fruits.find(({ name }) => name === "cherries");

// console.log(result); // { name: 'cherries', quantity: 5 }

// findIndex(callback) => tương tự như find() nhưng sẽ return về vị trí của phần tử, nếu không tìm thấy thì return về -1

// let ages = [10, 14, 8, 19, 20];
// console.log(ages.findIndex((e) => e > 18)); // 3
// console.log(ages.findIndex((e) => e < 6)); // -1

// let fruits = [
//     { name: "apples", quantity: 2 },
//     { name: "bananas", quantity: 0 },
//     { name: "cherries", quantity: 5 },
// ];

// let result = fruits.findIndex(({ name }) => name === "cherries");

// console.log(result); // 2

// findLast(callback) => tương tự như find nhưng sẽ return về phần tử cuối cùng, nếu không tìm thấy thì return về undefined
// let ages = [10, 14, 8, 19, 20];
// console.log(ages.findLast((e) => e > 18)); // 20
// console.log(ages.findLast((e) => e < 6)); // undefined

// findLastIndex(callback) => tương tự như findIndex nhưng sẽ return về index của phần tử cuối cùng, nếu không tìm thấy thì return về -1

// let ages = [10, 14, 8, 19, 20];
// console.log(ages.findLastIndex((e) => e > 18)); // 4
// console.log(ages.findLastIndex((e) => e < 6)); // -1

//flat(depth) => phương thức trả về sau khi đã làm phẳng mảng cũ, depth là tham số biểu diễn cho cấp độ muốn làm phẳng, nếu muốn làm phẳng tới tận cùng thì truyền Infinity
// let arr1 = [1, 2, [3, 4], [5]];
// console.log(arr1.flat()); // [ 1, 2, 3, 4, 5 ]

// let arr2 = [1, 2, [3, [4, 5]], [[6, 7, [8]]]];
// console.log(arr2.flat(1)); // [ 1, 2, 3, [ 4, 5 ], [ 6, 7, [ 8 ] ] ]
// console.log(arr2.flat(Infinity)); // [ 1, 2, 3, 4, 5, 6, 7, 8 ]

//forEach(callback) => phương thức dùng để duyệt qua các phần tử của mảng

// let pets = [{name : "Dog"}, {name: "Fish"}, {name: "Chicken"}];
// pets.forEach(e => console.log(e.name));
// // Dog
// // Fish
// // Chicken

// includes(element, index) => phương thức kiểm tra sự tồn tại của phần tử trong mảng từ vị trí index
// let pets = [ "Dog" , "Fish", "Chicken"];
// console.log(pets.includes("Dog")); // true
// console.log(pets.includes("Dog", 1)); // false
// console.log(pets.includes("Dog", 0)); // true
// console.log(pets.includes(undefined)); // false
// let pets2 = [ "Dog", , "Fish", "Chicken"];
// console.log(pets2.includes(undefined)); // true

// indexOf(element, index) => phương thức trả về vị trí đầu tiên nếu phần tử tồn tại trong mảng, ngược lại return -1
// let ages = [10, 12, 21, 10, 9, 12];
// console.log(ages.indexOf(12)); // 1
// console.log(ages.indexOf(30)); // -1
// console.log(ages.indexOf(12, 3)); // 5

//jojn(seperator) => phương thức trả về một chuỗi sau khi nối chuỗi các phần tử bằng seperator
// let colors = ["Red", "Green", "Blue"];
// console.log(colors.join()); // Red,Green,Blue
// console.log(colors.join("")); // RedGreenBlue
// console.log(colors.join(" - ")); // Red - Green - Blue

// let matrix = [
//     [1, 2, 3],
//     [4, 5, 6],
//     [7, 8, 9],
// ];
// console.log(matrix.join(" ; ")); // 1,2,3 ; 4,5,6 ; 7,8,9

// lastIndexOf(element, index) => tương tự như indexOf() nhưng trả về vị trí cuối cùng
// let ages = [10, 12, 21, 10, 9, 12];
// console.log(ages.lastIndexOf(12)); // 5
// console.log(ages.lastIndexOf(30)); // -1
// console.log(ages.lastIndexOf(12, 3)); // 5

// pop() : xoá phần tử cuối cùng của mảng, return về phần tử đó
// let colors = ["Red", "Green", "Blue"];
// console.log(colors.pop()); // Blue
// console.log(colors); // [ 'Red', 'Green' ]
// console.log(colors.pop()); // Green
// console.log(colors.pop()); // Red
// console.log(colors); // []
// console.log(colors.pop()); // undefiend
// console.log(colors); // []

// push() : thêm phần tử vào cuối mảng, return về length của mảng sau khi thêm
// let colors = ["Red", "Green", "Blue"];
// console.log(colors.push("Yellow")); // 4
// console.log(colors); // [ 'Red', 'Green', 'Blue', 'Yellow' ]
// console.log(colors.push("Purple", "White", "Organe")); // 7
// console.log(colors); // [ 'Red',    'Green', 'Blue',   'Yellow', 'Purple', 'White', 'Organe' ]

// reverse() : phương thức dùng để đảo ngược các phần tử của mảng, return về mảng mới sau khi đảo, tác động cả mảng gốc
// let arr = [1, 2, 3];
// console.log(arr.reverse()); // [ 3, 2, 1 ]
// console.log(arr); // [ 3, 2, 1 ]
// let name = ["A", "B", "C"];
// let reverseName = name.reverse();
// name[0] = "Hello";
// console.log(name); // [ 'Hello', 'B', 'A' ]
// console.log(reverseName); // [ 'Hello', 'B', 'A' ]

// shift() : ngược lại với pop(), shift() xoá phần tử ở đầu mảng
// let colors = ["Red", "Green", "Blue"];
// console.log(colors.shift()); // Red
// console.log(colors); // [ 'Green', 'Blue' ]
// console.log(colors.shift()); // Green
// console.log(colors.shift()); // Blue
// console.log(colors); // []
// console.log(colors.shift()); // undefiend
// console.log(colors); // []

// unshift(element) : ngược lại với push, unshift thêm phần tử vào đầu mảng
// let colors = ["Red", "Green", "Blue"];
// console.log(colors.unshift("Yellow")); // 4
// console.log(colors); // [ 'Yellow', 'Red', 'Green', 'Blue' ]
// console.log(colors.unshift("Purple", "White", "Organe")); // 7
// console.log(colors); // [ 'Purple', 'White', 'Organe', 'Yellow', 'Red',    'Green', 'Blue' ]

// // some(callback) : phương thức dùng để kiểm tra phần tử trong mãng thoả mãn callback, nếu có ít nhất một phàn tử thoả mảng return true, ngược lại return false
// let ages = [5, 18, 10, 20, 16];
// console.log(ages.some((e) => e > 16)); // true
// console.log(ages.some((e) => e < 3)); // false
// console.log(ages.some(() => {})); // false

// //slice(start, end) : phương thức dùng để cắt một đoạn array từ vị trí start - end
// const animals = ["ant", "bison", "camel", "duck", "elephant"];
// console.log(animals.slice(1, 2)); // [ 'bison' ]
// console.log(animals.slice(1, 1)); // [ ]
// console.log(animals.slice(1, -1)); // // [ 'bison', 'camel', 'duck' ]
// console.log(animals.slice(3)); // [ 'duck', 'elephant' ]
// console.log(animals.slice(6)); // []
// console.log(animals.slice(2, 1)); // []

// // splice(start, delete, item1, ...) : phương thức dùng để thay thế các phần tử trên đoạn, bằng các số các phần tử trên một đoạn rồi thay thế bằng các item truyền vào
// let months = [1, 2, 3, 4, 5, 6];
// months.splice(1, 0, 10);
// console.log(months); // [ 1, 10, 2, 3, 4,  5, 6 ]
// months.splice(1, 3, 7);
// console.log(months); // [ 1, 7, 4, 5, 6 ]
// months.splice(2, 1, 9, 10, 11);
// console.log(months); // [ 1, 7, 9, 10, 11, 5, 6 ]

// // map(callback) : phương thức trả về một mảng các phần tử là kết quả của callback function với phần tử đó
// let arr = [1, 2, 3, 4, 5];
// let doubleArr = arr.map((e) => e * 2);
// console.log(doubleArr); // [ 2, 4, 6, 8, 10 ]
// let price = [5, 15, 25];
// let revenue = 0;
// let newPrice = price.map((e) => {
//     revenue += e;
//     return e*1.2;
// });
// console.log(newPrice); // [ 6, 18, 30 ]
// console.log(revenue); // 45

// reduce(callback, initialValue) : phương thức tác dụng lên các phần tử của mảng thôgn qua callback, kết quả là giá trị tích luỹ qua mỗi lần thực hiện callbak trên phần tử của mảng, reduce() không làm thay đổi phần tử gốc
// callback(accumulator, currentValue, currentIndex, thisArray)

let arr = [100, 50, 10];
let res = arr.reduce((init, current, index) => init - current);
console.log(res); // 40

let sales = [
    { name: "Product 1", amount: 10 },
    { name: "Product 2", amount: 45 },
    { name: "Product 3", amount: 2 },
];
let exist = 12;
let total = sales.reduce((init, value, index) => {
    return init + value.amount;
}, exist);
console.log(total); // 69
