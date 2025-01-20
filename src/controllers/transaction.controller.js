const Transactions = require('../models/transaction');
const { getChannel } = require('../services/rabbitmq');
const { sendEmail } = require('../services/email.service');

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
        const { email, transactionId } = req.body;

        if (!email || !transactionId) {
            return res.status(400).json({ message: 'Email and transactionId are required' });
        }

        try {
            const subject = `Notification for Transaction ID: ${transactionId}`;
            const text = `Your transaction with ID ${transactionId} has been processed successfully.`;
            await sendEmail(email, subject, text);

            res.status(200).json({ message: 'Notification sent successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Failed to send notification', error: error.message });
        }
    }
}

module.exports = TransactionsController;
