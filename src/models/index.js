const Collection = require("./Collection");
const Estado = require("./Estado");
const Favorite = require("./Favorite");
const Image = require("./Image");
const Product = require("./Product");
const User = require('./User')

Product.belongsTo(Estado);
Estado.hasMany(Product);

Product.hasMany(Image)
Image.belongsTo(Product)

User.hasMany(Favorite);
Favorite.belongsTo(User);

Product.hasMany(Favorite);
Favorite.belongsTo(Product)

Collection.belongsTo(User);
User.hasMany(Collection)

Collection.belongsTo(Product);
Product.hasMany(Collection)