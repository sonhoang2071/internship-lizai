const fs = require("fs");
const path = require("path");

// B1: get information from url
async function getUrlInfo(urlString) {
    // create URL obj from url string
    try {
        const parsedUrl = new URL(urlString);
        // get path name to get filename and ext
        const pathname = parsedUrl.pathname;
        // get info from url
        const urlInfo = {
            protocol: parsedUrl.protocol || null,
            host: parsedUrl.host || null,
            hostname: parsedUrl.hostname || null,
            pathname: pathname || null,
            port: parsedUrl.port || null,
            search: parsedUrl.search || null,
            href: parsedUrl.href || null,
            origin: parsedUrl.origin || null,
            hash: parsedUrl.hash || null,
        };
        // check content-type of url
        await checkContentType(parsedUrl, urlInfo);

        // get search params of url
        getSearchParams(parsedUrl, urlInfo);
        // return result
        return urlInfo;
    } catch (error) {
        throw Error(error);
    }
}

async function checkContentType(url, urlInfo) {
    // get content-type of url
    const contentType = (await fetch(url.href)).headers.get("content-type");

    // check if different text/html
    if (!contentType.includes("text/html")) {
        // get filename and extension
        const filename = path.basename(url.pathname);
        const extension = path.extname(filename);
        urlInfo.filename = filename;
        urlInfo.extension = extension;
    }
}
function getSearchParams(url, urlInfo) {
    // check search difference null
    if (urlInfo.search !== null) {
        const params = [];
        // get array contain param
        url.searchParams.forEach((value, key) => {
            params.push({ key: key, value: value });
        });
        urlInfo.searchParams = params;
    }
}

// B2: save info to file json
function writeInfoToFile(info, filename) {
    // convert object js to json
    const data = JSON.stringify(info, null, 2);
    // write json file
    fs.writeFile(filename, data, "utf-8", (err) => {
        // check error happen
        if (err) {
            throw Error(err);
        }
    });
}

// B3: read info json file and display
function readInfoFromFile(filename) {
    // read json file
    fs.readFile(filename, "utf-8", (err, data) => {
        // check error happen
        if (err) {
            throw Error(err);
        }
        // parse json to object js
        const info = JSON.parse(data);
        // display info
        console.log(info);
    });
}

// get url info
async function resolve(url) {
    try {
        const info = await getUrlInfo(url);
        // write file
        writeInfoToFile(info, "infos.json");
        // read file
        readInfoFromFile("infos.json");

        return info;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    resolve,
};
