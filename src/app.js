const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const transactionRoute = require('./routes/transaction.route');

const { initRabbitMQ } = require('./services/rabbitmq');
const { consumeEmailQueue } = require('./consumer/email.consumer');

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use('/api/transaction', transactionRoute);

(async () => {
    try {
      await initRabbitMQ();
      await consumeEmailQueue();
      console.log('Email consumer started');
    } catch (error) {
      console.error('Failed to initialize RabbitMQ:', error.message);
    }
})();

if (require.main === module) {
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
}

  
module.exports = app;