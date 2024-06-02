const db = require("../database");

async function create(taskId, searchUrl) {
    const sql = `INSERT INTO task (task_id, search_url) VALUES('${taskId}', '${searchUrl}')`;
    const response = await db.query(sql);
    return response.affectedRows;
}

async function existed(taskId) {
    const sql = `SELECT task_id FROM task WHERE task_id = '${taskId}'`;
    const response = await db.query(sql);
    return response.length > 0;
}

module.exports = {
    create,
    existed
};


