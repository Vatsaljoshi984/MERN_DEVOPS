const express = require('express');
const { createUser, checkUser, loginUser, logout } = require('../controllers/Auth');
const passport = require('passport');


const router = express.Router();

router.post('/signup', createUser).get('/check', passport.authenticate('jwt'), checkUser).post('/login', passport.authenticate('local'), loginUser).get('/logout',logout)


exports.router = router;