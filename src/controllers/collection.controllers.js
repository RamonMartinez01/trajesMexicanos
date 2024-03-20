const catchError = require('../utils/catchError');
const Collection = require('../models/Collection');
const Product = require('../models/Product');

const getAll = catchError(async(req, res) => {
    const collection = await Collection.findAll({
        include: [ Product ],
        where: { userId: req.user.id}
    })
    return res.json(collection)
});

module.exports = {
    getAll
}