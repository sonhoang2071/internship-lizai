const UrlRepository = require("../repositories/url.repository");

class UrlServices {
    static async create(obj) {
        const urlString = obj.urlCrawled.urlString;
        const level = obj.urlCrawled.level;
        const title = obj.urlCrawled.title || null;
        const description = obj.urlCrawled.description || null;
        const text = obj.urlCrawled.text || null;
        const html = obj.urlCrawled.html || null;
        const time = new Date();

        const data = [urlString, level, title, description, text, html, time];

        const res = await UrlRepository.create([data]);

        return res;

    }
}

module.exports = UrlServices;