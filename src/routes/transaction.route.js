const express = require('express');
const transactionsController = require('../controllers/transaction.controller');
const router = express.Router();

router.post('/', transactionsController.create);
router.post('/notify', transactionsController.notify);
router.get('/', transactionsController.getAll);
router.get('/:id', transactionsController.getById);
router.put('/:id', transactionsController.update);
router.delete('/:id', transactionsController.delete);

module.exports = router;
