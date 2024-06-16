const { URL } = require('url');

class UrlHelper {
    static isValid(urlString){
        try {
            new URL(urlString);
            const regex = new RegExp(
                '^(https?:\\/\\/)?' + // giao thức
                '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // tên miền
                '((\\d{1,3}\\.){3}\\d{1,3})|' + // hoặc địa chỉ IP (v4)
                '\\[?[a-f\\d]*:[a-f\\d:]+\\]?)' + // hoặc địa chỉ IP (v6)
                '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // cổng và đường dẫn
                '(\\?[;&a-z\\d%_.~+=-]*)?' + // chuỗi truy vấn
                '(\\#[-a-z\\d_]*)?$', 'i'); // thẻ neo
            return regex.test(urlString);

        } catch (err) {
            return false;
        }
    }
    static handleObjUrlCrawled(obj, urls, level) {
        let res = [];
        for(const url of urls) {
            const tmp =JSON.parse(JSON.stringify(obj));
            tmp.urlCrawled = {urlString : url, level : level};
            res.push(tmp);
        }
        return res;
    }
}

module.exports = UrlHelper;
