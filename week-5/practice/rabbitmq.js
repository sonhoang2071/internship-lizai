// amqp.connect('amqp://localhost', function(error0, connection) {
//     if (error0) {
//         throw error0;
//     }
//     connection.createChannel(function(error1, channel) {
//         if (error1) {
//             throw error1;
//         }
//         var queue = 'hello';
//         var msg = 'Hello world';
//
//         channel.assertQueue(queue, {
//             durable: false
//         });
//
//         channel.sendToQueue(queue, Buffer.from(msg));
//         console.log(" [x] Sent %s", msg);
//     });
// });


// var queue = 'task_queue';
// var msg = process.argv.slice(2).join(' ') || "Hello World!";
//
// channel.assertQueue(queue, {
//     durable: true
// });
// channel.sendToQueue(queue, Buffer.from(msg), {
//     persistent: true
// });
// console.log(" [x] Sent '%s'", msg);


// var queue = 'task_queue';
//
// // This makes sure the queue is declared before attempting to consume from it
// channel.assertQueue(queue, {
//     durable: true
// });
//
// channel.consume(queue, function(msg) {
//     var secs = msg.content.toString().split('.').length - 1;
//
//     console.log(" [x] Received %s", msg.content.toString());
//     setTimeout(function() {
//         console.log(" [x] Done");
//     }, secs * 1000);
// }, {
//     // automatic acknowledgment mode,
//     // see /docs/confirms for details
//     noAck: true
// });

// channel.consume(queue, function(msg) {
//     var secs = msg.content.toString().split('.').length - 1;
//
//     console.log(" [x] Received %s", msg.content.toString());
//     setTimeout(function() {
//         console.log(" [x] Done");
//         channel.ack(msg);
//     }, secs * 1000);
// }, {
//     // manual acknowledgment mode,
//     // see /docs/confirms for details
//     noAck: false
// })

// or

// channel.assertQueue('task_queue', {durable: true});
// channel.sendToQueue(queue, Buffer.from(msg), {persistent: true});



// var amqp = require('amqplib/callback_api');
//
// amqp.connect('amqp://localhost', function(error0, connection) {
//     if (error0) {
//         throw error0;
//     }
//     connection.createChannel(function(error1, channel) {
//         if (error1) {
//             throw error1;
//         }
//         var queue = 'task_queue';
//         var msg = process.argv.slice(2).join(' ') || "Hello World!";
//
//         channel.assertQueue(queue, {
//             durable: true
//         });
//         channel.sendToQueue(queue, Buffer.from(msg), {
//             persistent: true
//         });
//         console.log(" [x] Sent '%s'", msg);
//     });
//     setTimeout(function() {
//         connection.close();
//         process.exit(0)
//     }, 500);
// });



// var amqp = require('amqplib/callback_api');
//
// amqp.connect('amqp://localhost', function(error0, connection) {
//     if (error0) {
//         throw error0;
//     }
//     connection.createChannel(function(error1, channel) {
//         if (error1) {
//             throw error1;
//         }
//         var queue = 'task_queue';
//
//         channel.assertQueue(queue, {
//             durable: true
//         });
//         channel.prefetch(1);
//         console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
//         channel.consume(queue, function(msg) {
//             var secs = msg.content.toString().split('.').length - 1;
//
//             console.log(" [x] Received %s", msg.content.toString());
//             setTimeout(function() {
//                 console.log(" [x] Done");
//                 channel.ack(msg);
//             }, secs * 1000);
//         }, {
//             // manual acknowledgment mode,
//             // see /docs/confirms for details
//             noAck: false
//         });
//     });
// });



// var amqp = require('amqplib/callback_api');
//
// amqp.connect('amqp://localhost', function(error0, connection) {
//     if (error0) {
//         throw error0;
//     }
//     connection.createChannel(function(error1, channel) {
//         if (error1) {
//             throw error1;
//         }
//         var exchange = 'logs';
//         var msg = process.argv.slice(2).join(' ') || 'Hello World!';
//
//         channel.assertExchange(exchange, 'fanout', {
//             durable: false
//         });
//         channel.publish(exchange, '', Buffer.from(msg));
//         console.log(" [x] Sent %s", msg);
//     });
//
//     setTimeout(function() {
//         connection.close();
//         process.exit(0);
//     }, 500);
// });


// var amqp = require('amqplib/callback_api');
//
// amqp.connect('amqp://localhost', function(error0, connection) {
//     if (error0) {
//         throw error0;
//     }
//     connection.createChannel(function(error1, channel) {
//         if (error1) {
//             throw error1;
//         }
//         var exchange = 'logs';
//
//         channel.assertExchange(exchange, 'fanout', {
//             durable: false
//         });
//
//         channel.assertQueue('', {
//             exclusive: true
//         }, function(error2, q) {
//             if (error2) {
//                 throw error2;
//             }
//             console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
//             channel.bindQueue(q.queue, exchange, '');
//
//             channel.consume(q.queue, function(msg) {
//                 if(msg.content) {
//                     console.log(" [x] %s", msg.content.toString());
//                 }
//             }, {
//                 noAck: true
//             });
//         });
//     });
// });

// var amqp = require('amqplib/callback_api');
//
// amqp.connect('amqp://localhost', function(error0, connection) {
//     if (error0) {
//         throw error0;
//     }
//     connection.createChannel(function(error1, channel) {
//         if (error1) {
//             throw error1;
//         }
//         var exchange = 'direct_logs';
//         var args = process.argv.slice(2);
//         var msg = args.slice(1).join(' ') || 'Hello World!';
//         var severity = (args.length > 0) ? args[0] : 'info';
//
//         channel.assertExchange(exchange, 'direct', {
//             durable: false
//         });
//         channel.publish(exchange, severity, Buffer.from(msg));
//         console.log(" [x] Sent %s: '%s'", severity, msg);
//     });
//
//     setTimeout(function() {
//         connection.close();
//         process.exit(0)
//     }, 500);
// });


// var amqp = require('amqplib/callback_api');
//
// var args = process.argv.slice(2);
//
// if (args.length == 0) {
//     console.log("Usage: receive_logs_direct.js [info] [warning] [error]");
//     process.exit(1);
// }
//
// amqp.connect('amqp://localhost', function(error0, connection) {
//     if (error0) {
//         throw error0;
//     }
//     connection.createChannel(function(error1, channel) {
//         if (error1) {
//             throw error1;
//         }
//         var exchange = 'direct_logs';
//
//         channel.assertExchange(exchange, 'direct', {
//             durable: false
//         });
//
//         channel.assertQueue('', {
//             exclusive: true
//         }, function(error2, q) {
//             if (error2) {
//                 throw error2;
//             }
//             console.log(' [*] Waiting for logs. To exit press CTRL+C');
//
//             args.forEach(function(severity) {
//                 channel.bindQueue(q.queue, exchange, severity);
//             });
//
//             channel.consume(q.queue, function(msg) {
//                 console.log(" [x] %s: '%s'", msg.fields.routingKey, msg.content.toString());
//             }, {
//                 noAck: true
//             });
//         });
//     });
// });