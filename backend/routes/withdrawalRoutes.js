const express = require('express');
const router = express.Router()
const  {getListOfWithdrawalRequest,addWithdrawalRequest,updateROIWithdrawalRequest,addROIWithdrawalRequest,updateWithdrawalRequest,debitAmount,deleteWithdrawalRequest,getListOfWithdrawalRequestById} = require('../controllers/withdrawalController')


router.get('/list', getListOfWithdrawalRequest)
router.get('/by/:user_id', getListOfWithdrawalRequestById)
router.post('/add', addWithdrawalRequest)
router.post('/add/roiwithdrawal', addROIWithdrawalRequest)
router.route('/:id')
  .put(updateWithdrawalRequest)
  .delete(deleteWithdrawalRequest);
router.post("/debit" , debitAmount)
router.put("/update/roi/:id" , updateROIWithdrawalRequest)
module.exports = router