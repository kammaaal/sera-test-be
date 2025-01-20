const Transactions = require('../models/transaction');
const { getChannel } = require('../services/rabbitmq');

class TransactionsController {
    static async create(req, res) {
        try {
            const transaction = await Transactions.create(req.body);
            res.status(201).json(transaction);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getAll(req, res) {
        try {
            const transactions = await Transactions.getAll();
            res.status(200).json(transactions);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const transaction = await Transactions.getById(req.params.id);
            if (!transaction) {
                return res.status(404).json({ message: 'data not found' });
            }
            res.status(200).json(transaction);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async update(req, res) {
        try {
            const transaction = await Transactions.update(req.params.id, req.body);

            if (!transaction) {
                return res.status(404).json({ message: 'Transaction not found' });
            }

            res.status(200).json(transaction);
        } catch (error) {
            console.error('Error in update:', error.message);
            res.status(500).json({ error: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const result = await Transactions.delete(req.params.id);
            if (!result) {
                return res.status(404).json({ message: 'data not found' });
            }
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async notify(req, res) {
        try {
            const channel = getChannel();
            const EMAIL_QUEUE = 'email_queue';

            const emailData = {
                to: req.body.to,
                subject: req.body.subject,
                text: req.body.text,
            };

            await channel.assertQueue(EMAIL_QUEUE, { durable: true });
            channel.sendToQueue(EMAIL_QUEUE, Buffer.from(JSON.stringify(emailData)));

            res.status(200).json({ message: 'Email notification queued' });
        } catch (error) {
            console.error('Failed to queue email:', error.message);
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = TransactionsController;
