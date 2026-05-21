var express = require('express');
var router = express.Router();
import * as UserController from '../controllers/user.controller.js';

/* GET users listing. */
router.get('/', UserController.getAllUsers);

module.exports = router;
