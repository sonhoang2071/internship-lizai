// String : Dùng để biểu diễn giá trị là một xâu các kí tự

// let gr = "Hello World!";
// let gr2 = `Xin chào!`;

// // Độ dài của một chuỗi
// console.log(gr.length);
// console.log(gr2.length);

// // Cách lấy một ký tự trong chuỗi
// console.log(gr.charAt(1)); // e
// console.log(gr[1]); // e

// // So sánh 2 chuỗi
// console.log(gr == gr2); // false
// console.log(gr === gr2); //false

// Methods
// anchor(name) => trả về một chuỗi nằm trong một thẻ <a> có name và text là string đó
// console.log(gr.anchor("hello")); // <a name="hello">Hello World!</a>

// at(index) => trả về kí tự thứ index trong chuỗi
// console.log(gr.at(2)); // l
// console.log(gr.at(-1)); // !

// charAt(index) => tương tự như at()
// console.log(gr.charAt(2)); // l
// console.log(gr.charAt(-1)); // ''
// console.log(gr.charAt(1000)); // ''

// charCodeAt(index) => trả về giá trị số nguyên từ 0 - 65535 đại diện cho mã ký tự UTF-16
// console.log(gr.charCodeAt(2)); // 108
// console.log(gr.charCodeAt(-1)); // NaN
// console.log(gr.charCodeAt(1000)); // NaN

//concat()
//concat(str1)
//concat(str1, ...)
// Hàm nối các chuỗi là đối số với chuỗi được gọi và trả về kết quả là chuỗi mới

// let hello = "Hello";
// let introduce = "My name is Son";
// console.log(hello.concat()); // Hello
// console.log(hello.concat(introduce));// HelloMy name is Son
// console.log(hello.concat(" ", introduce, " !"));// Hello My name is Son !
// console.log(hello.concat([])); // Hello
// console.log(hello.concat({})); // Hello[object Object]
// console.log(hello.concat(true)); // Hellotrue
// console.log(hello.concat(123)); //Hello123
// console.log(hello.concat(null)); //Hellonull

//endsWith(searchString, endPosition) => Hàm kiểm tra chuỗi này có kết thúc bằng chuỗi truyền vào hay không

// let hello = "Hello World!";
// console.log(hello.endsWith("World")); // false
// console.log(hello.endsWith("World!")); // true
// console.log(hello.endsWith("world!")); // false
// console.log(hello.endsWith("World!", 12)); // true

// includes
//includes(searchString, position) => Hàm kiểm tra xem chuỗi có chứa chuỗi con truyền vào hay không
// với tham số position là vị trí của chuỗi bắt đầu kiểm tra

// let hello = "Hello World!";
// console.log(hello.includes("ello")); // true
// console.log(hello.includes("ello", 5)); // false
// console.log(hello.includes("ell", 1)); // true

//indexOf => trả về vị trí đầu tiên của chuỗi con cần tìm
// let hello = "Hello World!";

// console.log(hello.indexOf("l")); // 2
// console.log(hello.indexOf("abc")); // -1
// console.log(hello.indexOf("World", 2)); // 6
// console.log(hello.indexOf("World", 7)); // -1

//lastIndexOf() => ngược lại với indexOf, hàm trả về vị trí cuối cùng của chuỗi con cần tìm
// let hello = "Hello World!";
// console.log(hello.lastIndexOf("l")); // 9
// console.log(hello.lastIndexOf("ldl")); // -1

//match(regexp) => hàm trả về một mảng kết quả dựa vào chuỗi khớp với regular expression

// let str = "Nothing will come of nothing.";
// console.log(str.match()); // returns [""]
// console.log(str.match(1.3)); // null
// console.log(str.match(/[A-E]/gi)); // [ 'c', 'e' ]

// repeat(count) => hàm trả về chuỗi mới có kết quả là coppy chuỗi cũ count lần
// let hello = "Xin chào";
// console.log(hello.repeat()); // ""
// console.log(hello.repeat(3)); // Xin chàoXin chàoXin chào
// console.log(hello.repeat(-1)); // RangeError: Invalid count value: -1
// console.log(hello.repeat(2.7)); // Xin chàoXin chào
 
// replace(pattern, replacement) => hàm trả về chuỗi mới với một, một vài hoặc tất cả pattern được thay thế bởi replacement
// let p = "My name is Name";
// console.log(p.replace("Name", 'Son')); // My name is Son
// console.log(p.replace("name", "Son")); // My Son is Name
// console.log(p.replace(/name/gi, "Son")); // My Son is Son

// replaceAll(pattern, replacement) => tương tự như replace nhưng sẽ replace tất cả pattern
// let p = "My name is name";
// console.log(p.replaceAll("name", 'Son')); // My Son is Son
// console.log(p.replace(/name/g, "Son")); // My Son is Son

// search(regex) => Hàm trả về vị trí đầu tiên của chuỗi khớp với một regex
// let xinchao = "Xin chào";
// console.log(xinchao.search(/[A-Z]/)); // 0
// console.log(xinchao.search(/[.]/)); // -1

//slice(startIndex, endIndex) => Hàm trả về chuỗi mới là kết quả của việc cắt một phần của chuỗi cũ nhưng không làm thay đổi chuỗi cũ.
// let xinchao = "Xin chào!";
// console.log(xinchao.slice()); // Xin chào!
// console.log(xinchao.slice(4));
// console.log(xinchao.slice(4,5)); // c
// console.log(xinchao.slice(4,4)); // ""
// console.log(xinchao.slice(-5, 8)); // chào
// console.log(xinchao.slice("null", 8)); // Xin chào

//split(separator, limit) => Hàm trả về mảng các chuỗi con là kết quả của việc chia chuỗi cha bằng separator
// let xinchao = "Xin chào!";
// console.log(xinchao.split()); // ['Xin chào!']
// console.log(xinchao.split('')); // [ 'X', 'i', 'n', ' ', 'c', 'h', 'à', 'o', '!' ]
// console.log(xinchao.split(' ')); // ['Xin', 'chào!']
// console.log(xinchao.split(/(\d)/)); // [ 'Xin chào!' ]

// substring(startIndex, endIndex) => tương tự như slice()
// Hàm trả vềchuỗi mới là kết quả của việc cắt một phần của chuỗi cũ, nhưng có một chút khác biệt
// let xinchao = "Xin chào!";
// console.log(xinchao.substring(1,3)); // in
// console.log(xinchao.substring(3,1)); // in
// console.log(xinchao.slice(3,1)); // ""
// // Khi start > end , substring sẽ hoán đổi 2 argument, còn slice sẽ return ""
// console.log(xinchao.substring(-3, 8)); // Xin chào
// console.log(xinchao.slice(-3, 8)); // ào
// khi start < 0, substring sẽ lấy start = 0, slice sẽ lấy start = start + length
// console.log(xinchao.substring(null,[]));
// console.log(xinchao.slice(null,[]));
// // khi các argument là negative number thì substring sẽ không thực hiện, còn slice sẽ lấy start = end

// toLowerCase() => hàm trả về chuỗi mới sau khi đã in thường
// let xinchao = "XIn Chào";
// console.log(xinchao.toLowerCase()); // xin chào

// // toUpperCase() => hàm trả về chuỗi mới sau khi đã in hoa
// console.log(xinchao.toUpperCase()); // XIN CHÀO

// trim() => hàm trả về chuỗi mới sau khi loại bỏ khoảng trắng ở hai đầu chuỗi cũ, mà không làm thay đổi chuỗi cũ
// let xinchao = "   Xin chào    ";
// console.log(xinchao.trim()); // "Xin chào"
// // trimEnd() => tương tự với trim nhưng chỉ loại bỏ khoảng trắng ở cuối chuỗi
// console.log(xinchao.trimEnd()); // "   Xin chào"
// // trimStart() => tương tự với trim nhưng chỉ loại bỏ khoảng trắng ở đầu chuỗi
// console.log(xinchao.trimStart()); "Xin chào    "