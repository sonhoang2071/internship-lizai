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
// this function to check url valid
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

// get body
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

// check url is existed
async function urlExists(url) {
    try {
        const response = await fetch(url, { method: "HEAD" });
        return response.ok;
    } catch (err) {
        return false;
    }
}

// filter script element
function filterScriptTag(links) {
    const newLinks = links.filter(
        (el) => el.tagName.toLowerCase() !== "script"
    );
    return newLinks;
}

// handle link data after filter
async function handleData(arr, baseUrl, type) {
    const result = [];
    // loop all elements
    for (const e of arr) {
        let tmp = new URL(e[type], baseUrl);
        console.log(tmp.href);
        // check url is valid
        const check = await urlExists(tmp.href);
        // check link is contained in result
        if (!result.includes(tmp.href) && check) {
            result.push(tmp.href);
        }
    }
    return result;
}
// handle link
async function handleLink(body, baseUrl, type) {
    // get links with type and filter them
    let arr = Array.from(body.querySelectorAll(`[${type}]`));
    // using this method to filter script element
    if (type == "src") {
        arr = filterScriptTag(arr);
    }
    // handle array links after filter
    const result = await handleData(arr, baseUrl, type);
    return result;
}

// this function to get link
function getLink(body, url) {
    this.body = body;
    this.url = url;
    this.craw = async function () {
        // using try catch to handle exception
        try {
            // links from getLinks()
            // let get a link with type param
            let href = await handleLink(body, url, "href");
            let src = await handleLink(body, url, "src");
            return [...href, ...src];
        } catch (error) {
            throw error;
        }
    };
}
//this function to get all text from body
function getText(body) {
    // init a text to contain all valid text
    this.body = body;
    this.craw = function () {
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
                text += new getText(node).craw();
            }
        }
        // return result

        return text;
    };
}

// this function to get html from body
function getHtml(body) {
    this.body = body;
    this.craw = function () {
        // using innerHTML to get html from body
        const html = body.innerHTML;
        // return result
        return html;
    };
}
// factory link
function getLinkFactory() {
    // factory method
    this.create = function (body, url) {
        return new getLink(body, url);
    };
}
// factory text
function getTextFactory() {
    // factory method
    this.create = function (body) {
        return new getText(body);
    };
}
// factory html
function getHtmlFactory() {
    // factory method
    this.create = function (body) {
        return new getHtml(body);
    };
}
async function crawData(url) {
    // using try catch to handle exception
    try {
        // using await to get body object form fetchData()
        const body = await getBody(url);
        // links from getLinks()
        // let get a link with type param
        let links = await new getLinkFactory().create(body, url).craw();
        // get text from getText()
        let text = new getTextFactory().create(body).craw();
        // get html from getHtml()
        let html = new getHtmlFactory().create(body).craw();

        return { links: links, text: text, html: html };
    } catch (error) {
        throw error;
    }
}

module.exports = {
    crawData,
};
