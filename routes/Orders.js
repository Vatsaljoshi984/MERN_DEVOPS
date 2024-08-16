const express = require('express');
const { CreateOrder, fetchOrderByUserId, updateOrder, deleteOrder, fetchAllOrders } = require('../controllers/Order');

const router = express.Router();

router.post('/', CreateOrder).get('/admin',fetchAllOrders)
      .get('/',fetchOrderByUserId)
      .patch('/:id',updateOrder)
      .delete('/:id',deleteOrder)

exports.router = router;