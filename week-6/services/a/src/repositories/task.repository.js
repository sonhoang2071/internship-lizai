const DB = require('../database');

class TaskRepository {
    static async create(taskId, searchUrl, keyword) {
        const sql = `INSERT INTO task (taskId, searchUrl, keyword) VALUES('${taskId}', '${searchUrl}', '${keyword}')`;
        const response = await DB.query(sql);
        return response;
    }
}

module.exports = TaskRepository;