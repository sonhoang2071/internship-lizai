// // const elasticsearch = require('elasticsearch')
// // const client = new elasticsearch.Client({
// //     host: 'localhost:9200'
// // });
//
// //check connect
// client.ping({
//         requestTimeout: 3000, //ms
//     },
//     (err, res, sta) => {
//         if(err){
//             return console.error(`Error connect:::`, err);
//         }
//         console.log(`isOkay::: connect`);
//     }
// )
//
// //create index
//
// client.indices.create({
//     index: 'player-index' //tao index như các db khác
// }, (err, res, sta) => {
//     console.log(`err, res, sta:::`, err, res, sta);
// })
//
// client.index({
//     index: "player-index",
//     id: 1,
//     type: 'player-list',
//     body: {
//         name: 'ronaldo', // tôi yêu Chị Bảy
//         age: 35,
//         club: 'MU'
//     }
// }, (err, res, sta) => {
//     console.log(`err, res, sta:::`, err, res, sta);
// })
//
// client.search({
//     index: 'player-index',
//     type: 'player-list',
//     body: {
//         query: {
//             match: {
//                 name: 'ronaldo'
//             }
//         }
//     }
// }, (err, res, sta) => {
//     // console.log(`err, res, sta:::`, err, res, sta);
//     console.log(res.hits.hits);
// })
//
// isOkay::: connect
//     [
//     {
//         _index: 'player-index',
//         _type: 'player-list',
//         _id: '1',
//         _score: 0.2876821,
//         _source: { name: 'ronaldo', age: 35, club: 'MU' }
//
//
//         let bulk = []
//
//         cities.forEach(city => {
//             bulk.push({
//                 index: {
//                     _index: 'city_index01', // index
//                     _type: 'city_list01' // type
//                 }
//             })
//             bulk.push(city)
//         });
//
//         client.bulk({
//             body: bulk
//         }, (err, res, sta) => {
//             console.log(`err, res, sta::`,cities.length);
//         })


//
// client.search({
//     index: 'gov',
//     type: 'constituencies',
//     body: {
//         query: {
//             match: { "constituencyname": "Harwich" }
//         },
//     }
// },function (error, response,status) {
//     if (error){
//         console.log("search error: "+error)
//     }
//     else {
//         console.log("--- Response ---");
//         console.log(response);
//         console.log("--- Hits ---");
//         response.hits.hits.forEach(function(hit){
//             console.log(hit);
//         })
//     }
// });


// Match Query: Tìm kiếm văn bản bằng cách sử dụng phân tích từ khóa.
//
// {
//     "query": {
//     "match": {
//         "field_name": "search_text"
//     }
// }
// }

// Term Query: Tìm kiếm chính xác từ khóa, không phân tích văn bản.
//
// {
//     "query": {
//     "term": {
//         "field_name": "exact_term"
//     }
// }
// }

// Truy vấn phức tạp
// Bool Query: Kết hợp nhiều truy vấn con với các toán tử must, should, must_not, và filter.
//
//
// {
//     "query": {
//     "bool": {
//         "must": [
//             { "match": { "field1": "value1" } },
//             { "range": { "field2": { "gte": 10, "lte": 20 } } }
//         ],
//             "filter": [
//             { "term": { "field3": "value3" } }
//         ],
//             "must_not": [
//             { "term": { "field4": "value4" } }
//         ],
//             "should": [
//             { "match": { "field5": "value5" } }
//         ]
//     }
// }
// }
// Nested Query: Truy vấn các tài liệu con trong một tài liệu chính.
//
//
// {
//     "query": {
//     "nested": {
//         "path": "nested_field",
//             "query": {
//             "bool": {
//                 "must": [
//                     { "match": { "nested_field.sub_field": "value" } }
//                 ]
//             }
//         }
//     }
// }
// }
// Aggregations: Tổng hợp dữ liệu để tính toán các số liệu thống kê.
//
//
// {
//     "aggs": {
//     "average_price": {
//         "avg": {
//             "field": "price"
//         }
//     }
// }
// }

// {
//     "query": {
//     "bool": {
//         "must": [
//             { "match": { "title": "Elasticsearch" } }
//         ],
//             "filter": [
//             { "term": { "status": "active" } }
//         ]
//     }
// }
// }