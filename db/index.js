var Sequelize = require('sequelize');

var db = new Sequelize(process.env.CONN || 'postgres://localhost/nwind');

var Category = db.define('category', {
  name: Sequelize.STRING
});

var User = db.define('user', {
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  jobTitle: Sequelize.STRING
});

var Product = db.define('product', {
  name: Sequelize.STRING
});

Product.belongsTo(Category);

User.belongsTo(Product, { as: 'favoriteProduct' });
User.belongsTo(Product, { as: 'secondFavoriteProduct' });
User.belongsTo(Product, { as: 'leastFavoriteProduct' });

var _conn;

module.exports = {
  connect: function(){
    if(_conn)
      return _conn;
    _conn = db.authenticate();
    return _conn;
  },
  sync : function(){
    return db.sync({ force: true});
  },
  models: {
    User: User,
    Product: Product,
    Category: Category
  }
};
