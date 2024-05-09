// ta có code sau
function wakeup() {
    console.log("Wake up");
}
setTimeout(() => {
    wakeup();
}, 2000);
console.log("Eat");
//Wake up
// sau 2s
// Eat

// Muốn chạy đồng bộ là sau 2s in ra 1 rồi in ra Hi
// Promise là một Object Javascript
const promise = fetch("https://picsum.photos/v2/list");
promise
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => {
        console.log(err);
    });

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

// Promise.all()
Promise.all([promise, checkAge(18), daily]).then((values) => {
    console.log(values);
});
