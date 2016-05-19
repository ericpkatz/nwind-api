var db = require('./db');
var User = db.models.User;
var Product = db.models.Product;
var Category = db.models.Category;
var Promise = require('bluebird');
var Faker = require('faker');

var products, users, categories;
db.connect()
  .then(function(){
    return db.sync();
  })
  .then(function(){
    categories = [];
    while(categories.length < 10)
      categories.push(Faker.commerce.productAdjective());
    return categories;
  })
  .then(function(){
    return categories.map(function(category){
      return Category.create({ name: category});
    });
  })
  .then(function(promises){
    return Promise.all(promises);
  })
  .then(function(_categories){
    categories = _categories;
  })
  .then(function(){
    users = [];
    while(users.length < 100)
      users.push({ 
        firstName: Faker.name.firstName(),
        lastName: Faker.name.lastName(),
        jobTitle: Faker.name.jobTitle()
      });
    products = [];
    while(products.length < 100)
      products.push({ 
        name: Faker.commerce.productName(),
        categoryId: categories[Faker.random.number(categories.length - 1)].id
      });
  })
  .then(function(){
    return products.map(function(product){
      return Product.create(product);
    });
  })
  .then(function(promises){
    return Promise.all(promises);
  })
  .then(function(results){
    products = results;
    results.forEach(function(result){
      console.log(result.get());
    });
  })
  .then(function(){
    return users.map(function(user){
      user.favoriteProductId = products[Faker.random.number(products.length - 1)].id;
      user.secondFavoriteProductId = products[Faker.random.number(products.length - 1)].id;
      user.leastFavoriteProductId = products[Faker.random.number(products.length - 1)].id;
      return User.create(user);
    });
  })
  .then(function(promises){
    return Promise.all(promises);
  })
  .then(function(results){
    results.forEach(function(result){
      console.log(result.get());
    });
  })
  .then(function(){
    process.exit(0);
  });
