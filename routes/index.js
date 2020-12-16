const router = require('express').Router();
const getUserInfo = require('../services/getUserInfoRoute');
const UpdateUserTable = require('../services/updateUserTableRoute');

router.get('/getUserInfo', getUserInfo);

router.get('/UpdateUserTable', UpdateUserTable);

exports = module.exports = router;