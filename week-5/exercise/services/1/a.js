const amqp = require('amqplib/callback_api');

const sendQueue = "test";
const connectUrl = "amqp://localhost:5672";


const message1 = {
    level : 1
}



const message  = JSON.stringify(message1);


// Kết nối tới RabbitMQ server
amqp.connect(connectUrl, (error0, connection) => {
    if (error0) {
        throw error0;
    }

    // Tạo một channel
    connection.createChannel((error1, channel) => {
        if (error1) {
            throw error1;
        }

        // Đảm bảo rằng hàng đợi tồn tại trước khi gửi tin nhắn
        channel.assertQueue(sendQueue, { durable: false });

        // Gửi từng tin nhắn vào hàng đợi

        channel.sendToQueue(sendQueue, Buffer.from(message));

    });

    // Đóng kết nối sau 500ms để đảm bảo tất cả tin nhắn đã được gửi
    setTimeout(() => {
        connection.close();
        process.exit(0);
    }, 500);
});