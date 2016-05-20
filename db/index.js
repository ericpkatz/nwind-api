var Sequelize = require('sequelize');
var crypto = require('crypto');

var db = new Sequelize(process.env.CONN || 'postgres://localhost/nwind');

var Category = db.define('category', {
  name: Sequelize.STRING
});

var User = db.define('user', {
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  jobTitle: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  salt: Sequelize.STRING
}, {
  instanceMethods: {
    encryptPassword: function(password){
      var hash = crypto.createHash('sha1');
      hash.update(password);
      hash.update(this.salt);
      return hash.digest('hex');
    }
  },
  hooks: {
    beforeCreate: function(user){
      var salt = crypto.randomBytes(16).toString('base64');
      user.salt = salt;
      var hash = crypto.createHash('sha1');
      hash.update(user.password);
      hash.update(user.salt);
      user.password = hash.digest('hex');
    }
  }
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
