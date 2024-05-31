const db = require("../database");
const { handleParams, handleTaskUrlParams } = require("../helpers/db.helper");
async function create(params) {
    const sql = `INSERT INTO task_url (task_id, url_id) VALUES ?`;
    const response = await db.query(sql, [params]);
    return response;
}

async function getAllUrlsByTaskId(params, limit) {
    let sql;
    if (limit) {
        sql = `SELECT url.url_id, url.is_crawled from task_url INNER JOIN url ON task_url.url_id = url.url_id WHERE task_id = ? LIMIT ${limit}`;
    } else {
        sql = `SELECT url.url_id, url.is_crawled from task_url INNER JOIN url ON task_url.url_id = url.url_id WHERE task_id = ?`;
    }
    const response = await db.query(sql, [params]);
    return response;
}

async function getUrlsByTaskIdPagination(params, page, pageSize) {
    const sql = `SELECT task_url.task_id, url.url_id, url.title, url.description, url.text, url.html from task_url INNER JOIN url ON task_url.url_id = url.url_id WHERE task_id = ? LIMIT ${pageSize} OFFSET ${
        (page - 1) * pageSize
    }`;
    const response = await db.query(sql, [params]);
    return response;
}

async function urlIsCrawledByTask(task_id, url_id) {
    const sql = `SELECT * FROM task_url WHERE task_id = '${task_id}' and url_id = '${url_id}'`;
    const response = await db.query(sql);
    return response.length > 0;
}

module.exports = {
    create,
    getAllUrlsByTaskId,
    urlIsCrawledByTask,
    getUrlsByTaskIdPagination,
};

