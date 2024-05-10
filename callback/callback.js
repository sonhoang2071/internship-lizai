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

// function getName() {
//     setTimeout(() => {
//         displayName("Son", (name) => {
//             console.log(name);
//         });
//     }, 2000);
// }
// function displayName(name, callback) {
//     callback(name);
// }
// getName();

// function wakeUp(callback) {
//     console.log("Wake Up");
//     callback("Eat");
// }
// function eat(resWakeUp, callback) {
//     console.log(resWakeUp);
//     callback("Study");
// }
// function study(resEat, callback) {
//     console.log(resEat);
//     callback("Rest");
// }
// function rest(resStudy) {
//     console.log(resStudy);
// }

// wakeUp((resFromWakeUp) => {
//     eat(resFromWakeUp, (resFromEat) => {
//         study(resFromEat, (resFromStudy) => {
//             rest(resFromStudy);
//         });
//     });
// });

// The following variables are defined in the global scope
const num1 = 20;
const num2 = 3;
const name = "Chamakh";

// This function is defined in the global scope
function multiply() {
  return num1 * num2;
}

console.log(multiply()); // 60

// A nested function example
function getScore() {
  const num1 = 2;
  const num2 = 3;

  function add() {
    return `${name} scored ${num1 + num2}`;
  }

  return add();
}
add();
console.log(getScore()); // "Chamakh scored 5"
