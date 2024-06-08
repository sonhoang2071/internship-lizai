const puppeteer = require("puppeteer");

const UrlHelper = require("../helpers/url.helper");



class CrawlService {
    static async crawlUrl(searchUrl, keyword) {
        const browser = await puppeteer.launch({
            executablePath: "/usr/bin/chromium-browser",
        });
        const page = await browser.newPage();

        try {
           // Go to the  website
           await page.goto(searchUrl);

           const selector = `input[name="query"]`;
           await page.waitForSelector(selector);
           // Perform the search
           await page.$eval(selector, (searchInput, keyword) => {
               searchInput.value = keyword;
               searchInput.form.submit();
           }, keyword);

           await page.waitForNavigation();


           let currentPage = 1;
           let crawledUrls = [];

           while (currentPage <= 5) {
               // lấy trang tiếp theo
               const nextPageSelector = `.pagination .page-item a[data-page="${++currentPage}"]`;
               await page.waitForSelector(nextPageSelector);
               const nextPageExists = (await page.$(nextPageSelector)) !== null;

               // lấy ra các link của bài viết
               const tmpUrls = await page.$$eval(".result-url a[href]", (links) =>
                   links.map((link) => link.href)
               );

               crawledUrls = crawledUrls.concat(tmpUrls);

               // kiểm tra trang tiếp theo
               if (nextPageExists && currentPage <= 5) {
                   // đi dến trang tiếp theo
                   await Promise.all([
                       page.click(nextPageSelector),
                       page.waitForNavigation(),
                   ]);
               } else {
                   break;
               }
           }

           await browser.close();

           // verify các url lấy được
           const verifiedUrls = [];
           for (const url of crawledUrls) {
               // sử dụng helper và kiểm tra đã chứa
               if (!verifiedUrls.includes(url) && UrlHelper.isValid(url)) {
                   verifiedUrls.push(url);
               }
           }

           return verifiedUrls;
        } catch (e){
           throw e;
        }
    }
}

module.exports = CrawlService;