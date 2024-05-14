/**
 * Calls the specified callback function for all the elements in an array.
 * The return value of the callback function is the accumulated result
 * and is provided as an argument in the next call to the callback function.
 * @param callback A function that accepts up to four arguments.
 * - accumulator : The value resulting from the previous call to callback. On the first call, its value is initialValue if the latter is specified; otherwise its value is array[0].
 * - currentValue : The value of the current element.
 * - currentIndex : The value of the current index.
 * - array : this is  array call method
 * The reduce method calls the callbackfn function one time for each element in the array.
 * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
 */

Array.prototype.myReduce = function (callback, initialValue) {
    // check type of param, if param is not a function -> throw error
    if (!(callback instanceof Function)) {
        throw TypeError(`${callback} is not a function`);
    }
    // defined index = 0, accumulator = initialValue
    // It mean  initialValue is defined
    let index = 0;
    let accumulator = initialValue;
    // Check initialValue
    // if initialValue is undefined
    // update accumulator = this[0] and index =  1
    if (initialValue === undefined) {
        accumulator = this[0];
        index = 1;
    }
    // Loop elements in array from index
    for (; index < this.length; index++) {
        // Assign accumulator for a result from callback function
        accumulator = callback(accumulator, this[index], index, this);
    }
    // return accumulator is result
    return accumulator;
};

// test 1
console.log(
    [1, 2, 3, 4, 5].reduce((a, c) => {
        return a + c;
    }, 0)
); // 15
console.log(
    [1, 2, 3, 4, 5].myReduce((a, c) => {
        return a + c;
    }, 0)
); // 15

//test 2

let students = [
    { name: "Alice", age: 25, subject: "Math" },
    { name: "Bob", age: 30, subject: "Science" },
    { name: "Charlie", age: 28, subject: "Math" },
];
let s1 = students.reduce((map, student) => {
    const subject = student.subject;
    map[subject] = map[subject] || [];
    map[subject].push(student);
    return map;
}, {});
let s2 = students.myReduce((map, student) => {
    const subject = student.subject;
    map[subject] = map[subject] || [];
    map[subject].push(student);
    return map;
}, {});
console.log(s1);
// {
//     Math: [
//       { name: 'Alice', age: 25, subject: 'Math' },
//       { name: 'Charlie', age: 28, subject: 'Math' }
//     ],
//     Science: [ { name: 'Bob', age: 30, subject: 'Science' } ]
//  }
console.log(s2);
// {
//     Math: [
//       { name: 'Alice', age: 25, subject: 'Math' },
//       { name: 'Charlie', age: 28, subject: 'Math' }
//     ],
//     Science: [ { name: 'Bob', age: 30, subject: 'Science' } ]
// }

//test 3
console.log([1, 100].reduce((a, b) => Math.max(a, b), 50)); // 100
console.log([50].reduce((a, b) => Math.max(a, b), 10)); // 50

console.log([1, 100].myReduce((a, b) => Math.max(a, b), 50)); // 100
console.log([50].myReduce((a, b) => Math.max(a, b), 10)); // 50

//test 4
console.log([1, 2, 3].reduce((e) => e * 2)); // 4
console.log([1, 2, 3].myReduce((e) => e * 2)); // 4

// test 5

// console.log([1, 2, 3].reduce()); // TypeError: undefined is not a function
// console.log([1, 2, 3].myReduce()); // TypeError: undefined is not a function
