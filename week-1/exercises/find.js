/**
 * Returns the value of the first element in the array where predicate is true,
 * or return undefined if no element is found that satisfies the condition in callback
 * find calls @param callback  once for each element of the array,
 * until it finds one where predicate returns true. If such an element is found, find
 * immediately returns that element value. Otherwise, find returns undefined.
 * @param callback is a function that accepts up to three arguments.
 *  - value : this is current element
 *  - index : this is current index
 *  - array : this is array call method
 */

Array.prototype.myFind = function (callback) {
    // check type of param, if param is not a function -> throw error
    if (!(callback instanceof Function)) {
        throw TypeError(`${callback} is not a function`);
    }
    //Loop all elements in array,
    for (let i = 0; i < this.length; i++) {
        //check a element meet the condition specified
        if (callback((value = this[i]), (index = i), (array = this))) {
            // return the element
            return this[i];
        }
    }
    // return undefined if no element is found
    return undefined;
};

// test 1
console.log([1, 2, 3].find((e) => e % 2 == 0)); // 2
console.log([1, 2, 3].myFind((e) => e % 2 == 0)); // 2

// test 2
let fruits = [
    { name: "apples", quantity: 2 },
    { name: "bananas", quantity: 0 },
    { name: "cherries", quantity: 5 },
];
console.log(fruits.find((fruit) => fruit.name === "cherries")); // { name: 'cherries', quantity: 5 }
console.log(fruits.myFind((fruit) => fruit.name === "cherries")); // { name: 'cherries', quantity: 5 }

// test 3
// console.log([1, 2, 3].find()); // TypeError: undefined is not a function
// console.log([1, 2, 3].myFind()); // TypeError: undefined is not a function

// test 4
console.log([1, 2, 3].find(() => null)); // undefined
console.log([1, 2, 3].myFind(() => null)); // undefined

// test 5
console.log([1, 2, 3].find(() => true)); // 1
console.log([1, 2, 3].myFind(() => true)); // 1
