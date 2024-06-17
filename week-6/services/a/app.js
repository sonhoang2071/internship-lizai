const amqp = require('amqplib/callback_api');

const sendQueue = "sites";
const connectUrl = "amqp://rabbitmq";

const ElasticsearchService = require("./src/services/elasticsearch.service")
const TaskRepository = require("./src/repositories/task.repository");
// const message1 = {
//     taskId : 1,
//     searchUrl : "https://diabetes.org/",
//     keyword : "diabetes"
// }


// const message2 = {
//     taskId: 2,
//     searchUrl: "https://www.google.com/",
//     keyword: "cancer"
// }
//
const message3 = {
    taskId: 3,
    searchUrl: "https://www.kidney.org/",
    keyword: "obesity"
}

const messages  = [message3];


// Kết nối tới RabbitMQ server
amqp.connect(connectUrl, async (error0, connection) => {
    if (error0) {

        throw error0;
    }

    try {

        // Kết nối tới RabbitMQ server
        const channel = await connection.createChannel();

        // Đảm bảo rằng các hàng đợi tồn tại
        await channel.assertQueue(sendQueue, { durable: false });




        for(const message of messages) {
            await TaskRepository.create(message.taskId, message.searchUrl, message.keyword);

            await ElasticsearchService.createTask(message.taskId, "running");

            await channel.sendToQueue(sendQueue, Buffer.from(JSON.stringify(message)));
            console.log(` [x] Sent '${message}'`);
        }

    } catch (e) {
        throw e;
    }

});