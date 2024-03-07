const { getAll, create, getOne, remove, update } = require('../controllers/estado.controllers');
const express = require('express');

const estadoRouter = express.Router();

estadoRouter.route('/estados')
    .get(getAll)
    .post(create);

estadoRouter.route('/estados/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = estadoRouter;