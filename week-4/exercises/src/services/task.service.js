const task = require("../repositories/task.repository");

async function createTask(taskId, searchUrl) {
    const response = await task.create(taskId, searchUrl);
    return response;
}

async function checkExisted(taskId) {
    const check = await task.existed(taskId);
    if (!check) {
        throw Error("Invalid TaskId");
    }
}

module.exports = {
    createTask,
    checkExisted
};
