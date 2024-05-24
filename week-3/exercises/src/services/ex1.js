// import jsdom package to convert js to dom object
const fs = require("fs");
const { JSDOM } = require("jsdom");
//this function to fetch data from url specified

async function fetchData(urlString) {
    try {
        // parse url
        const url = parseUrl(urlString);
        // get response from url
        const res = await fetch(url.href).then((e) => e.text());
        return res;
    } catch (error) {
        throw error;
    }
}
function parseUrl(urlString) {
    try {
        // create an URL object from url
        const url = new URL(urlString);
        return url;
    } catch (error) {
        // if an error occurs -> throw error
        throw error;
    }
}

async function getBody(url) {
    // using try catch to handle exception
    try {
        // call api url with fetch and make response to text
        // res is value response from url
        const res = await fetchData(url);
        // convert response to dom object
        const dom = new JSDOM(res);
        // get body object
        const body = dom.window.document.body;
        // return result
        return body;
    } catch (error) {
        // if an error occurs -> return error
        throw error;
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

// this function to get all require data from url
function getLinks(body, url) {
    // using try catch to handle exception
    try {
        // links from getLinks()
        // let get a link with type param
        let href = handleLink(body, url, "href");
        let src = handleLink(body, url, "src");
        return [...href, ...src];
    } catch (error) {
        throw error;
    }
}
//this function to get all text from body
function getText(body) {
    // init a text to contain all valid text
    let text = "";
    // loop all childNodes of body
    for (let node of body.childNodes) {
        // check if node have a type equal text node (3) and node have textContent is trimmed equal ""
        // else node have a type equal element node
        if (node.nodeType === 3 && node.textContent.trim() != "") {
            // trim textContent to remove white space at both ends
            // replaceAll "\n" in text to ""
            // replace white spaces in text
            // assign to text variable
            text +=
                node.textContent
                    .trim()
                    .replaceAll("\n", "")
                    .replace(/\s+/g, " ") + " ";
        } else if (node.nodeType === 1) {
            // call recursion function to handle node
            text += getText(node);
        }
    }
    // return result
    return text;
}

// this function to get html from body
function getHtml(body) {
    // using innerHTML to get html from body
    const html = body.innerHTML;
    // return result
    return html;
}
async function crawData(url) {
    // using try catch to handle exception
    try {
        // using await to get body object form fetchData()
        const body = await getBody(url);
        // links from getLinks()
        // let get a link with type param
        let links = getLinks(body, url);
        // get text from getText()
        let text = getText(body);
        // get html from getHtml()
        let html = getHtml(body);

        return { links: links, text: text, html: html };
    } catch (error) {
        throw error;
    }
}

module.exports = {
    crawData,
};
