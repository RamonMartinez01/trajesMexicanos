const catchError = require('../utils/catchError');
const Favorite = require('../models/Favorite');
const User = require('../models/User');
const Product = require('../models/Product');

const getAll = catchError(async(req, res) => {
    const { id } = req.user;
    const results = await Favorite.findAll({ 
        include: [ User, Product ],
        where: { userId: id },
    });
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const userId = req.user.id;
    const { productId, title } = req.body;
    const result = await Favorite.create({
        userId, productId, title, 
    });
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Favorite.findByPk(id, { include: [ User, Product ]});
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Favorite.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Favorite.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}