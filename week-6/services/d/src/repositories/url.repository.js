const DB = require("../database");

class UrlRepository {
    static async create(params) {
        const sql = `INSERT INTO url (urlString, level, title, description, text, html, time) VALUES ?`;
        const response = await DB.query(sql, [params]);
        return response;
    }
}

module.exports = UrlRepository;