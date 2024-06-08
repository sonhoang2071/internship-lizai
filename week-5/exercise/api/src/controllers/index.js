const Service = require('../services');

class ExerciseControllers {
    static async callApi(req, res, next) {
        try {
            const { taskId, page, pageSize } = req.body;
            const { data, totalCount } = await Service.getUrlsByTaskId(taskId, page, pageSize);
            return res.status(200).json({
                status: 'true',
                data : {
                    list : data,
                    totalCount,
                    pageSize
                }
            })
        } catch (e) {
            next(e);
        }
    }
}

module.exports = ExerciseControllers;