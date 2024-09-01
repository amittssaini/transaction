const router = require('express').Router();
const {postTransaction,expenseTransaction}= require('../Controllers/ethereum.controller')

router.post('/transaction/:address',postTransaction);
router.get('/expense/:address',expenseTransaction)

module.exports = router;