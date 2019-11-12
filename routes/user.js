const express = require('express')
const User = require('../controllers/user.js');

const userRouter = express.Router();

userRouter.route("/paymentAPI").get(User.paymentAPI);

module.exports = userRouter;