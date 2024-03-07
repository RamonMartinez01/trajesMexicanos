const Estado = require("./Estado");
const Product = require("./Product");



Product.belongsTo(Estado);
Estado.hasMany(Product);

