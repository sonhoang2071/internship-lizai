// ta có code sau
// function wakeup() {
//     console.log("Wake up");
// }
// setTimeout(() => {
//     wakeup();
// }, 2000);
// console.log("Eat");
// //Wake up
// // sau 2s
// // Eat

// Muốn chạy đồng bộ là sau 2s in ra 1 rồi in ra Hi
// Promise là một Object Javascript, là kết quả của một hoạt động bất đồng bộ
// Có 3 trạng thái
// pending - trạng thái khi promise được khởi tạo
// fulfilled - trạng thái khi promise resolve
// rejected - trạng thái khi promise reject

const daily = new Promise((resolve, reject) => {
    setTimeout(() => resolve("Wake up"), 2000);
});
daily
    .then((work) => {
        console.log(work);
        return "Eat";
    })
    .then((work) => {
        console.log(work);
    });

// const promise = fetch("https://picsum.photos/v2/list");
// promise
//     .then((res) => res.json())
//     .then((data) => console.log(data))
//     .catch((err) => {
//         console.log(err);
//     });

const checkAge = (age) => {
    if (age < 18) {
        return Promise.reject("No");
    }
    return Promise.resolve("Yes");
};
checkAge(18)
    .then((mess) => console.log(mess))
    .catch((err) => {
        console.log(err);
    });

// Promise.all()
// Promise.all([promise, checkAge(18), daily]).then((values) => {
//     console.log(values);
// });

// let promise = new Promise((resolve, reject) => {
//     resolve("Hello JavaScript");
// });

// promise
//     .then((data) => data + data)
//     .then((result2) => {
//         console.log(result2);
//     });



// Ba hàm này phải được thực hiện "cùng lúc"
// chứ không phải "lần lượt"
var getData1 = new Promise((resolve, reject) => {
    resolve("Data 1");
});
var getData2 = new Promise((resolve, reject) => {
    resolve("Data 2");
});
var getDate3 = new Promise((resolve, reject) => {
    resolve("Data 3");
});

Promise.all([getData1, getData2, getDate3])
  .then(function(result) {
    console.log(result); 
  }) 
