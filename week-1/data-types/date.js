// Date là kiểu dữ liệu đối tượng chỉ thời gian, đối tượng Date đóng gói một số nguyên biểu số milliseconds kể từ ngày 1/1/1970

// let date = new Date(8.64e15).toString()
// console.log(date); // Sat Sep 13 275760 07:00:00 GMT+0700 (Indochina Time)

// // Static methods
// //Date.now() => hàm trả về một số nguyên là số milliseconds tính từ 1/1/1970 tới thời điểm hiện tại
// const now = Date.now();
// console.log(now); // 1715218161284
// // sau 2s
// console.log(now); // 1715218161286

// Date.parse() => hàm parse từ một string biểu diễn Date sang thành đối tượng Date và return về date timestamp
// const birthday = Date.parse('02 Feb 2003 00:00:00 GMT');
// console.log(birthday); // 1044144000000

// // Trường hợp chuỗi truyền vào là khoảng thời gian trước 1/1/1970
// const errTime = Date.parse('01 Jan 1900 00:00:00 GMT');
// console.log(errTime); // -31536000000 - sẽ trả về số nguyên biểu diễn số milliseconds từ mốc thời gian đó tới 1/1/1970

//Instance methods
//getDate() => return về ngày trong tháng của đối tượng Date
let birthday = new Date('02 Feb 2003 02:30:19');
console.log(birthday.getDate()); // 2
//getDay() => return về ngày trong tuần ( 0 - 6)  0 - Sunday
console.log(birthday.getDay()); // 0
//getFullYear() => return về năm của đối tượng Date
console.log(birthday.getFullYear()); // 2003
//getHours() => return về số giờ của đối tượng Date
console.log(birthday.getHours()); // 2
//getMinutes() => tương tự hàm return về số phút
console.log(birthday.getMinutes()); // 30
//getSeconds() => tương tự return về số giây
console.log(birthday.getSeconds()); // 19

//setDate(day) => thay đổi ngày của đối tượng Date
birthday.setDate(10);
console.log(birthday.getDate()); // 10
// Nếu thử set một ngày nằm ngoài tháng
birthday.setDate(32);
console.log(birthday.getDate()); // 4 - thì ta sẽ lấy đối số trừ đi số ngày thực có của tháng sẽ là đối số thực nhận
// setMonth(month) => thay đổi tháng của đối tượng Date
birthday.setMonth(10);
console.log(birthday.getMonth()); // 10
console.log(birthday.getDate()); // 10
birthday.setMonth(13); 
console.log(birthday.getMonth()); // 
birthday.setMonth("12");
console.log(birthday.getMonth()); // 
console.log(birthday.getFullYear());








