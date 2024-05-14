/**
 * Calls a defined callback function on each element of an array, and returns an array that contains the results.
 * @param callback A function that accepts up to three arguments.
 *  - value : this is current element
 *  - index : this is current index
 *  - array : this is array call method
 * The map method calls the callbackfn function one time for each element in the array.
 */

Array.prototype.myMap = function (callback) {
    // check type of param, if param is not a function -> throw error
    if (!(callback instanceof Function)) {
        throw TypeError(`${callback} is not a function`);
    }
    // defined output array is result, i will return an array contains elements, which is result of callback function
    const output = [];
    //Loop all elements in array
    for (let i = 0; i < this.length; i++) {
        // push element is result callback function in output array
        let e = callback((value = this[i]), (index = i), (array = this));
        output.push(e);
    }
    //return output array is result
    return output;
};

// test 1
console.log([1, 2, 3].map((e) => e * 2)); // [ 2, 4, 6 ]
console.log([1, 2, 3].myMap((e) => e * 2)); // [ 2, 4, 6 ]

// tets 2
let students = [
    { name: "Son", age: 21 },
    { name: "Trinh", age: 18 },
    { name: "Truong", age: 30 },
];

let s1 = students.map(({ name, age }) => ({ [name]: age }));
let s2 = students.myMap(({ name, age }) => ({ [name]: age }));
console.log(s1); // [{ Son: 21 }, { Trinh: 18 }, { Truong: 30 }]
console.log(s2); // [{ Son: 21 }, { Trinh: 18 }, { Truong: 30 }]\

// test 3
let numbers = [1, 2, 3, 4];
let f1 = numbers.map((num, index) => {
    if (index < 3) {
        return num;
    }
});
let f2 = numbers.myMap((num, index) => {
    if (index < 3) {
        return num;
    }
});
console.log(f1); // [ 1, 2, 3, undefined ]
console.log(f2); // [ 1, 2, 3, undefined ]

// test 4
console.log([1, 2, 3].map(() => true)); // [ true, true, true ]
console.log([1, 2, 3].myMap(() => true)); // [ true, true, true ]

// test 5
let pet = [
    "Dog",
    function () {
        console.log(1);
    },
];
console.log(pet.map((e) => e + 1)); // [ 'Dog1', 'function () {\n        console.log(1);\n    }1' ]
console.log(pet.myMap((e) => e + 1)); // [ 'Dog1', 'function () {\n        console.log(1);\n    }1' ]

// test 6
// console.log([1, 2, 3].map()); // TypeError: undefined is not a function
// console.log([1, 2, 3].myMap()); // TypeError: undefined is not a function
