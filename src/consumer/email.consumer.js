const { getChannel } = require('../services/rabbitmq');
const { sendEmail } = require('../services/email.service');

const EMAIL_QUEUE = 'email_queue';

const consumeEmailQueue = async () => {
  const channel = getChannel();
  await channel.assertQueue(EMAIL_QUEUE, { durable: true });
  channel.consume(EMAIL_QUEUE, async (msg) => {
    if (msg !== null) {
      const emailData = JSON.parse(msg.content.toString());
      console.log('Processing email:', emailData);

      await sendEmail(emailData);
      channel.ack(msg);
    }
  });
};

module.exports = { consumeEmailQueue };
