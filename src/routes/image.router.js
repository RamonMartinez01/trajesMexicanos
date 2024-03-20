const { getAll, create, getOne, remove } = require('../controllers/image.controllers');
const express = require('express');
const upload = require('../utils/multer');
const verifyJWT = require('../utils/verifyJWT')

const imageRouter = express.Router();

imageRouter.route('/images')
    .get(getAll)
    .post(verifyJWT, upload.single('image'), create);

imageRouter.route('/images/:id')
    .get(verifyJWT, getOne)
    .delete(verifyJWT, remove)
    
module.exports = imageRouter;