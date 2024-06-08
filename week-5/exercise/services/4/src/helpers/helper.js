function handleParamsUrl(urls){
    const res = urls.map((url) => [url.url, url.title, url.description,  url.text, url.html, new Date()]);
    return res;
}

function handleParamsChildUrl(urls){
    const res = urls.map(url => ({ url, time : new Date() }));
    return res;
}

function handleParamsTaskUrl(taskId, urls) {
    const res = urls.map((url) => [taskId, url.id]);
    return res;
}

function handleParamsTaskUrlNoUrlId(taskId, insertId, affectedRows) {
    let res = [];

    for(let i = insertId; i < affectedRows + insertId ; i++) {
        res.push([taskId, i]);
    }
    return res;
}


function filterUrlCrawl(urls){
    let crawledUrls = [];
    let noCrawledUrls = [];
    for (const url of urls) {
        if(url.isCrawled) {
            crawledUrls.push(url);
        } else {
            noCrawledUrls.push(url);
        }
    }
    return {crawledUrls, noCrawledUrls};
}

function handleParamUrlToElastic(id ,urls) {
    let result = [];
    urls.forEach((url) => {
        result.push({urlId : id, urlString : url.url});
        id++;
    });

    return result;
}

module.exports = {
    filterUrlCrawl,
    handleParamsTaskUrl,
    handleParamsUrl,
    handleParamUrlToElastic,
    handleParamsChildUrl,
    handleParamsTaskUrlNoUrlId
}