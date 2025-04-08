const express = require('express');
const router = express.Router()
const  { getReferralTree ,getFullReferralTree,calculateCommissionForAllUsers, getDirectReferrals} = require('../controllers/refferalController')
const { updateROIIncomeForUsers } = require('../controllers/CornJobController');
const { callAllFunctionsSequentially } = require('../controllers/jobController');
const {callAllFunctionsSalray} = require('../controllers/salrayjobController');


router.get('/list/:referral_code', getReferralTree)
router.get('/full/:referral_code', getFullReferralTree)
router.get('/commission', calculateCommissionForAllUsers)
router.get('/roi', updateROIIncomeForUsers)
router.get('/teirraxjobs', callAllFunctionsSequentially)
router.get('/finrainjobs/salray', callAllFunctionsSalray)
router.get("/user/:user_id/directs", getDirectReferrals);

module.exports = router