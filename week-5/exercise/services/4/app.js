const amqp = require('amqplib/callback_api');
const receiveQueue = 'data';
const connectUrl = "amqps://brtpelif:tG6ITlxwt6iYREK_1-u_D0ZBvmayWRrq@armadillo.rmq.cloudamqp.com/brtpelif";

const TaskRepository = require( "./src/repositories/task.repository" );
const { handleParamsCrawledUrl, filterUrlCrawl} = require('./src/helpers/helper');
const TaskUrlService = require( "./src/services/taskUrl.service");
const UrlService = require( "./src/services/url.service");

// Kết nối tới RabbitMQ server
amqp.connect(connectUrl, async (error0, connection) => {
    if (error0) {
        throw error0;
    }

    // Tạo một channel
    try {
        // Kết nối tới RabbitMQ server
        const channel = await connection.createChannel();


        // Đảm bảo rằng các hàng đợi tồn tại
        await channel.assertQueue(receiveQueue, { durable: false });



        // Nhận tin nhắn từ hàng đợi "sites"
        channel.consume(receiveQueue, async (msg) => {
            if (msg !== null) {
                let messageObj = JSON.parse(msg.content.toString());

                // tạo dữ liệu cho bảng task
                await TaskRepository.create(messageObj.taskId, messageObj.url, messageObj.keyword);

                // tiến hành filter các url đã được crawled trước đó và url mới được crawled
                const {crawledUrls, noCrawledUrls} = filterUrlCrawl(messageObj.crawledUrls);

                if(crawledUrls.length > 0) {
                    // cập nhật dữ liệu db cho các url đã được lưu trước đó
                    await TaskUrlService.create(messageObj.taskId, crawledUrls);
                }

                if(noCrawledUrls.length > 0) {
                    // cập nhật dữ liệu db cho các url mới được crawled
                    await UrlService.create(messageObj.taskId, noCrawledUrls);
                }

                console.log("Done");
                channel.ack(msg);
            }
        }, { noAck: false });

    } catch (error) {
        console.error('Error:', error);
    }
});
