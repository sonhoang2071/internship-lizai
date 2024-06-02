const {
    crawlUrlFromSearchUrl,
    filterUrlExisted,
    crawlInfoOfUrl,
    checkUrlCrawled,
    handleUrlUnCrawled,
} = require("../services/craw.service");
const { createTask, checkExisted } = require("../services/task.service");
const { createUrl } = require("../services/url.service");
const { createTaskUrl } = require("../services/taskUrl.service");
const {
    handleParams,
    handleTaskUrlParams,
    parseArrayObjectUrl,
} = require("../helpers/db.helper");
const taskUrl = require("../repositories/task_url.repository");

const api1 = async (req, res, next) => {
    try {
        //lấy params value từ request
        const { taskId, searchUrl } = req.body;
        // tạo mới một task
        const data = await createTask(taskId, searchUrl);
        // tiến hành crawl các url của taskId đó với searchUrl
        const urlsCrawled = await crawlUrlFromSearchUrl(searchUrl);
        // kiểm tra các url crawl được đã tồn tại trong db hay chưa
        // const { notExistedUrls } = await filterUrlExisted(urlsCrawled);
        // // create các url crawl sau khi kiểm tra
        // await createUrl(handleParams(notExistedUrls));
        // // tạo dữ liệu trung gian cho taskId và các url đã crawl được
        // await taskUrl.create(handleTaskUrlParams(taskId, urlsCrawled));

        return res.status(200).json({
            status: true,
            message: "Successfully",
            data : urlsCrawled
        });
    } catch (error) {
        next(error);
    }
};

const api2 = async (req, res, next) => {
    try {
        // lấy params value từ request
        const { taskId, page, pageSize } = req.body;
        // check taskId có tồn tại hay không
        await checkExisted(taskId);
        // lấy ra các url của taskId truyền vào
        const urls = await taskUrl.getAllUrlsByTaskId(taskId);
        // lấy ra các url chưa được crawl
        const { urlIsCrawled, urlUnCrawled } = await checkUrlCrawled(urls);
        // tiến hành crawl các url chưa crawl thông tin
        await handleUrlUnCrawled(taskId, urlUnCrawled);
        const data = await taskUrl.getUrlsByTaskIdPagination(
            taskId,
            page,
            pageSize
        );

        return res.status(200).json({
            status: true,
            data: {
                list: data,
                totalCount: urls.length,
                pageSize: pageSize,
            },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    api1,
    api2,
};
