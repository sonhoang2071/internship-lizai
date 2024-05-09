// Object lưu trữ dữ liệu theo dạng key : value
// value của key có thể là nhiều loại dữ liệu khác nhau, có thể là một function
// Object được khởi tạo bằng hàm khởi tạo Object() hoặc cú pháp {}

// Examples:
// let person1 = {};
// let person2 = new Object();
// console.log(person1); // {}
// console.log(person2); // {}

// let person = {
//     name: "Son",
//     age: 21,
//     married: false,
//     introduce: function () {
//         console.log(`My name is ${this.name}`);
//     },
// };

// console.log(person.name);
// console.log(person.age);
// console.log(person.married);
// person.introduce();

// Object prototype

// let person = {
//     name: "Son",
// };
// console.log(person); // { name: 'Son' }
// person.school = "Huflit";
// console.log(person); // { name: 'Son', school: 'Huflit' }
// console.log(person.school); // Huflit
// person.__proto__.l = "l";
// console.log(person.__proto__);

// Static methods
//Object.assign(target, source1, ...) => Copy tất cả thuộc tính riêng của các object source sang object target , sau đó trả về object target sau khi coppy

// let person1 = {name : "Son", age : 21};
// let person2 = {name : "Truong", age : 18, school: "IUH"};
// let person3 = {name: "Trinh", married: true};
// let person4 = Object.assign(person1, person2, person3);
// console.log(person4); //  name: 'Trinh', age: 18, school: 'IUH', married: true }
// let person5 = Object.assign({}, person2);
// console.log(person5); // { name: 'Truong', age: 18, school: 'IUH' }

//Clone object

// let pet1 = { name: "Dog", run: { speed: 180 } };
// let pet2 = Object.assign({}, pet1);
// console.log(pet1); // { name: 'Dog', run: { speed: 180 } }
// console.log(pet2); // { name: 'Dog', run: { speed: 180 } }

// // Một số hạn chế của việc sử dụng assign() để clone object
// pet1.name = "Fish";
// console.log(pet1); // { name: 'Fish', run: { speed: 180 } }
// console.log(pet2); // { name: 'Dog', run: { speed: 180 } }
// // Vẫn hoạt động bình thường, nhưng ta hãy thử thay đổi speed của run
// pet1.run.speed = 10;
// console.log(pet1); // { name: 'Fish', run: { speed: 10 } }
// console.log(pet2); // { name: 'Dog', run: { speed: 10 } }

// // Để deepclone ta nên sử dụng structuredClone()
// let pet3 = structuredClone(pet1);
// console.log(pet1); // { name: 'Fish', run: { speed: 10 } }
// console.log(pet3); // { name: 'Fish', run: { speed: 10 } }
// pet1.run.speed = 22;
// console.log(pet1); // { name: 'Fish', run: { speed: 22 } }
// console.log(pet3); // { name: 'Fish', run: { speed: 10 } }

// //Object.create() => tạo mới một đối tượng từ nguyên mẫu

// console.log(Object.create({})); // {}
// console.log(Object.create(null)); // [Object: null prototype] {}

// Object.entries(obj) => trả về một array chứa các array con là các key - value của obj
// let pet = { name: "Dog", height: 30, weight: 15 };
// console.log(Object.entries(pet)); // [ [ 'name', 'Dog' ], [ 'height', 30 ], [ 'weight', 15 ] ]
// // có thể sử dụng for of để loop qua
// for (let value of Object.entries(pet)) {
//     console.log(value);
// }
// // [ 'name', 'Dog' ]
// // [ 'height', 30 ]
// // [ 'weight', 15 ]
// console.log(Object.entries(100));  // []

// console.log(Object.entries(null));  // TypeError: Cannot convert undefined or null to object

// console.log(Object.entries(undefined)); // TypeError: Cannot convert undefined or null to object

// console.log(Object.entries("")); // []

// Object.freeze(obj) => return về một object giống với obj cũ và obj cũ sẽ bị đóng băng

// let me = { name: "Son" };
// let newMe = Object.freeze(me);
// me.name = "Truong";
// console.log(me); // { name: 'Son' } , code line 99 không hoạt động
// newMe.name = "Tuan";
// console.log(me); // { name: 'Son' }
// console.log(newMe); // { name: 'Son' }

// // Nhưng đối với object chứa các thuộc tính là object thì có sự khác biệt
// let person = { name: "Son", pet: { type: "Dog" } };
// Object.freeze(person);
// person.pet.type = "Fish";
// console.log(person); // { name: 'Son', pet: { type: 'Fish' } } - type đã thay đổi

//Object.fromEntries(iterable) => ngược lại với entries(), hàm tạo ra một obj từ một array, map

// let drink = [
//     ["name", "CoCa"],
//     ["price", 10000],
// ];
// let objDrink = Object.fromEntries(drink);
// console.log(objDrink); // { name: 'CoCa', price: 10000 }
// console.log(objDrink.name); // CoCa
// console.log(objDrink.price); // 10000

// Object.getOwnPropertyNames(obj) => trả về một array string là các key của obj
// let obj = {
//     id: 1,
//     name: "Hoa",
//     sayHello() {
//         console.log("Hello World");
//     },
// };
// console.log(Object.getOwnPropertyNames(obj)); // [ 'id', 'name', 'sayHello' ]

// Object.hasOwn(obj, prop) => trả về true nếu như obj có prop truyền vào, nếu prop đó được kế thừa hoặc không tồn tại thì trả về false

// let shape = {
//     width : 12,
//     height : 12,
// }
// console.log(Object.hasOwn(shape,"width")); // true
// console.log(Object.hasOwn(shape,"area")); // false

// Object.keys(obj) => hàm trả về array chứa các key của obj

// const people = {
//     saySomething() {console.log('somestring')},
//     age: 42,
//     married: false,
//   };
  
//   console.log(Object.keys(people)); // [ 'saySomething', 'age', 'married' ]

// Object.values(obj) => hàm trả về array chứa các values của các keys của obj

// const people = {
//     saySomething() {console.log('somestring')},
//     age: 42,
//     married: false,
// };
// console.log(Object.values(people)); // [ [Function: saySomething], 42, false ]

// Object.seal(obj) => Làm cho obj không thể add thêm các properties mới , các properties cũ có thể thay đổi

// let people = {name : "Son"};
// Object.seal(people);
// people.name = "Truong";
// people.age = 18;
// console.log(people); // { name: 'Truong' } , không thể add thêm property age
// delete people.name;
// console.log(people); // { name: 'Truong' } , không thể xoá trường của object đã được seal



