const { getAll, create, getOne, remove, update, updateProductImage } = require('../controllers/product.controller');
const express = require('express');
const upload = require('../utils/multer')

const productRouter = express.Router();

productRouter.route('/productstrajes')
    .get(getAll)
    .post(create);

productRouter.route('/productstrajes/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

productRouter.route('/updateproductimage/:id')
    .put(
        upload.any('imageUrl', 'imageUrl2', 'imageUrl3'),
        updateProductImage
    )
    
module.exports = productRouter;