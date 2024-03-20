const catchError = require('../utils/catchError');
const Product = require('../models/Product');
const { uploadToCloudinary, deleteFromCloudinary } = require('../utils/cloudinary');
const Estado = require('../models/Estado');
const Image = require('../models/Image');

const getAll = catchError(async(req, res) => {
    const results = await Product.findAll({ include: [Estado, Image]});
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
    const result = await Product.findByPk(id, { include: [Estado, Image] });
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

/*const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Product.destroy({ where: {id} });
    return res.sendStatus(204);
});*/

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
        return res.status(404).json({ error: "Product not found" });
    }

    // Delete images from Cloudinary if they exist
    if (product.imageUrl) {
        await deleteFromCloudinary(product.imageUrl);
    }
    if (product.imageUrl2) {
        await deleteFromCloudinary(product.imageUrl2);
    }
    if (product.imageUrl3) {
        await deleteFromCloudinary(product.imageUrl3);
    }

    await Product.destroy({ where: { id } });
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
    let imageUrl2;
    let imageUrl3;

    // Check if there are files attached
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: "Debe proporcionar al menos una imagen para actualizar" });
    }

    // Upload each file to Cloudinary and assign the URLs to respective variables
    for (let i = 0; i < req.files.length; i++) {
        const { url } = await uploadToCloudinary(req.files[i]);
        if (i === 0) {
            imageUrl = url;
        } else if (i === 1) {
            imageUrl2 = url;
        } else if (i === 2) {
            imageUrl3 = url;
        }
    }

    // Update the product image URLs in the database
    const [rowsUpdated, [updatedProduct]] = await Product.update(
        { imageUrl, imageUrl2, imageUrl3 },
        { where: { id }, returning: true }
    );

    if (rowsUpdated === 0) return res.sendStatus(404);
    return res.json(updatedProduct);
});



module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    updateProductImage
}