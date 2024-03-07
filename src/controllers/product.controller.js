const catchError = require('../utils/catchError');
const Product = require('../models/Product');
const { uploadToCloudinary } = require('../utils/cloudinary');
const Estado = require('../models/Estado');

const getAll = catchError(async(req, res) => {
    const results = await Product.findAll({ include: [Estado]});
    return res.json(results);
});

/*const create = catchError(async(req, res) => {
    const result = await Product.create(req.body);
    return res.status(201).json(result);
});*/

const create = catchError(async (req, res) => {
    const { name, description, origen } = req.body;
    let imageUrl;

    // Si hay un archivo adjunto, carga la imagen a Cloudinary
    if (req.file) {
        const { url } = await uploadToCloudinary(req.file);
        imageUrl = url;
    }

    // Crea el producto en la base de datos
    const product = await Product.create({
        name,
        description,
        origen,
        imageUrl // Si existe, se asigna la URL de la imagen
    });

    return res.status(201).json(product);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Product.findByPk(id, { include: [Estado] });
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Product.destroy({ where: {id} });
    return res.sendStatus(204);
});


const update = catchError(async (req, res) => { //intento #1
    const { id } = req.params;
    const { name, description, origen, estadoId } = req.body;
    let imageUrl;

    // Si hay un archivo adjunto, carga la imagen a Cloudinary
    if (req.file) {
        const { url } = await uploadToCloudinary(req.file);
        imageUrl = url;
    }

    // Actualiza el producto en la base de datos 
   let updatedProduct;
    if (imageUrl) {
        // Si hay una nueva imagen, actualiza también la URL de la imagen
        updatedProduct = await Product.update(
            { name, description, origen, estadoId, imageUrl },
            { where: { id }, returning: true }
        );
    } else {
        // Si no hay una nueva imagen, actualiza solo los otros campos
        updatedProduct = await Product.update(
            { name, description, origen, estadoId },
            { where: { id }, returning: true }
        );
    }

    if (updatedProduct[0] === 0) return res.sendStatus(404);
    return res.json(updatedProduct[1][0]);
});

//esta funcion actualiza solo la url recibida de req.file
const updateProductImage = catchError(async (req, res) => {
    const { id } = req.params;
    let imageUrl;

    // Verificar si hay un archivo adjunto
    if (!req.file) {
        return res.status(400).json({ error: "Debe proporcionar una imagen para actualizar" });
    }

    // Cargar la nueva imagen a Cloudinary
    const { url } = await uploadToCloudinary(req.file);
    imageUrl = url;

    // Actualizar solo la imagen del producto en la base de datos
    const updatedProduct = await Product.update(
        { imageUrl },
        { where: { id }, returning: true }
    );

    if (updatedProduct[0] === 0) return res.sendStatus(404);
    return res.json(updatedProduct[1][0]);
});



module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    updateProductImage
}