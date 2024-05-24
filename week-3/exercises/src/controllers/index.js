const { crawData } = require("../services/ex1");
const { resolve } = require("../services/ex2");

const ex1 = async (req, res, next) => {
    try {
        const { url } = req.body;

        const data = await crawData(url);
        return res.status(200).json({
            status: true,
            data: data,
        });
    } catch (error) {
        next(error);
    }
};
const ex2 = async (req, res, next) => {
    try {
        const { url } = req.body;

        const info = await resolve(url);
        return res.status(200).json({
            info: info,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    ex1,
    ex2,
};
