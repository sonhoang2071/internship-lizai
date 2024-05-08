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

let pet1 = { name: "Dog", run: { speed: 180 } };
let pet2 = Object.assign({}, pet1);
console.log(pet1); // { name: 'Dog', run: { speed: 180 } }
console.log(pet2); // { name: 'Dog', run: { speed: 180 } }

// Một số hạn chế của việc sử dụng assign() để clone object
pet1.name = "Fish";
console.log(pet1); // { name: 'Fish', run: { speed: 180 } }
console.log(pet2); // { name: 'Dog', run: { speed: 180 } }
// Vẫn hoạt động bình thường, nhưng ta hãy thử thay đổi speed của run
pet1.run.speed = 10;
console.log(pet1); // { name: 'Fish', run: { speed: 10 } }
console.log(pet2); // { name: 'Dog', run: { speed: 10 } }

// Để deepclone ta nên sử dụng structuredClone()
let pet3 = structuredClone(pet1);
console.log(pet1); // { name: 'Fish', run: { speed: 10 } }
console.log(pet3); // { name: 'Fish', run: { speed: 10 } }
pet1.run.speed = 22;
console.log(pet1); // { name: 'Fish', run: { speed: 22 } }
console.log(pet3); // { name: 'Fish', run: { speed: 10 } }

//Object.create() => tạo mới một đối tượng từ nguyên mẫu

console.log(Object.create({})); // {}
console.log(Object.create(null)); // [Object: null prototype] {}



