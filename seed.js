var db = require('./db');
var User = db.models.User;
var Product = db.models.Product;
var Category = db.models.Category;
var Promise = require('bluebird');
var Faker = require('faker');

Promise.bind({})
  .then(function(){
    this.products = [];
    this.categories = [];
    this.users = [];
    return db.connect()
  })
  .then(function(){
    return db.sync();
  })
  .then(function(){
    while(this.categories.length < 10)
      this.categories.push(Faker.commerce.productAdjective());
  })
  .then(function(){
    return Promise.map(this.categories, function(category){
      return Category.create({ name: category});
    });
  })
  .then(function(_categories){
    this.categories = _categories;
  })
  .then(function(){
    while(this.users.length < 100){
      var firstName = Faker.name.firstName(); 
      var lastName = Faker.name.lastName();
      this.users.push({ 
        password: firstName,
        email: `${firstName}.${lastName}@example.com`,
        firstName: firstName,
        lastName: lastName,
        jobTitle: Faker.name.jobTitle()
      });
    }
    while(this.products.length < 100)
      this.products.push({ 
        name: Faker.commerce.productName(),
        categoryId: this.categories[Faker.random.number(this.categories.length - 1)].id
      });
  })
  .then(function(){
    return Promise.map(this.products, function(product){
      return Product.create(product);
    });
  })
  .then(function(results){
    this.products = results;
    results.forEach(function(result){
      console.log(result.get());
    });
  })
  .then(function(){
    var that = this;
    return Promise.map(this.users, function(user){
      user.favoriteProductId = that.products[Faker.random.number(that.products.length - 1)].id;
      user.secondFavoriteProductId = that.products[Faker.random.number(that.products.length - 1)].id;
      user.leastFavoriteProductId = that.products[Faker.random.number(that.products.length - 1)].id;
      return User.create(user);
    });
  })
  .then(function(results){
    results.forEach(function(result){
      console.log(result.get());
    });
  })
  .then(function(){
    process.exit(0);
  });
