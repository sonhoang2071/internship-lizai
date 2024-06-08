const DB = require("../database");

class TaskRepository  {
    static async create(taskId, searchUrl, keyword) {
        const sql = `INSERT INTO task (taskId, searchUrl, keyword) VALUES('${taskId}', '${searchUrl}', '${keyword}')`;
        const response = await DB.query(sql);
        return response
    }

    static  async existed(taskId) {
        const sql = `SELECT task_id FROM task WHERE task_id = '${taskId}'`;
        const response = await db.query(sql);
        return response.length > 0;
    }
}



module.exports = TaskRepository;