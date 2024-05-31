const url = require("../repositories/url.repository");

async function createUrl(urls) {
    const response = await url.create(urls);
    return response;
}

module.exports = {
    createUrl,
};


