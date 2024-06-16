const config = {
    db: {
        /* don't expose password or any sensitive info, done only for demo */
        host: "db",
        user: "root",
        password: "password",
        database: "crawl",
        waitForConnections: true,
        queueLimit: 0,
    },
};
module.exports = config;