const puppeteer = require("puppeteer");

const CrawlFactory = require("../factories/crawl.factory");
const UrlHelper = require("../helpers/url.helper");

class CrawlService {
    static async crawlUrl(obj) {
        try {
            const browser = await puppeteer.launch({
                executablePath: '/usr/bin/chromium',
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            });
            const page = await browser.newPage();

            let res = await CrawlFactory.crawl(page, obj);

            await browser.close();

            const data = UrlHelper.handleObjUrlCrawled(obj, res.urls, 1);

            return data
        } catch (e) {
            throw e;
        }

    }
}

module.exports = CrawlService;