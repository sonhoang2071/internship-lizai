const TaskUrlRepository = require("../repositories/taskUrl.repository");

class Services {
    static async getUrlsByTaskId(taskId, page, pageSize) {
        if(!await TaskUrlRepository.taskIsExisted(taskId)) {
            throw new Error(`TaskId ${taskId} is not existed`);
        }
        const data = await TaskUrlRepository.getTaskUrl(taskId, page, pageSize);
        const totalCount = await TaskUrlRepository.getTotal(taskId);
        return { data, totalCount };
    }

}

module.exports = Services;

