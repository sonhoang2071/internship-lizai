const TaskService = require("../services/task.service");

class TaskController {
    static async start(req, res, next) {
        try {
            const {taskId, searchUrl, keyword} = req.body;
            await TaskService.start(taskId);

            return res.status(200).json({
                status: 'true',
                message: `Task ${taskId} started successfully`,
            });
        } catch (e) {
            next(e);
        }
    }

    static async stop(req, res, next) {
        try {
            const {taskId} = req.body;

            await TaskService.stop(taskId);

            return res.status(200).json({
                status: 'true',
                message: `Task ${taskId} stopped successfully`,
            });
        } catch (e) {
            next(e);
        }
    }

    static async restart(req, res, next) {
        try {
            const {taskId} = req.body;
            await TaskService.restart(taskId);

            return res.status(200).json({
                status: 'true',
                message: `Task ${taskId} restarted successfully`,
            });
        } catch (e) {
            next(e);
        }
    }

    static async delete(req, res, next) {
        try {
            const {taskId} = req.body;

            await TaskService.delete(taskId);

            return res.status(200).json({
                status: 'true',
                message: `Task ${taskId} delete successfully`,
            });
        } catch (e) {
            next(e);
        }
    }

    static async showData(req, res, next) {
        try {
            const { taskId, page, pageSize } = req.body;
            const { data, totalCount } = await TaskService.show(taskId, page, pageSize);
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

module.exports = TaskController;