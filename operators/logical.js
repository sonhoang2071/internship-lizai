// && - là phép and tất cả toán hạng boolean sẽ trả về true khi tất cả đều đúng , ngược lại sẽ trả về false
console.log(1 < 2 && 2 < 3); // true
console.log(1 && "" && {}); // ""
console.log(12 && false && []); // false
console.log(1 && []); // []

// || - là phép or tất cả các toán hạng trả về true khi tồn tại ít nhất một toán hạn true, ngược lại false

console.log(1 > 2 || 2 < 3); //true
console.log(1 || "" || {}); // 1
console.log(12 || false || []); // 2
console.log(1 || []); // 1

// ! - là phép not : phủ định
console.log(!true); // false
console.log(!false); // true
console.log(!null); // true
console.log(![]); //false
