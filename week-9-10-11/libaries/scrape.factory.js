const UrlHelper = require('./helper');


class ScrapeFactory {
    static async get(page, type){
        let res;
        if(type === "title"){
            res = ScrapeTitle.craw(page);
        } else if(type === "description"){
            res = ScrapeDescription.craw(page);
        } else if(type === "text"){
            res = ScrapeText.craw(page);
        } else if(type === "html"){
            res = ScrapeHtml.craw(page);
        } else if(type === "href"){
            res = ScrapeHref.craw(page);
        } else if(type === "src"){
            res = ScrapeSrc.craw(page);
        }
        return res;
    }
}

class ScrapeHtml {

    static async craw(page) {
        const response = await page.evaluate(() => document.body.innerHTML);
        return response || null;
    }
}

class ScrapeText {

    static async craw(page) {
        const response = await page.evaluate(() => document.body.innerText);
        return response || null;
    }
}

class ScrapeTitle {

    static async craw(page) {
        const response = await page.evaluate(() => document.querySelector("title").text);
        return response || null;
    }
}

class ScrapeDescription {

    static async craw(page) {
        const response = await page.$('meta[name="description"]');
        return response ? response.content : null;
    }
}

class ScrapeHref {

    static async craw(page) {
        let hrefs = await page.$$eval("body a[href]", (links) =>
            links.map((link) => link.href)
        );
        let newHrefs = Array.from(new Set(hrefs));
        newHrefs = newHrefs.filter((href) => UrlHelper.isValid(href));
        return newHrefs || [];
    }
}

class ScrapeSrc {

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

module.exports = ScrapeFactory;