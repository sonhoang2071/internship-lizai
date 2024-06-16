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
});

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

    static async updateStatusTask(taskId, newStatus){
        try {
            const data = await ElasticsearchService.findTask(taskId);
            const _id = data[0]._id;
            // Thực hiện update bằng cách sử dụng client.update()
            const response = await client.update({
                index: 'task',
                id: _id,
                body: {
                    doc: {
                        status: newStatus
                    }
                }
            });
            return response;
        } catch (error) {
            console.error('Error updating task status:', error);
        }
    }
}

module.exports = ElasticsearchService;


