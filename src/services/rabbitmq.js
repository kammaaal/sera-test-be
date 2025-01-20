const amqp = require('amqplib');

let channel;
let connection;

const initRabbitMQ = async () => {
  try {
    connection = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://localhost');
    channel = await connection.createChannel();
    console.log('RabbitMQ connected');
  } catch (error) {
    console.error('Failed to connect to RabbitMQ:', error.message);
    throw error;
  }
};

const getChannel = () => {
  if (!channel) throw new Error('RabbitMQ channel is not initialized');
  return channel;
};

module.exports = { initRabbitMQ, getChannel };
