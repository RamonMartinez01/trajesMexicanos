const catchError = require('../utils/catchError');
const User = require('../models/User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const getAll = catchError(async(req, res) => {
    const results = await User.findAll();
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const { username, password } = req.body;
    const encriptedPassword = await bcrypt.hash(password, 10)
    const result = await User.create({
        username,
        password: encriptedPassword
    });
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await User.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await User.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const { username } = req.body
    const result = await User.update(
        { username },
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const login = catchError(async(req, res) => {
    const { username, password } = req.body;
const user = await User.findOne({ where: {username} });
if(!user) return res.status(401).json({ error: "username no encontrado" });

const isValid = await bcrypt.compare(password, user.password);
if(!isValid) return res.status(401).json({ error: "contraseña incorrecta" });

    const token = jwt.sign(
            {user},
            process.env.TOKEN_SECRET,
    )
    return res.json({ user, token });
})

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    login
}