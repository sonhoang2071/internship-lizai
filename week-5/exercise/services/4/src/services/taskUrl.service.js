const TaskUrlRepository = require( "../repositories/taskUrl.repository");
const { handleParamsTaskUrl, handleParamsTaskUrlNoUrlId } = require("../helpers/helper");
class TaskUrlService {
    static async create(taskId, crawledUrls) {
        // Cập nhật thông tin các url đã được với taskId mới cho bảng task_url
        const response = await TaskUrlRepository.createTaskUrl(handleParamsTaskUrl(taskId, crawledUrls));
        return response;
    }

    static async createForNewUrl(taskId, insertId,  affectedRows) {
        // Cập nhật thông tin cho các url mới được crawled cho bảng task_url
        const response = await TaskUrlRepository.createTaskUrl(handleParamsTaskUrlNoUrlId(taskId, insertId, affectedRows));
        return response;
    }
}

module.exports = TaskUrlService;