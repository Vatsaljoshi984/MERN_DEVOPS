const express = require('express');
const { updateUser, fetchUserById } = require('../controllers/User');


const router = express.Router();

router.get('/', fetchUserById)
      .patch('/', updateUser)


exports.router = router;