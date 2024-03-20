const { getAll } = require('../controllers/collection.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const collectionRouter = express.Router();

collectionRouter.route('/collections')
    .get(verifyJWT, getAll)

module.exports = collectionRouter;