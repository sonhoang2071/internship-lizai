const amqp = require('amqplib/callback_api');

const receiveQueue = 'sites';
const sendQueue = "urls";
const stopQueue = "stop";
const connectUrl = "amqp://rabbitmq";

const CrawlService = require("./src/services/crawl.service");
const ElasticsearchService = require("./src/services/elasticsearch.service");

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
        await channel.assertQueue(stopQueue, { durable: false });


        // Nhận tin nhắn từ hàng đợi "sites"
        channel.consume(receiveQueue, async (msg) => {
            if (msg !== null) {
                let messageObj = JSON.parse(msg.content.toString());

                const data = await CrawlService.crawlUrl(messageObj);

                // await channel.sendToQueue(sendQueue, Buffer.from(JSON.stringify(data[0])));
                // console.log(data[0]);

                if( ! await ElasticsearchService.checkTaskDeleted(messageObj.taskId)) {
                    for (const e of data) {
                        if(await ElasticsearchService.checkTaskRunning(e.taskId)) {
                            await channel.sendToQueue(sendQueue, Buffer.from(JSON.stringify(e)));
                        } else {
                            await channel.sendToQueue(stopQueue, Buffer.from(JSON.stringify(e)));
                        }
                        console.log(e);
                    }
                    channel.ack(msg);
                } else {
                    channel.ack(msg);
                }

            }
        }, { noAck: false });

    } catch (error) {
        throw error;
    }
});





