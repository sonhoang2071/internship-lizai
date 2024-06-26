// const hello = async () => {
//     return "Hello World!";
// };
// hello().then(mess => console.log(mess));
// (async() => {
//     console.log(await hello());
// })()

// Before use Async - Await
// const get1 = () => {
//     setTimeout(() => {
//         console.log(1);
//     }, 2000);
// }
// const get2 = ()  => {
//     setTimeout(() => {
//         console.log(2);
//     }, 4000);
// }
// const get3 = ()  => {
//     setTimeout(() => {
//         console.log(3);
//     }, 6000);
// }

// (() => {
//     get3();
//     get1();
//     get2();
// })();

//After use async - await
// const get1 = () => {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             console.log(1);
//             resolve();
//         }, 2000);
//     });
// };

// const get2 = () => {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             console.log(2);
//             resolve();
//         }, 4000);
//     });
// };

// const get3 = () => {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             console.log(3);
//             resolve();
//         }, 6000);
//     });
// };

// (async () => {
//     await get3();
//     await get1();
//     await get2();
// })();

// let getMess = (mess) => {
//     return Promise.resolve(mess);
// };

// async function handle() {
//     let mess = await getMess("Hello World");
//     console.log(mess);
// }
// handle();

const checkAge = (age) => {
    if (age < 18) {
        return Promise.reject("No");
    }
    return Promise.resolve("Yes");
};
async function display() {
    try {
        let res = await checkAge(16);
        console.log(res);
    } catch (e) {
        console.log(e);
    }
}
display();