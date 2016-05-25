var Sequelize = require('sequelize');
var crypto = require('crypto');

var db = new Sequelize(process.env.CONN || 'postgres://localhost/nwind');

var models = {};

models.Category = db.define('category', {
  name: Sequelize.STRING
});

models.Department = db.define('department', {
  name: Sequelize.STRING
});

models.User = db.define('user', {
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

models.Product = db.define('product', {
  name: Sequelize.STRING
});

models.Product.belongsTo(models.Category);

models.User.belongsTo(models.Product, { as: 'favoriteProduct' });
models.User.belongsTo(models.Product, { as: 'secondFavoriteProduct' });
models.User.belongsTo(models.Product, { as: 'leastFavoriteProduct' });
models.User.belongsTo(models.Department, { as: 'department' });

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
  models: models 
};
