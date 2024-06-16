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

    static async createTask(taskId, status) {
        try {
            const response = await client.index({
                index: "task",
                body: {
                    taskId : taskId,
                    status : status
                }
            });
            return response;
        } catch (error) {
            console.error('Error connecting to Elasticsearch:', error);
        }
    }

}

module.exports = ElasticsearchService;

