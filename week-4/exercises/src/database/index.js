const mysql = require("mysql2/promise");
const config = require("../configs/db.config");

async function query(sql, params) {
    const pool = mysql.createPool(config.db);
    const [results] = await pool.query(sql, params);
    return results;
}

module.exports = {
    query,
};
