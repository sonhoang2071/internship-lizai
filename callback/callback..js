// // Callback function : là một hàm được truyền vào một hàm dưới dạng đối số, sau đó hàm sẽ được gọi để kích hoạt

// // let a = [1, 2, 3];
// // a.forEach((element) => {
// //     console.log(element);
// // });
// // // 1
// // // 2
// // // 3

// // callback hell
// function getData(callback) {;
//     callback();
// }
// getData(() => {
//     getData(() => {
//         getData(() => {
//             console.log("hi");
//         });
//     });
// });

// function wakeup(work){
//     work();
// }

// function eat(work){
//     work();
// }

// function study(work){
//     work();
// }
// function rest(work) {
//     work();
// }
// function sleep(work) {
//     work();
// }
// wakeup(() => {
//     console.log("wake up");
//     eat(() => {
//         console.log("eat");
//         study(() => {
//             console.log("study");
//             rest(() => {
//                 console.log("rest");
//                 sleep(()=> {
//                     console.log("sleep");
//                     console.log("Done");
//                 })
//             });
//         });
//     });
// })


console.log(typeof(() => {}));