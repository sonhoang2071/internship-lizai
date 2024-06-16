const UrlHelper = require('../helpers/url.helper');


class CrawlFactory {
    static async get(page, type){
        let res;
        if(type === "title"){
            res = CrawlTitle.craw(page);
        } else if(type === "description"){
            res = CrawlDescription.craw(page);
        } else if(type === "text"){
            res = CrawlText.craw(page);
        } else if(type === "html"){
            res = CrawlHtml.craw(page);
        } else if(type === "href"){
            res = CrawlHref.craw(page);
        } else if(type === "src"){
            res = CrawlSrc.craw(page);
        }
        return res;
    }
}

class CrawlHtml {

    static async craw(page) {
        const response = await page.evaluate(() => document.body.innerHTML);
        return response || null;
    }
}

class CrawlText {

    static async craw(page) {
        const response = await page.evaluate(() => document.body.innerText);
        return response || null;
    }
}

class CrawlTitle {

    static async craw(page) {
        const response = await page.evaluate(() => document.querySelector("title").text);
        return response || null;
    }
}

class CrawlDescription {

    static async craw(page) {
        const response = await page.$('meta[name="description"]');
        return response ? response.content : null;
    }
}

class CrawlHref {

    static async craw(page) {
        let hrefs = await page.$$eval("body a[href]", (links) =>
            links.map((link) => link.href)
        );
        let newHrefs = Array.from(new Set(hrefs));
        newHrefs = newHrefs.filter((href) => UrlHelper.isValid(href));
        return newHrefs || [];
    }
}

class CrawlSrc {

    static async craw(page) {
        let srcs = await page.$$eval("body src", (links) =>
            links.filter((el) => el.tagName.toLowerCase() !== "script")
        );
        srcs = srcs.map(e => e.src);
        let newSrcs = Array.from(new Set(srcs));
        newSrcs = newSrcs.filter((src) => UrlHelper.isValid(src));
        return newSrcs || [];
    }
}

module.exports = CrawlFactory;