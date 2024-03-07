const express = require('express');
const router = express.Router();
const userRouter = require('./user.router')
const productRouter = require('./product.router');
const estadoRouter = require('./estado.router');


// colocar las rutas aquí
router.use(userRouter)
router.use(productRouter)
router.use(estadoRouter)

module.exports = router;