const amqp = require('amqplib/callback_api');
const receiveQueue = 'urls';
const sendQueue = "data"
const connectUrl = "amqps://brtpelif:tG6ITlxwt6iYREK_1-u_D0ZBvmayWRrq@armadillo.rmq.cloudamqp.com/brtpelif";


const CrawlService = require("./src/services/crawl.service");

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
                let  newCrawledUrls = [];
                // lặp qua các url của crawledUrls và tiến hành crawled
                for (let url of messageObj.crawledUrls) {
                    // chỉ cập nhật đối với các url trả về true
                    if(await CrawlService.crawlUrl(url)) {
                        newCrawledUrls.push(url);
                    }
                }
                // Cập nhật lại các thông tin crawledUrls
                messageObj.crawledUrls = newCrawledUrls;

                // gửi message đến service 4
                await channel.sendToQueue(sendQueue, Buffer.from(JSON.stringify(messageObj)));
                console.log(` [x] Sending processed message`);
                channel.ack(msg);
            }
        }, { noAck: false });

    } catch (error) {
        console.error('Error:', error);
    }
});
