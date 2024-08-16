const express = require('express');
const { createProduct, fetchAllProducts, updateProduct, fetchProductById, fetchAllProductsForAdmin, ReviewProduct, reviewProduct } = require('../controllers/Product');


const router = express.Router();

router.post('/', createProduct)
      .get('/',fetchAllProducts)
      .get('/admin',fetchAllProductsForAdmin)
      .get('/:id',fetchProductById)
      .patch('/:id',updateProduct)
      .patch('/rating/:id',reviewProduct)

exports.router = router;