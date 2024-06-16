const { Client } = require('@elastic/elasticsearch');
const http = require("node:http");

const client = new Client({
    node: 'https://36ed2d03f72044919e3e4c0baaab6a06.us-east-2.aws.elastic-cloud.com:443', // Elasticsearch endpoint
    auth: {
        apiKey: { // API key ID and secret
            id: 'CSVy948B5FQT3iCqbYjl',
            api_key: 'O_QF5eG5QtGHuCl3NiPrtA',
        }
    }
})

class ElasticsearchService {

    // lấy ra các url khớp với urlString
    static async findUrl(urlString) {

        try {
            const response = await client.search({
                index: "url",
                body: {
                    query: {
                        match: {urlString: urlString}
                    }
                }
            });
            return response.hits.hits;
        } catch (error) {
            console.error('Error connecting to Elasticsearch:', error);
        }
    }

    static async createUrl(urlString, taskId, level) {
        try {
            const response = await client.index({
                index: "url",
                body: {
                    urlString : urlString,
                    taskId : taskId,
                    level : level
                }
            });
            return response;
        } catch (error) {
            console.error('Error connecting to Elasticsearch:', error);
        }
    }

    static async checkUrlExisted(urlString) {
        const checkUrlElastic = await ElasticsearchService.findUrl(urlString);
        return checkUrlElastic.length > 0 && checkUrlElastic[0]._source.urlString === urlString;
    }

    static async checkTaskRunning(taskId) {
        const response = await ElasticsearchService.findTask(taskId);
        const task = response[0]._source;
        return task.status === "running" ? true : false;
    }

    static async checkTaskDeleted(taskId) {
        const response = await ElasticsearchService.findTask(taskId);
        const task = response[0]._source;
        return task.status === "deleted" ? true : false;
    }

    static async findTask(taskId) {
        try {
            const response = await client.search({
                index: "task",
                body: {
                    query: {
                        match: {taskId: taskId}
                    }
                }
            });
            return response.hits.hits;
        } catch (error) {
            console.error('Error connecting to Elasticsearch:', error);
        }
    }
    static async checkCurrentTaskOfUrl(urlString, taskId) {
        const url = await ElasticsearchService.findUrl(urlString);
        return url.length > 0 && url[0]._source.taskId === taskId;
    }
}

module.exports = ElasticsearchService;



