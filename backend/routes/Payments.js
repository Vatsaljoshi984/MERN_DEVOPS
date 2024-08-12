const express = require('express');
const { checkout, paymentVerification } = require('../controllers/Payment');


const router = express.Router();

router.post('/checkout', checkout)
      .post('/', paymentVerification)


exports.router = router;