const express = require('express');
const router = express.Router()
const  { reward} = require('../controllers/rewardController')
const  { salary} = require('../controllers/salaryController')

router.get('/',reward)



module.exports = router