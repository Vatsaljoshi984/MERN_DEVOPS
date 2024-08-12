const express = require('express');
const { fetchCategories, createCategory } = require('../controllers/Category');


const router = express.Router();

router.post('/', createCategory)
      .get('/',fetchCategories)
      

exports.router = router;