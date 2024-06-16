const puppeteer = require("puppeteer");

const CrawlFactory = require("../factories/crawl.factory")

class CrawlService {
    static async crawl(obj) {
        const urlCrawled = obj.urlCrawled.urlString;
        // tiến hành crawl thông tin với url chưa tồn tại
        const browser = await puppeteer.launch({
            executablePath: '/usr/bin/chromium',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        })

        try {


            const page = await browser.newPage();

            await page.goto(urlCrawled);
            // sử dụng factory method
            // lấy title
            const title = await CrawlFactory.get(page, "title");

            // lấy description
            const description = await CrawlFactory.get(page, "description");

            // lấy html
            const html = await CrawlFactory.get(page, "html");

            // lấy text
            const text = await CrawlFactory.get(page, "text");

            const hrefs = await CrawlFactory.get(page, "href");

            const srcs = await CrawlFactory.get(page, "src");

            const childUrls = [...hrefs, ...srcs];

            obj.urlCrawled.title = title;
            obj.urlCrawled.description = description;
            obj.urlCrawled.html = html;
            obj.urlCrawled.text = text;
            obj.urlCrawled.childUrls = childUrls;

            await browser.close();
            return true;
        }
        catch(e) {
            await browser.close();
            console.log(obj.urlCrawled.urlString);
            console.log(e);
            return false
        }



    }
}

module.exports = CrawlService;