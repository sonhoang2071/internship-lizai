const amqp = require('amqplib/callback_api');

const sendQueue = "sites";
const connectUrl = "amqps://brtpelif:tG6ITlxwt6iYREK_1-u_D0ZBvmayWRrq@armadillo.rmq.cloudamqp.com/brtpelif";

// tạo 2 message cho service 1
const message1 = {
    taskId : 1,
    url : "https://www.cdc.gov/",
    keyword : "diabetes"
}

const message2 = {
    taskId: 2,
    url: "https://www.cdc.gov",
    keyword: "cancer"
}

const messages  = [JSON.stringify(message1), JSON.stringify(message2)];


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
        channel.assertQueue(sendQueue, {
            durable: false
        });

        // Gửi từng tin nhắn vào hàng đợi
        messages.forEach((message) => {
            channel.sendToQueue(sendQueue, Buffer.from(message));
            console.log(` [x] Sent '${message}'`);
        });
    });

    // Đóng kết nối sau 500ms để đảm bảo tất cả tin nhắn đã được gửi
    setTimeout(() => {
        connection.close();
        process.exit(0);
    }, 500);
});
