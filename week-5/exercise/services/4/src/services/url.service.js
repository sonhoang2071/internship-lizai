const {handleParamsUrl, handleParamUrlToElastic, handleParamsChildUrl} = require('../helpers/helper');
const UrlRepository = require('../repositories/url.repository');
const ElasticsearchService = require("../services/elasticsearch.service");
const TaskUrlService = require("../services/taskUrl.service");
class UrlService {
    static async create(taskId, urls) {
        // Tạo mới thông tin url vào bảng url
        const response1 = await UrlRepository.create(handleParamsUrl(urls));

        // Tạo mới thông tin bảng task_url
        // sử dụng insertId và affectedRows để tiến hành pool query update
        await TaskUrlService.createForNewUrl(taskId, response1.insertId, response1.affectedRows);

        // sử dụng Bulk để insert các url đã được crawled lên elasticsearch
        const response2 = await ElasticsearchService.createUrl(handleParamUrlToElastic(response1.insertId, urls));

        // lặp qua các url con và tiến hành cập nhật dữ liệu
        for(let url of urls) {
            // Tạo mới dữ liệu cho bảng url
            const response3 = await UrlRepository.create(handleParamsUrl(handleParamsChildUrl(url.childUrls)));

            // Tạo mới dữ lieệu cho bảng task_url
            await TaskUrlService.createForNewUrl(taskId, response3.insertId, response3.affectedRows);
        }

        return true;
    }
}

module.exports = UrlService;

// UrlService.create([
//     {url : "sonhoang"},
//     {url : "minhquan"}
// ]).then(e => console.log(e));