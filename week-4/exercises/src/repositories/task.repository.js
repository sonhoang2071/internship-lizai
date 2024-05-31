const db = require("../database");

async function create(taskId, searchUrl) {
    const sql = `INSERT INTO task (task_id, search_url) VALUES('${taskId}', '${searchUrl}')`;
    const response = await db.query(sql);
    return response.affectedRows;
}

module.exports = {
    create,
};


