const { getAll, create, getOne, remove, update } = require('../controllers/estado.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const estadoRouter = express.Router();

estadoRouter.route('/estados')
    .get(getAll)
    .post(verifyJWT, create);

estadoRouter.route('/estados/:id')
    .get(getOne)
    .delete(verifyJWT, remove)
    .put(verifyJWT, update);

module.exports = estadoRouter;