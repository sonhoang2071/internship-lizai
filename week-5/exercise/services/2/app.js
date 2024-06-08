const amqp = require('amqplib/callback_api');

const CrawlService = require("./src/services/crawl.service");
const url = require("node:url");

const receiveQueue = 'sites';
const sendQueue = "urls"
const connectUrl = "amqps://brtpelif:tG6ITlxwt6iYREK_1-u_D0ZBvmayWRrq@armadillo.rmq.cloudamqp.com/brtpelif";

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
        await channel.assertQueue(sendQueue, { durable: false });


        // Nhận tin nhắn từ hàng đợi "sites"
        channel.consume(receiveQueue, async (msg) => {
            if (msg !== null) {
                let messageObj = JSON.parse(msg.content.toString());

                // tiến hàng crawl các url từ searchUrl với keyword
                let data  =  await CrawlService.crawlUrl(messageObj.url, messageObj.keyword);

                // khởi tạo một obj với kết quả là các url đã crawled
                let crawledUrls = data.map(e => ({ url : e }));

                // cập nhật các url đã crawled cho message
                messageObj.crawledUrls = crawledUrls;

                // gửi message qua cho service 3
                await channel.sendToQueue(sendQueue, Buffer.from(JSON.stringify(messageObj)));
                console.log(` [x] Sending processed message`);

                channel.ack(msg);
            }
        }, { noAck: false });

    } catch (error) {
        throw error;
    }
});






