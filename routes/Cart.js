const express = require('express');
const { addToCart, updateCart, fetchCartByUserId, deleteCart } = require('../controllers/Cart');

const router = express.Router();

router.post('/', addToCart)
      .get('/',fetchCartByUserId)
      .patch('/:id',updateCart)
      .delete('/:id',deleteCart)

exports.router = router;