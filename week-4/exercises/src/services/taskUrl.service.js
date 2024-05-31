const taskUrl = require("../repositories/task_url.repository");

async function createTaskUrl(taskId, urlId) {
    const response = await taskUrl.create(taskId, urlId);
    return response;
}

module.exports = {
    createTaskUrl,
};
