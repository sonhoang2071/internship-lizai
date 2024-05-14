/**
 * Returns the elements of an array that meet the condition specified in a callback function.
 * @param callback is a function that accepts up to three arguments.
 *  - value : this is current element
 *  - index : this is current index
 *  - array : this is array call method
 * The filter method calls the predicate function one time for each element in the array.
 */

Array.prototype.myFilter = function (callback) {
    // check type of param, if param is not a function -> throw error
    if (!(callback instanceof Function)) {
        throw TypeError(`${callback} is not a function`);
    }
    // I will return output array, which contains elements that satisfy the condition in a callback function and it's defined equal []
    const output = [];
    //Loop all elements in array,
    for (let i = 0; i < this.length; i++) {
        //check a element meet the condition specified
        if (callback((value = this[i]), (index = i), (array = this))) {
            // push element that meet the condition in output array
            output.push(value);
        }
    }
    // return output array is result
    return output;
};

// test 1
console.log([1, 3, 4].filter((e, i) => e > 2 && i > 1)); // 4
console.log([1, 3, 4].myFilter((e, i) => e > 2 && i > 1)); // 4

// test 2
let fruits = ["Apple", "Pineapple", "Guava", "Strawberry"];
console.log(fruits.filter((e) => e.length > 7)); // [ 'Pineapple', 'Strawberry' ]
console.log(fruits.myFilter((e) => e.length > 7)); // [ 'Pineapple', 'Strawberry' ]

// test 3
console.log(fruits.filter(() => true)); // [ 'Apple', 'Pineapple', 'Guava', 'Strawberry' ]
console.log(fruits.myFilter(() => true)); // [ 'Apple', 'Pineapple', 'Guava', 'Strawberry' ]

// test 4
// console.log([1, "Flower", 2].filter()); // TypeError: undefined is not a function
// console.log([1, "Flower", 2].myFilter()); // TypeError: undefined is not a function

// test 5
console.log([1, "Flower", 2].filter(() => {})); // []
console.log([1, "Flower", 2].myFilter(() => {})); // []

// test 6

let pet = ["Dog", { height: 15 }];
let pet1 = pet.filter(() => true);
let pet2 = pet.myFilter(() => true);
pet[0] = "Fish";
console.log(pet1); // [ 'Dog', { height: 15 } ]
console.log(pet2); // [ 'Dog', { height: 15 } ]
pet[1].height = 5;
console.log(pet1); // [ 'Dog', { height: 5 } ]
console.log(pet2); // [ 'Dog', { height: 5 } ]

//test 7
console.log([1, "Flower", 2].filter(() => [])); // [ 1, 'Flower', 2 ]
console.log([1, "Flower", 2].myFilter(() => [])); // [ 1, 'Flower', 2 ]

// tets 8
console.log([1, "Flower", 2].filter((e) => e%2 == 0)); // [2]
console.log([1, "Flower", 2].myFilter((e) => e%2 == 0)); // [2]
