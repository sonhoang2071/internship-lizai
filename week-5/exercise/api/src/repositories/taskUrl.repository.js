const DB = require('../database');

class TaskUrlRepository {
    static async getTaskUrl(taskId, page, pageSize) {
        const sql = `SELECT task_url.taskId, url.urlString, url.title, url.description, url.text, url.html, url.time from task_url INNER JOIN url ON task_url.urlId = url.urlId WHERE task_url.taskId = ${taskId} LIMIT ${pageSize} OFFSET ${
            (page - 1) * pageSize
        }`;
        const response = await DB.query(sql);
        return response;
    }
    static async getTotal(taskId) {
        const sql = `SELECT COUNT(*) AS total from task_url INNER JOIN url ON task_url.urlId = url.urlId WHERE task_url.taskId = ${taskId}`;
        const response = await DB.query(sql);
        return response[0].total;
    }
    static async  taskIsExisted(taskId) {
        const sql = `SELECT taskId FROM task WHERE taskId = '${taskId}'`;
        const response = await DB.query(sql);
        return response.length > 0;
    }
}

module.exports = TaskUrlRepository;



