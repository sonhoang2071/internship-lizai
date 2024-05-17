const fs = require("fs");
const url = require("url");
const path = require("path");

// B1: get information from url
function getUrlInfo(urlString) {
    // create URL obj from url string
    try {
        const parsedUrl = new URL(urlString);
        // get path name to get filename and ext
        const pathname = parsedUrl.pathname;
        const filename = path.basename(pathname);
        const extension = path.extname(filename);

        // get info from url
        const urlInfo = {
            protocol: parsedUrl.protocol || null,
            host: parsedUrl.host || null,
            hostname: parsedUrl.hostname || null,
            pathname: pathname || null,
            searchParams: parsedUrl.search || null,
            filename: filename || null,
            extension: extension || null,
            href: parsedUrl.href || null,
            origin: parsedUrl.origin || null,
            port: parsedUrl.port || null,
            search: parsedUrl.search || null,
            hash: parsedUrl.hash || null,
        };
        // return result
        return urlInfo;
    } catch (error) {
        throw Error(error);
    }
}

// B2: save info to file json
function writeUrlInfoToFile(urlInfo, filename) {
    // convert object js to json
    const data = JSON.stringify(urlInfo, null, 2);
    // write json file
    fs.writeFile(filename, data, "utf-8", (err) => {
        // check error happen
        if (err) {
            throw Error(err);
        }
    });
}

// B3: read info json file and display
function readUrlInfoFromFile(filename) {
    // read json file
    fs.readFile(filename, "utf-8", (err, data) => {
        // check error happen
        if (err) {
            throw Error(err);
        }
        // parse json to object js
        const urlInfo = JSON.parse(data);
        // display info
        console.log(urlInfo);
    });
}

// get url info
function resolve(url) {
    try {
        const urlInfo = getUrlInfo(urlString);
        // write file
        writeUrlInfoToFile(urlInfo, "infos.json");
        // read file
        readUrlInfoFromFile("infos.json");
    } catch (error) {
        console.log(error);
    }
}
const urlString =
    "https://www.sonhoang.com:2071/page/info.html?name=son&age=21#salary";
resolve(urlString);
// {
//     protocol: 'https:',
//     host: 'www.sonhoang.com:2071',
//     hostname: 'www.sonhoang.com',
//     pathname: '/page/info.html',
//     searchParams: '?name=son&age=21',
//     filename: 'info.html',
//     extension: '.html',
//     href: 'https://www.sonhoang.com:2071/page/info.html?name=son&age=21#salary',
//     origin: 'https://www.sonhoang.com:2071',
//     port: '2071',
//     search: '?name=son&age=21',
//     hash: '#salary'
// }
