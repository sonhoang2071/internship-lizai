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


    static async createUrl(urls) {
        try {
            const operations = urls.flatMap(doc => [{ index: { _index: 'url' } }, doc]);
            const bulkResponse = await client.bulk({ refresh: true, operations })
            return bulkResponse;
        } catch (error) {
            console.error('Error connecting to Elasticsearch:', error);
        }
    }

}


// ElaticsearchService.createUrl([{urlId : 99, urlString : "hehe"}, {urlId : 100, urlString: "hoho"}]).then(e => console.log(e));
// ElaticsearchService.findAllUrl().then(e => console.log(e));
// ElaticsearchService.findUrl("https://www.cdc.gov/diabetes/about/").then(e => console.log(e));

module.exports = ElaticsearchService;

