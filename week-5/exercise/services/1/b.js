const amqp = require('amqplib/callback_api');

const receiveQueue = "test";
const connectUrl = "amqp://localhost:5672";


// Kết nối tới RabbitMQ server
amqp.connect(connectUrl, async (error0, connection) => {
    if (error0) {
        throw error0;
    }

        // Tạo một channel
        const channel = await connection.createChannel();

        await channel.assertQueue(receiveQueue, { durable: false });

        channel.consume(receiveQueue, async (msg) => {
                if (msg !== null) {
                    const messageObj = JSON.parse(msg.content.toString());
                    console.log(messageObj);
                    if(messageObj.level <= 5) {
                        messageObj.level++;
                        console.log("Resend to queue ", Buffer.from(JSON.stringify(messageObj)));
                        channel.sendToQueue(receiveQueue, Buffer.from(JSON.stringify(messageObj)));
                        channel.nack(msg);
                        // console.log("Resend to queue ", messageObj);
                    } else {
                        console.log("Stop ", messageObj);
                        channel.ack(msg);
                    }
            }

        }, { noAck: false });
});