const TaskRepository = require("../repositories/task.repository")
const ElasticsearchService = require("./elasticsearch.service");

const amqp = require('amqplib/callback_api');
const connectUrl = "amqp://rabbitmq";
const stopQueue = 'stop';
const sendQueue = 'urls';
const tempQueue = 'temp';

class TaskService {
    static async start(taskId) {
        const res = await TaskRepository.updateStatus(taskId, "running");
        return res;
    }

    static async stop(taskId) {
        await ElasticsearchService.updateStatusTask(taskId, "stop");

        const res = await TaskRepository.updateStatus(taskId, "stop");
        return res;
    }

    static async restart(taskId) {
        await ElasticsearchService.updateStatusTask(taskId, "running");

        const res = await TaskRepository.updateStatus(taskId, "running");

        amqp.connect(connectUrl, async (error0, connection) => {
            if (error0) {
                throw error0;
            }

            // Tạo một channel
            try {
                // Kết nối tới RabbitMQ server
                const channel = await connection.createChannel();


                // Đảm bảo rằng các hàng đợi tồn tại
                await channel.assertQueue(stopQueue, { durable: false });
                await channel.assertQueue(sendQueue, { durable: false });
                await channel.assertQueue(tempQueue, { durable: false });

                const messagesToRequeue = [];
                const messagesToTemp = [];

                const _taskId = taskId;

                await channel.consume(stopQueue, async(msg) => {
                    if (msg !== null) {
                        const messageContent = JSON.parse(msg.content.toString());
                        console.log(_taskId);
                        if (messageContent.taskId === _taskId) {
                            await channel.sendToQueue(sendQueue, Buffer.from(JSON.stringify(messageContent)));
                        } else {
                            await channel.sendToQueue(tempQueue, Buffer.from(JSON.stringify(messageContent)));
                        }
                        channel.ack(msg);
                    }
                }, { noAck: false });

                // Move messages from temporary queue back to stop queue
                await channel.consume(tempQueue, (msg) => {
                    if (msg !== null) {
                        channel.sendToQueue(stopQueue, Buffer.from(msg.content));
                        channel.ack(msg);
                    }
                }, { noAck: false });

            } catch (error) {
                console.log(error);
                throw error;
            }
        });
    }

    static async delete(taskId) {
        await ElasticsearchService.updateStatusTask(taskId, "delete");

        const res = await TaskRepository.updateStatus(taskId, "delete");
        return res;
    }

    static async show(taskId, page, pageSize) {
        if(!await TaskRepository.taskIsExisted(taskId)) {
            throw new Error(`TaskId ${taskId} is not existed`);
        }
        const data = await TaskRepository.getTaskUrl(taskId, page, pageSize);
        const totalCount = await TaskRepository.getTotal(taskId);
        return { data, totalCount };
    }
}

module.exports = TaskService;

