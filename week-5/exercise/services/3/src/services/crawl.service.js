const puppeteer = require("puppeteer");

const UrlHelper = require("../helpers/url.helper");
const FactoryService = require("../services/factory.service");
const ElasticsearchService = require("../services/elasticsearch.service");

class CrawlService {
    static async crawlUrl(url) {
        // lấy ra các url đã tồn tại và khớp với url truyền vào
        const checkUrlElastic = await ElasticsearchService.findUrl(url.url);
        // kiểm tra với url có điểm cao nhất
        if (checkUrlElastic.length > 0 && checkUrlElastic[0]._source.urlString === url.url) {
            // tiến hành cập nhật thông tin
            // isCrawled : đánh dấu là url đã crawl
            // id : lưu id của url lại để ở serice 4 cập nhật vào table task_url
            url.isCrawled = true;
            url.id = checkUrlElastic[0]._source.urlId;
            return true;
        } else {
            // tiến hành crawl thông tin với url chưa tồn tại
            const browser = await puppeteer.launch({
                executablePath: "/usr/bin/chromium-browser",
            });
            const page = await browser.newPage();
            try {

                await page.goto(url.url, {
                    waitUntil: "load",
                    timeout: 5000,
                });
                // sử dụng factory method
                // lấy title
                const title = await FactoryService.get(page, "title");

                // lấy description
                const description = await FactoryService.get(page, "description");

                // lấy html
                const html = await FactoryService.get(page, "html");

                // lấy text
                const text = await FactoryService.get(page, "text");

                const hrefs = await FactoryService.get(page, "href");

                const srcs = await FactoryService.get(page, "src");

                const childUrls = [...hrefs, ...srcs];

                url.title = title;
                url.description = description;
                url.html = html;
                url.text = text;
                url.childUrls = childUrls;

                await browser.close();
                return true;
            }
            catch(e) {
                await browser.close();
                return false
            }
        }



    }



}

module.exports = CrawlService;