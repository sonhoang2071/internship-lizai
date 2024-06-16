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

                await channel.consume(stopQueue, (msg) => {
                    if (msg !== null) {
                        const messageContent = JSON.parse(msg.content.toString());
                        if (messageContent.taskId === taskId) {
                            messagesToRequeue.push(messageContent);
                        } else {
                            messagesToTemp.push(messageContent);
                        }
                        channel.ack(msg);
                    }
                }, { noAck: false });

                for (const message of messagesToRequeue) {
                    await channel.sendToQueue(sendQueue, Buffer.from(JSON.stringify(message)), { persistent: true });
                }

                for (const message of messagesToTemp) {
                    await channel.sendToQueue(tempQueue, Buffer.from(JSON.stringify(message)), { persistent: true });
                }

                // Move messages from temporary queue back to stop queue
                await channel.consume(tempQueue, (msg) => {
                    if (msg !== null) {
                        channel.sendToQueue(stopQueue, Buffer.from(msg.content), { persistent: true });
                        channel.ack(msg);
                    }
                }, { noAck: false });



            } catch (error) {
                console.log(error);
                throw error;
            }

            setTimeout(() => {
                connection.close();
                process.exit(0);
            }, 500);

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

