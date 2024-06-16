const UrlHelper = require('../helpers/url.helper');
const ElasticsearchService = require('../services/elasticsearch.service');

class CrawlFactory {
    static async crawl(page, obj) {
        let res;
        if(obj.taskId === 1) {
            res = await CrawlTask1.run(page, obj)
        } else if(obj.taskId === 2) {
            res = await CrawlTask2.run(page, obj)
        } else if(obj.taskId === 3) {
            res = await CrawlTask3.run(page, obj)
        }
        return res;
    }
}

class CrawlTask1 {
    static async run(page, obj) {
        const {searchUrl, keyword, taskId} = obj;

        // Go to the  website
        await page.goto(searchUrl);

        const selector = `input[id="edit-keywords"]`;
        await page.waitForSelector(selector);

        await page.$eval(selector, (searchInput, keyword) => {
            searchInput.value = keyword;
            searchInput.form.submit();
        }, keyword);

        await page.waitForNavigation();


        const startTime = Date.now();
        const timeLimit = 1000; // 2 minutes in milliseconds
        let lastPage = 0;
        let urls = [];
        while (Date.now() - startTime < timeLimit) {

            if(!await ElasticsearchService.checkTaskRunning(taskId) || await ElasticsearchService.checkTaskDeleted(taskId)) {
                break;
            }

            const newUrls = await page.$$eval(".search-result__title a[href]", (links) =>
                links.map((link) => link.href)
            );
            urls = urls.concat(newUrls);
            const currentURL = await page.url();


            // Thêm hoặc thay đổi query parameters
            const urlObj = new URL(currentURL);
            urlObj.searchParams.set('page', `${lastPage + 1}`);

            const newURL = urlObj.toString();


            // đi dến trang tiếp theo
            await Promise.all([
                page.goto(newURL),
                page.waitForNavigation()
            ]);
            lastPage++;
        }

        // verify các url lấy được
        const verifiedUrls = [];
        for (const url of urls) {
            // sử dụng helper và kiểm tra đã chứa
            if (!verifiedUrls.includes(url) && UrlHelper.isValid(url)) {
                verifiedUrls.push(url);
            }
        }

        return {lastPage, urls : verifiedUrls};
    }
}

class CrawlTask2 {
    static async run(page, obj) {
        const {searchUrl, keyword, taskId} = obj;

        // Go to the  website
        await page.goto(searchUrl);

        const selector = `textarea[id="APjFqb"]`;

        await page.waitForSelector(selector);

        await page.$eval(selector, (searchInput, keyword) => {
            searchInput.value = keyword;
            searchInput.form.submit();
        }, keyword);

        await page.waitForNavigation();

        const startTime = Date.now();
        const timeLimit = 1000 ; // 2 minutes in milliseconds
        let lastPage = 1;
        let urls = [];
        while (Date.now() - startTime < timeLimit) {

            if(!await ElasticsearchService.checkTaskRunning(taskId) || await ElasticsearchService.checkTaskDeleted(taskId)) {
                break;
            }

            // lấy ra các link của bài viết
            const newUrls = await page.$$eval(`#search a[jsname="UWckNb"]`, (links) =>
                links.map((link) => link.href)
            );

            urls = urls.concat(newUrls);
            const currentURL = await page.url();

            // Thêm hoặc thay đổi query parameters
            const urlObj = new URL(currentURL);
            urlObj.searchParams.set('start', `${lastPage*10}`);

            const newURL = urlObj.toString();


            // đi dến trang tiếp theo
            await Promise.all([
                page.goto(newURL),
                page.waitForNavigation()
            ]);
            lastPage++;
        }

        // verify các url lấy được
        const verifiedUrls = [];
        for (const url of urls) {
            // sử dụng helper và kiểm tra đã chứa
            if (!verifiedUrls.includes(url) && UrlHelper.isValid(url)) {
                verifiedUrls.push(url);
            }
        }

        return {lastPage, urls : verifiedUrls};


    }
}

class CrawlTask3 {
    static async run(page, obj) {
        const {searchUrl, keyword, taskId} = obj;

        // Go to the  website
        await page.goto(searchUrl);

        const selector = `.header__search-desktop input[id="edit-query"]`;

        await page.$eval(selector, (searchInput, keyword) => {
            searchInput.value = keyword;
            searchInput.form.submit();
        }, keyword);

        await page.waitForNavigation();

        const startTime = Date.now();
        const timeLimit = 1000; // 2 minutes in milliseconds
        let lastPage = 0;
        let urls = [];
        while (Date.now() - startTime < timeLimit) {

            if(!await ElasticsearchService.checkTaskRunning(taskId) || await ElasticsearchService.checkTaskDeleted(taskId)) {
                break;
            }
            // lấy ra các link của bài viết
            const newUrls = await page.$$eval(`.search-result .search-result-title a[href]`, (links) =>
                links.map((link) => link.href)
            );

            urls = urls.concat(newUrls);
            const currentURL = await page.url();



            // Thêm hoặc thay đổi query parameters
            const urlObj = new URL(currentURL);
            urlObj.searchParams.set('page', `${lastPage+1}`);

            const newURL = urlObj.toString();

            // đi dến trang tiếp theo
            await Promise.all([
                page.goto(newURL),
                page.waitForNavigation()
            ]);
            lastPage++;
        }

        // verify các url lấy được
        const verifiedUrls = [];
        for (const url of urls) {
            // sử dụng helper và kiểm tra đã chứa
            if (!verifiedUrls.includes(url) && UrlHelper.isValid(url)) {
                verifiedUrls.push(url);
            }
        }

        return {lastPage, urls : verifiedUrls};
    }
}


module.exports = CrawlFactory;
