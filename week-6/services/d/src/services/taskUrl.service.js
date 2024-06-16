const TaskUrlRepository = require( "../repositories/taskUrl.repository");

class TaskUrlService {
    static async create(taskId, urlId) {
        // Cập nhật thông tin các url đã được với taskId mới cho bảng task_url
        const param = [taskId, urlId];
        const response = await TaskUrlRepository.createTaskUrl([param]);
        return response;
    }


}

module.exports = TaskUrlService;