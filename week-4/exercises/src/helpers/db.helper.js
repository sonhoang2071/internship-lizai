function getOffset(currentPage = 1, listPerPage) {
    return (currentPage - 1) * [listPerPage];
}

function handleRows(rows) {
    if (!rows) {
        return [];
    }
    return rows;
}

function handleParams(params) {
    const res = params.map((param) => [param]);
    return res;
}

function handleTaskUrlParams(taskId, urls) {
    const res = urls.map((url) => [taskId, url]);
    return res;
}


function parseArrayObjectUrl(urls) {
    return urls.map((e) => e.url_id);
}

module.exports = {
    getOffset,
    handleRows,
    handleParams,
    handleTaskUrlParams,
    parseArrayObjectUrl,
};
