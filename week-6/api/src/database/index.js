const mysql = require("mysql2/promise");
const config = require("./db.config");

class DB {
    static query = async function (sql, params) {
        const pool = mysql.createPool(config.db);
        const [results] = await pool.query(sql, params);
        await pool.end();
        return results;
    }
}

module.exports = DB;
