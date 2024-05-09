// +
// Number
// number + number = number
// console.log(1 + 2); // 3
// console.log(2 + 3.14); // 5.140000000000001
// console.log(Infinity + 1); // Infinity
// console.log(Infinity + Infinity); // Infinity

// // number + string = string - Khi cộng một số và một chuỗi, js sẽ convert số sang chuỗi để cộng 2 chuỗi lại
// console.log(1 + "1"); // "11"
// console.log(2 + ""); // "2"
// console.log("abc" + 3.14); // "abc3.14"
// // number + {} / [] = string - Tương tự khi cộng một số và object/array, js sẽ convert {}/array sang chuỗi và số sang chuỗi để tiến hành cộng 2 chuỗi
// console.log(123 + ["A", "B"]); // 123A,B
// console.log({name : "Son", age : 18} + 2.03); // [object Object]2.03

// // number + null = number - Khi cộng một số với null, thì js sẽ biến đổi null thành số 0 và tiến hành phép cộng
// console.log(123 + null); // 123
// console.log(null + 3.09); // 3.09

// // number + undefined = NaN - Khi cộng một số với undefined thì là vì undefined là một giá trị không xác định nên khi cộng sẽ có kết quả không phải là số => NaN
// console.log(123 + undefined); // NaN
// console.log(1.2 + undefined); // NaN

// // number + boolean = number - Khi cộng một số với một giá trị boolean, js sẽ convert giá trị boolean sang number (true = 1, false = 0), và tiến hành phép cộng
// console.log(1 + true); // 1+ 1 = 2
// console.log(2 + true); // 2+1 = 3
// console.log(3 + false); // 3+ 0 == 3

// String
// string + anything = string - Khi cộng một chuỗi với một loại dữ liệu bất kỳ, js sẽ convert giá trị còn lại sang chuỗi, rồi tiến hành phép cộng chuỗi
// + number
// console.log("string" + 123); // string123
// // + boolean
// console.log("string" + true); // stringtrue
// console.log("string" + false); // stringfalse
// // + null
// console.log("string" + null); // stringnull
// // + undefined
// console.log("string" + undefined); // stringundefined
// // + []
// console.log("string" + [1]); // string1

// Ở các phép tính +, - . Js sẽ ưu tiên phép với chuỗi sau đó là phép với số, nếu như hai giá trị không thể convert về số thì js sẽ convert 2 giá trị về chuỗi rồi tiến hành cộng chuỗi, nếu phép trừ thì sẽ return vè NaN

// console.log({} + [1]); // [object Object]1
// console.log([] + undefined); // undefined
// console.log(null + undefined); // NaN - null: +0 và undefined: NaN
// console.log({} + undefined); // [object Object]undefined

// -
// console.log("string" - []); // NaN
// console.log(null - undefined); // NaN
// console.log(undefined - null); // NaN
// console.log(123 - null); // 123
// console.log(null - 321); // -321
// console.log(Infinity - Infinity); // NaN
// * và / - Đối với phép nhân và chia thì tương tự nếu như hai giá trị không thể convert về số thì sẽ là NaN
// console.log(2 * 3); //6
// console.log(4 * true); // 4
// console.log(false / 2); // 0
// console.log(2 / false); // Infinity
// console.log(2 * false); // 0
// console.log({} / []);  //NaN
// console.log(null * 123); // 0
// console.log(2 / undefined); // NaN
// console.log(undefined / 2); // NaN

// ++a và a++
// Cả hai toán tử đều tăng phần tử lên một đơn vị nhưng có sự khác biệt
// ++a : thực hiện phép tính ngay
// a++ : thực hiện phép tính sau
// let a = 3;
// let b = 3
// console.log(++a); // 4
// console.log(b++); // 3
// console.log(a); // 4
// console.log(b); // 4

// Tương tự với phép trừ

// console.log(++{}) // Invalid left-hand side expression in postfix operation
// console.log([1]++); // Invalid left-hand side expression in postfix operation

// % : phép chia lấy phần dư, chỉ hợp lệ với dữ liệu số, các kiểu dữ liệu khác sẽ return về NaN
// console.log(6%3); // 0
// console.log({} % []); // NaN
// console.log("string" % null); // NaN


