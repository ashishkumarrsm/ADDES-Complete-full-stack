const express = require('express');
const router = express.Router()
const  {getListOfUsers,getUsersById,updateUser,deleteUser,getUsersByEmail,getrewardList, getAdminTotalEarnings, getEarningsTrend} = require('../controllers/usersController')


router.get('/list', getListOfUsers)
router.get('/', getUsersByEmail)
router.get('/rewards', getrewardList)
router.route('/:id')
  .get(getUsersById)
  .put(updateUser)
  .delete(deleteUser);



  // Route for total earnings with admin authentication
router.get("/admin/total-earnings", getAdminTotalEarnings);

// Route for earnings trend with admin authentication
router.get("/admin/earnings-trend", getEarningsTrend);

module.exports = router