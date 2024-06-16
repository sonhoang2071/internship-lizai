const amqp = require('amqplib/callback_api');

const receiveQueue = "urls";
const sendQueue = "data";
const stopQueue = "stop";
const connectUrl = "amqp://rabbitmq";

const CrawlService = require("./src/services/crawl.service");
const ObjHelper = require("./src/helpers/obj.helper");
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

        channel.prefetch(1);
        // Đảm bảo rằng các hàng đợi tồn tại
        await channel.assertQueue(receiveQueue, { durable: false });
        await channel.assertQueue(sendQueue, { durable: false });
        await channel.assertQueue(stopQueue, { durable: false });


        // Nhận tin nhắn từ hàng đợi "sites"
        channel.consume(receiveQueue, async (msg) => {
            if (msg !== null) {
                let messageObj = JSON.parse(msg.content.toString());

                // console.log(`[x] Sent `);
                // console.log(messageObj);
                console.log(messageObj);
                if(! await ElasticsearchService.checkTaskDeleted(messageObj.taskId)) {
                    if(await ElasticsearchService.checkTaskRunning(messageObj.taskId)) {

                        if(!await ElasticsearchService.checkUrlExisted(messageObj.urlCrawled.urlString)) {

                            if(await CrawlService.crawl(messageObj)) {
                                await ElasticsearchService.createUrl(messageObj.urlCrawled.urlString, messageObj.taskId, messageObj.urlCrawled.level);

                                await channel.sendToQueue(sendQueue, Buffer.from(JSON.stringify(messageObj)));

                                if(messageObj.urlCrawled.level < 2) {
                                    const childUrls = ObjHelper.filterChildUrls(messageObj);

                                    for (const child of childUrls) {
                                        if(await ElasticsearchService.checkTaskRunning(child.taskId)) {

                                            // Có thể dẫn đến quá tải elasticsearch
                                            // Có thể thay bằng
                                            // await channel.sendToQueue(receiveQueue, Buffer.from(JSON.stringify(child)));

                                            if(!await ElasticsearchService.checkUrlExisted(child.urlCrawled.urlString)) {
                                                await channel.sendToQueue(receiveQueue, Buffer.from(JSON.stringify(child)));

                                            } else {
                                                if(! await ElasticsearchService.checkCurrentTaskOfUrl(child.urlCrawled.urlString, child.taskId)) {
                                                    await channel.sendToQueue(sendQueue, Buffer.from(JSON.stringify(child)));
                                                }
                                            }
                                        } else {
                                            await channel.sendToQueue(stopQueue, Buffer.from(JSON.stringify(child)));
                                        }

                                    }
                                }
                            }
                        }
                        else {
                            if(! await ElasticsearchService.checkCurrentTaskOfUrl(messageObj.urlCrawled.urlString, messageObj.taskId)) {
                                await channel.sendToQueue(sendQueue, Buffer.from(JSON.stringify(messageObj)));
                            }
                        }
                    } else {
                        await channel.sendToQueue(stopQueue, Buffer.from(JSON.stringify(messageObj)));
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







