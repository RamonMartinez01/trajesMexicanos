const { getAll, create, getOne, remove, update, login } = require('../controllers/user.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT')

const userRouter = express.Router();

userRouter.route('/userstrajes')
    .get(verifyJWT, getAll)
    .post(create);

userRouter.route('/userstrajes/login')
    .post(login)

userRouter.route('/userstrajes/:id')
    .get(verifyJWT, getOne)
    .delete(verifyJWT, remove)
    .put(verifyJWT, update);


module.exports = userRouter;