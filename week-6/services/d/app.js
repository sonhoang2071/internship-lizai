const amqp = require('amqplib/callback_api');

const receiveQueue = 'data';

const connectUrl = "amqp://rabbitmq";

const UrlService = require('./src/services/url.service');
const TaskUrlService = require("./src/services/taskUrl.service");

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


        // Nhận tin nhắn từ hàng đợi "sites"
        channel.consume(receiveQueue, async (msg) => {
            if (msg !== null) {
                let messageObj = JSON.parse(msg.content.toString());

                const response =  await UrlService.create(messageObj);
                const urlId = response.insertId;
                const response2 = await TaskUrlService.create(messageObj.taskId, urlId);

                console.log(messageObj);
                channel.ack(msg);
            }
        }, { noAck: false });

    } catch (error) {
        console.log(error);
        throw error;
    }
});





