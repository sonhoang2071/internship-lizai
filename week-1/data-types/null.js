// Null : đại diện cho một giá trị không tồn tại hoặc một giá trị rỗng, có thể được gán cho một biến không không có giá trị
let c = null;
console.log(c); // null
console.log(typeof(c)); // object - Mặc dù null là primitive type nhưng typeof của null là object

if(null) {
    console.log("its null");
}

if(null > 0) {
    console.log("its null");
}

if(null >= 0) {
    console.log("its null");
}

if(null <= 0) {
    console.log("its null");
}