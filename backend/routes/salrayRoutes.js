const express = require('express');
const router = express.Router()
const  {salary} = require('../controllers/salaryController')


router.get('/', salary)

module.exports = router