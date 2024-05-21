// import jsdom package to convert js to dom object
const fs = require("fs");
const { JSDOM } = require("jsdom");
// defined an url
const url =
    "https://anonystick.com/blog-developer/tuyet-voi-connect-pool-gom-96-connects-nhanh-hon-gap-50-lan-so-voi-1000-or-4000-connections-khong-dung-pool-2023060952850932";
//this function to fetch data from url specified
async function fetchData(url) {
    // using try catch to handle exception
    try {
        // call api url with fetch and make response to text
        // res is value response from url
        const res = await fetch(url).then((e) => e.text());
        // convert response to dom object
        const dom = new JSDOM(res);
        // get body object
        const body = dom.window.document.body;
        // return result
        return body;
    } catch (error) {
        // if an error occurs -> throw error
        throw Error(error);
    }
}
// filter invalid href link
function hrefFilter(url) {
    try {
        const protocol = url.protocol;
        if (
            protocol === "mailto:" ||
            protocol === "about:" ||
            protocol === "javascript:" ||
            protocol === "data:" ||
            protocol === "tel:"
        ) {
            return false;
        }
        return true;
    } catch (err) {
        return false;
    }
}
// filter invalid src link
function srcFilter(url) {
    if (url.tagName == "SCRIPT") {
        return false;
    }
    return true;
}
// factory method to create function filter for a link
function factoryLinkFilter(type) {
    if (type == "src") {
        return srcFilter;
    } else if (type == "href") {
        return hrefFilter;
    }
}
// handle link data after filter
function handleData(arr, baseUrl, type) {
    const result = [];
    // loop all elements
    arr.forEach((e) => {
        // create absolute link with baseurl
        let tmp = new URL(e[type], baseUrl);
        // check link is contained in result
        if (!result.includes(tmp.href)) {
            result.push(tmp.href);
        }
    });
    return result;
}
// handle link
function handleLink(body, baseUrl, type) {
    // using factory method to get a function to filter
    let fn = factoryLinkFilter(type);
    // get links with type and filter them
    const arr = Array.from(body.querySelectorAll(`[${type}]`)).filter(fn);
    // handle array links after filter
    const result = handleData(arr, baseUrl, type);
    return result;
}

// get links from body
function getLinks(body, baseUrl) {
    // let get a link with type param
    let href = handleLink(body, baseUrl, "href");
    let src = handleLink(body, baseUrl, "src");
    return [...href, ...src];
}

// this function to get all require data from url
async function getData(url) {
    // using try catch to handle exception
    try {
        // using await to get body object form fetchData()
        const body = await fetchData(url);
        if (body.tagName !== "BODY") {
            throw Error("body is not Body Object DOM");
        }
        // links from getLinks()
        const links = getLinks(body, url);
        return { links: links };
        // return JSON.stringify(res);
    } catch (error) {
        return error;
    }
}

// getData and console.log result
getData(url).then((res) => {
    console.log(res);
});
