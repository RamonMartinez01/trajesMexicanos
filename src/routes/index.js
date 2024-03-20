const express = require('express');
const router = express.Router();
const userRouter = require('./user.router')
const productRouter = require('./product.router');
const estadoRouter = require('./estado.router');
const imageRouter = require('./image.router');
const favoriteRouter = require('./favorite.router');
const collectionRouter = require('./collection.router');


// colocar las rutas aquí
router.use(userRouter)
router.use(productRouter)
router.use(estadoRouter)
router.use(imageRouter)
router.use(favoriteRouter)
router.use(collectionRouter)

module.exports = router;