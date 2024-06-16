class ObjHelper {
    static copy(obj) {
        return JSON.parse(JSON.stringify(obj));
    }
    static filterChildUrls(parentObj) {
        const res = parentObj.urlCrawled.childUrls.map(url => ({taskId : parentObj.taskId, urlCrawled : {urlString : url, level : parentObj.urlCrawled.level+1}}));
        return res;
    }
}

module.exports = ObjHelper;