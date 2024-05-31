const puppeteer = require("puppeteer");
const db = require("../database");
const { handleParams, handleTaskUrlParams } = require("../helpers/db.helper");
const urlRepository = require("../repositories/url.repository");
const taskUrlRepository = require("../repositories/task_url.repository");
async function crawlUrlFromSearchUrl(url) {
    const browser = await puppeteer.launch({
        executablePath: "/usr/bin/chromium-browser",
    });
    const page = await browser.newPage();

    // Go to the FDA website
    await page.goto(url);

    // Perform the search
    await page.type('input[id="search-query"]', "obesity");
    await page.keyboard.press("Enter");
    await page.waitForNavigation();

    const startTime = Date.now();
    const timeLimit = 1000 * 60 * 5; // 5 minutes in milliseconds
    let currentPage = 0;
    let urls = [];

    while (Date.now() - startTime < timeLimit) {
        // Check if there is a next page
        const nextPageExists = (await page.$('a[rel="next"]')) !== null;
        const newUrls = await page.$$eval("a[href]", (links) =>
            links.map((link) => link.href)
        );

        urls = urls.concat(newUrls);
        if (nextPageExists) {
            // Go to the next page
            await Promise.all([
                page.click('a[rel="next"]'),
                page.waitForNavigation(),
            ]);
            currentPage++;
        } else {
            break;
        }
    }
    await browser.close();

    // verify các url lấy được
    const verifiedUrls = [];
    for (const url of urls) {
        if (!verifiedUrls.includes(url)) {
            if (await verifyUrl(url)) {
                verifiedUrls.push(url);
            }
        }
    }

    return verifiedUrls;
}

// dùng puppeteer để mở url ra check url có tồn tại hay không
const verifyUrl = async (url) => {
    const browser = await puppeteer.launch({
        executablePath: "/usr/bin/chromium-browser",
    });
    const page = await browser.newPage();
    try {
        await page.goto(url, {
            waitUntil: "load",
            timeout: 2000,
        });
        await browser.close();
        return true;
    } catch (error) {
        await browser.close();
        return false;
    }
};

async function filterUrlExisted(urls) {
    const sql = `SELECT * FROM url WHERE url_id IN ?`;
    const results = await db.query(sql, [[urls]]);
    const existedUrls = results.map((result) => result.url_id);
    const notExistedUrls = urls.filter((url) => !existedUrls.includes(url));
    return { existedUrls, notExistedUrls };
}

async function crawlInfoOfUrl(urlId) {
    const browser = await puppeteer.launch({
        executablePath: "/usr/bin/chromium-browser",
    });
    const page = await browser.newPage();
    await page.goto(urlId);
    const title = await page.title();
    const description = await page
        .$eval('meta[name="description"]', (element) => element.content)
        .catch(() => null);
    const html = await page.evaluate(() => document.body.innerHTML);
    const text = await page.evaluate(() => document.body.innerText);
    const crawlUrl = await page.$$eval("a[href]", (links) =>
        links.map((link) => link.href)
    );
    await browser.close();

    // verify các url con lấy được
    const childUrls = [];
    for (const e of crawlUrl) {
        if (!childUrls.includes(e)) {
            if (await verifyUrl(e)) {
                childUrls.push(e);
            }
        }
    }

    return { title, description, html, text, childUrls };
}

async function handleUrlUnCrawled(taskId, urls) {
    // duyệt qua các url
    for (const url of urls) {
        // crawl thông tin của url đó
        const infos = await crawlInfoOfUrl(url);
        // update thông tin của url đó
        await urlRepository.updateInfo(url, infos);
        // lấy ra các url con
        const childUrls = infos.childUrls;
        const newUrl = [];
        // filter các url con đã tồn tại
        for (const e of childUrls) {
            if (!(await urlRepository.existed(e))) {
                newUrl.push(e);
            }
        }
        const values = newUrl.map((e) => [e, url]);
        // create các url con với parentId
        await urlRepository.createUrlWithParentId(values);
        // tạo dữ liệu trung gian cho các url con với taskId hiện tại
        await taskUrlRepository.create(handleTaskUrlParams(taskId, newUrl));
    }
}

async function checkUrlCrawled(urls) {
    const urlIsCrawled = [];
    const urlUnCrawled = [];
    urls.forEach((url) => {
        if (url.is_crawled) {
            urlIsCrawled.push(url.url_id);
        } else {
            urlUnCrawled.push(url.url_id);
        }
    });
    return { urlIsCrawled, urlUnCrawled };
}


module.exports = {
    crawlUrlFromSearchUrl,
    filterUrlExisted,
    crawlInfoOfUrl,
    checkUrlCrawled,
    handleUrlUnCrawled,
};
