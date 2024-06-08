const { Client } = require('@elastic/elasticsearch');

const client = new Client({
    node: 'https://36ed2d03f72044919e3e4c0baaab6a06.us-east-2.aws.elastic-cloud.com:443', // Elasticsearch endpoint
    auth: {
        apiKey: { // API key ID and secret
            id: 'CSVy948B5FQT3iCqbYjl',
            api_key: 'O_QF5eG5QtGHuCl3NiPrtA',
        }
    }
})

class ElaticsearchService {

    // lấy ra các url khớp với urlString
    static async findUrl(urlString) {

        try {
            const response = await client.search({
                index: "url",
                body: {
                    query: {
                        match : {urlString : urlString}
                    }
                }
            });
            return response.hits.hits;
        } catch (error) {
            console.error('Error connecting to Elasticsearch:', error);
        }
    }

    static async createUrl(urlId, urlString) {
        try {
            const response = await client.index({
                index: "url",
                body: {
                    urlId : urlId,
                    urlString : urlString
                }
            });
            return response;
        } catch (error) {
            console.error('Error connecting to Elasticsearch:', error);
        }
    }
    static async delete() {
        try {
            await client.indices.delete({index: "url"});

        } catch (error) {
            console.error('Error connecting to Elasticsearch:', error);
        }
    }
}


// ElaticsearchService.createUrl(-1,"sonhoang207111").then(e => console.log(e));
//  // ElaticsearchService.delete().then(e => console.log(e));

module.exports = ElaticsearchService;

