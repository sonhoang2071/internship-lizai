const config = {
    db: {
        /* don't expose password or any sensitive info, done only for demo */
        host: "localhost",
        user: "root",
        password: "password",
        database: "crawl",
        port: 3306,
        waitForConnections: true,
        connectionLimit: 10, // Số lượng kết nối tối đa trong pool
        queueLimit: 0,
    },
};
module.exports = config;
