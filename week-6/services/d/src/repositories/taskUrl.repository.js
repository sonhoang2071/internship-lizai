const DB = require("../database");

class TaskUrlRepository {
    static async createTaskUrl(params) {
        const sql = `INSERT INTO task_url (taskId, urlId) VALUES ?`;
        const response = await DB.query(sql, [params]);
        return response;
    }
}

module.exports = TaskUrlRepository;