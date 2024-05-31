const task = require("../repositories/task.repository");

async function createTask(taskId, searchUrl) {
    const response = await task.create(taskId, searchUrl);
    return response;
}

module.exports = {
    createTask,
};
