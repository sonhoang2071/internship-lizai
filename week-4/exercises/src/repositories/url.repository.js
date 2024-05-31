const db = require("../database");

async function create(params) {
    const sql = `INSERT INTO url (url_id) VALUES ?`;
    const response = await db.query(sql, [params]);
    return response;
}

async function updateInfo(urlId, params) {
    const { title, description, text, html } = params;
    const sql = `UPDATE url SET title = ?, description = ?, text = ?, html = ?, is_crawled = 1 WHERE url_id = '${urlId}'`;
    const response = await db.query(sql, [title, description, text, html]);
    return response;
}

async function existed(urlId) {
    const sql = `SELECT url_id from url WHERE url_id = '${urlId}'`;
    const response = await db.query(sql);
    return response.length > 0;
}

async function createUrlWithParentId(params) {
    const sql = `INSERT INTO url (url_id, parent_id) VALUES ?`;
    const response = await db.query(sql, [params]);
    return response;
}

module.exports = {
    create,
    updateInfo,
    existed,
    createUrlWithParentId,
};

