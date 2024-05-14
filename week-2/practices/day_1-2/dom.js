// DOM Manipulation

// getElementById()

// get element have an id is header -> return an element object match header id
let header = document.getElementById("header");
console.log([header]); // div#header

// get element with an id not exists -> return null
let header2 = document.getElementById("header2");
console.log([header2]); // null

// with header element, i will get title element in header element
// let header_title = header.getElementById("header-title");
// console.log([header_title]);
// throw error
// Uncaught TypeError: header.getElementById is not a function

// getElementsByClassName()

// get elements witch class -> return elements match class
let blogs = document.getElementsByClassName("blog");
console.log(blogs); // HTMLCollection(3) [div.blog, div.blog, div.blog]

// get elements that have both the 'blog' and 'red' classes
let red_blog = document.getElementsByClassName("blog red");
console.log(red_blog); // HTMLCollection [div.blog.red]
// get the first element, or undefined if there is no matching element:
console.log({ element: red_blog[0] }); // element: div.blog.red
console.log({ element: red_blog[2] }); // element: undefined

// get elements have a class 'blog', inside of an element that has the id 'main':
let blogs2 = document.getElementById("main").getElementsByClassName("blog");
console.log(blogs2); // HTMLCollection(3) [div.blog.red, div.blog.green, div.blog.blue]

// getElementsByName()

// get element with name is "mini-title"
let mini_title = document.getElementsByName("mini_title"); // NodeList [p.title]
console.log(mini_title);
// get the first element, or undefined if there is no matching element:
console.log(mini_title[0]); // p.title
console.log(mini_title[9]); // undefined

// get tag name of element
console.log(mini_title[0].tagName); // p

// getElementsByTagName()

//get elements with a tag 'h1'
let h1_tags = document.getElementsByTagName("h1");
console.log(h1_tags); // HTMLCollection(2) [h1#header-title.title, h1#main-title.title]

let p_tags = document.getElementById("main-content").getElementsByTagName("p");
console.log(p_tags); // HTMLCollection(3) [p.blog-content, p.blog-content, p.blog-content]

let a_tags = document.getElementsByTagName("a");
console.log(a_tags); // HTMLCollection []

// let tags = document.getElementsByTagName(); // Failed to execute 'getElementsByTagName' on 'Document': 1 argument required, but only 0 present.

// querySelector()

//try get element with p tag
let p = document.querySelector("p");
console.log([p]); // p.title

// try get p tag inside of main div
let p2 = document.querySelector("#main p");
console.log(p2); // p.blog-content

// querySelectorAll()

// get all elements have tag p
let ps = document.querySelectorAll("p");
console.log(ps); // NodeList(4) [p.title, p.blog-content, p.blog-content, p.blog-content]

// get all elements have tag p but inside of main div
let ps2 = document.querySelectorAll("#main p");
console.log(ps2); // NodeList(3) [p.blog-content, p.blog-content, p.blog-content]

// different between HtmlCollection and NodeList
let htmlCollection = document.getElementsByTagName("p");
let nodeList = document.querySelectorAll("p");
// forEach
// htmlCollection.forEach(e => console.log(e)); // TypeError: htmlCollection.forEach is not a function
nodeList.forEach((e) => console.log(e));

// updated when changes
// append a p element in main div
document.getElementById("main").appendChild(document.createElement("p"));

console.log(htmlCollection); // HTMLCollection(5) [p.title, p.blog-content, p.blog-content, p.blog-content, p, mini_title: p.title]
console.log(nodeList); // odeList(4) [p.title, p.blog-content, p.blog-content, p.blog-content]

// Attribute node
let main_title = document.querySelector("#main-title");
console.log(main_title.attributes); // NamedNodeMap {0: id, 1: class, id: id, class: class, length: 2}

console.log(main_title.attributes[0]); // id
console.log(main_title.attributes[1]); // class

// using getter
console.log(main_title.attributes.id); // id
console.log(main_title.attributes.class); // class
console.log(main_title.attributes.title); // title

console.log(main_title.attributes.id.value); // main-title
console.log(main_title.attributes.class.value); // title
console.log(main_title.attributes.title.value); // id
//can using for of loop
for (let attr of main_title.attributes) {
    console.log(`${attr.name} -> ${attr.value}`);
}

// id -> main-title
// class -> title
// title -> title of main content

// using getAttribute()
console.log(main_title.getAttribute("id")); // main-title
console.log(main_title.getAttribute("class")); // title
console.log(main_title.getAttribute("title")); // title of the main content

// using getAttributeNames()
console.log(main_title.getAttributeNames()); // (3) ['id', 'class', 'title']

// using setAttributeNames()
main_title.setAttribute("title", "new title");
console.log(main_title.attributes.title.value); // new-title

// using setAttribute() for set an attribute not specified in h1
main_title.setAttribute("href", "new title");
console.log(main_title); // <h1 id="main-title" class="title" title="new title" href="new title">This is main</h1>

// using setter for set an attribute not specified in h1
main_title.attributes.src = "src";
console.log(main_title); // <h1 id="main-title" class="title" title="new title" href="new title">This is main</h1>

// removeAttribute()
main_title.removeAttribute("href");
console.log(main_title); // <h1 id="main-title" class="title" title="new title">This is main</h1>

// hasAttribute();
console.log(main_title.hasAttribute("href")); // false

//matches()
let listBlog = document.querySelectorAll(".blog");
console.log(listBlog); // // NodeList(3) [div.blog.red, div.blog.green, div.blog.blue]
listBlog.forEach((e) => {
    if (e.matches(".red")) {
        console.log(e);
    }
});

// div.blog.red

// insertAdjacentText():

// ```jsx
// beforebegin
// <p>
//   afterbegin
//   foo
//   beforeend
// </p>
// afterend
// ```

// insertAdjacentElement():

// insertAdjacentElement():

let footer = document.getElementById("footer");
console.log(footer);

// insert a text node before begin footer
footer.insertAdjacentText("beforebegin", "Welcome Footer");
//  Welcome Footer
// <h1 address="TPHCM" id="footer">This is footer</h1>

// create h3 node
let hello = document.createElement("h3");
hello.innerText = "Bye bye";
hello.setAttribute("id", "hello");
//insert hello before end;
footer.insertAdjacentElement("beforeend", hello);

// insert html string afterend footer
let strHtml = `<a id="link-fb" href="https://facebook.com">Visit My Facebook</a>`;
footer.insertAdjacentHTML("afterend", strHtml);

// "Welcome Footer"
// <h1 address="TPHCM" id="footer">
//    This is footer
//    <h3>Bye bye</h3>
// </h1>
// <a href="https://facebook.com">Visit My Facebook</a>

// Text node
console.log(main_title.innerText); // This is main
console.log(main_title.textContent); // This is main

//getter
let sologan = document.getElementById("sologan");
console.log(sologan.innerText);
console.log(sologan.textContent);

//setter
sologan.innerText = ` 
Welcome

            To Me
`;
//  <span id="sologan">
//      <br>
//      Welcome
//      <br>
//      <br>
//     To Me
//  </span>

sologan.textContent = ` 
Welcome

            To Me
`;
//  <span id="sologan">
//      Welcome
//
//      To Me
//  </span>

// How to Create an Element

// using createElement and appendChild

// using document create an h1 element
let newFooter = document.createElement("h1");
newFooter.setAttribute("address", "TPHCM");
newFooter.setAttribute("id", "new-footer");
newFooter.innerText = "This is new footer";
document.body.appendChild(newFooter);
console.log(document.getElementById("footer")); // <h1 address="TPHCM" id="footer">This is new footer</h1>

// with innerHTML
let blogRed = document.querySelector(".blog.red");
blogRed.innerHTML = "<p>Hello World</p>";
console.log(blogRed);
// <div class="blog red">
//		<p>Hello World</p>
// </div>

// with outerHTML
blogRed.innerHTML = "<h1>Welcome!</h1>";
console.log(blogRed);
// <h1>Welcome!</h1>

// classList
console.log(main_title.classList); // DOMTokenList ['title', value: 'title']

// add(): add an class attribute
main_title.classList.add("is-active");
console.log(main_title.classList); // DOMTokenList(2) ['title', 'is-active', value: 'title is-active']
main_title.classList.add("red", "green");
console.log(main_title.classList); // DOMTokenList(4) ['title', 'is-active', 'red', 'green', value: 'title is-active red green']

// remove(): remove an class attribute
main_title.classList.remove("is-active");
console.log(main_title.classList); // DOMTokenList(3) ['title', 'red', 'green', value: 'title red green']

// contains(): check an class name contains in class attributes
console.log(main_title.classList.contains("title")); // true
console.log(main_title.classList.contains("active")); // false

// toggle() : if class attributes contain class nam then remove this, else add this
main_title.classList.toggle("active");
console.log(main_title.classList); // DOMTokenList(4) ['title', 'red', 'green', 'active', value: 'title red green active']
main_title.classList.toggle("active");
console.log(main_title.classList); // DOMTokenList(3) ['title', 'red', 'green', value: 'title red green']

// parentNode - parentElement
console.log(main_title.parentNode); // <div id="main">...</div>
console.log(main_title.parentElement); // <div id="main">...</div>

// remove() - removeChild()
let blog_red = document.querySelector(".blog.red");
// blog_red.remove(); // element blog_red is removed
let main_content = document.querySelector("#main-content");
// main_content.removeChild(blogRed); // element blog_red is removed

// nextElementSibling - previousElementSibling
console.log(main_title.nextElementSibling); // <div id="main-content">...</div>
console.log(main_title.previousElementSibling); // null

// childNodes - children
console.log(main_content.childNodes); // NodeList(7) [text, div.blog.red, text, div.blog.green, text, div.blog.blue, text]
console.log(main_content.children); // HTMLCollection(3) [div.blog.red, div.blog.green, div.blog.blue]

// firstChild - firstElementChild
console.log(main_content.firstChild); // #text
console.log(main_content.firstElementChild); // <div class="blog red">...</div>

// lastChild - lastElementChild
console.log(main_content.lastChild); // #text
console.log(main_content.lastElementChild); // <div class="blog blue">...</div>

// nextSibling - previousSibling
console.log(main_title.nextSibling); // #text
console.log(main_title.previousSibling); // #text

// DOM Events
let btn_hello = document.querySelector("#btn-hello");

// assign event
// btn_hello.onclick = () => {
//     alert("Xin chào");
// };
// add click event on btn-hello and console log event
btn_hello.onclick = (e) => {
    console.log(e);
};
// -> return PointerEvent Object
btn_hello.onclick = (e) => {
    console.log(e.target);
};
// -> return element <h1 id="btn-hello">Click Me</h1>

// Different between target and currentTarget
// target -> the element we actually click on
// currentTarget -> the element add on click event

// main_content.onclick = (e) => {
//     console.log(e.target); // <h2 class="blog green">Blog 2</h2>
//     console.log(e.currentTarget); // <div id="main-content">...</div>
// };

// addEventListener()
newFooter.addEventListener("click", (e) => {
    console.log(e.target.value); // undefined
});

// eventDefault()
let link_fb = document.getElementById("link-fb");
// link_fb.addEventListener("click", (e) => {
//     e.preventDefault();
//     console.log("Hello"); // Hello
// });

// stopPropagation()

// hello.addEventListener("click", (e) => {
//     console.log("hello is clicked");
// });
// footer.addEventListener("click", (e) => {
//     console.log("footer is clicked");
// });
// when click hello
// hello is clicked
// footer is clicked
// -> bubbling

// use stopPropagation

// hello.addEventListener("click", (e) => {
//     e.stopPropagation();
//     console.log("hello is clicked"); // hello is clicked
// });
// footer.addEventListener("click", (e) => {
//     console.log("footer is clicked"); // footer is clicked
// });

// stopImmediatePropagation()

let eRed = document.querySelector(".red");
eRed.classList.add("main-title");
let eTitle = document.querySelector(".main-title");
console.log(eRed);

// // add event to elements
// eTitle.addEventListener("click", (e) => {
//     console.log("title is clicked");
// });
// eRed.addEventListener("click", (e) => {
//     console.log("red is clicked");
// });

// when click
// title is clicked
// dom.js:385 red is clicked

// use stopImmediatePropagation()
eTitle.addEventListener("click", (e) => {
    e.stopPropagation();
    e.stopImmediatePropagation();
    console.log("title is clicked");
});
eRed.addEventListener("click", (e) => {
    console.log("red is clicked");
});
//when clicked 
// title is clicked

// key 

let input = document.getElementById("input");
console.log(input);

// input.addEventListener("keyup", (e) => {
//     console.log(e.target.value);
// })

// debounce
// input.addEventListener("keyup", .debounce((e) => {
//     console.log(e.target.value);
// }, 1000))

// throttle
// input.addEventListener("keyup", .throttle((e) => {
//     console.log(e.target.value);
// }, 1000))

document.addEventListener("scroll", (e) => {
    console.log(window.scrollY);
})
