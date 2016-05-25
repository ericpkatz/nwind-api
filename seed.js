var db = require('./db');
var User = db.models.User;
var Product = db.models.Product;
var Category = db.models.Category;
var Department = db.models.Department;
var Promise = require('bluebird');
var Faker = require('faker');

function randomIdFromCollection(collection){
  return collection[Faker.random.number(collection.length - 1)].id;
}

Promise.bind({})
  .then(function(){
    this.products = [];
    this.categories = [];
    this.users = [];
    this.departments = [];
    return db.connect();
  })
  .then(function(){
    return db.sync();
  })
  .then(function(){
    while(this.departments.length < 10)
      this.departments.push({ name: Faker.commerce.department() });
    return Promise.map(this.departments, function(department){
      return Department.create(department);
    });
  })
  .then(function(departments){
    this.departments = departments;
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
        jobTitle: Faker.name.jobTitle(),
      });
    }
    while(this.products.length < 100)
      this.products.push({ 
        name: Faker.commerce.productName(),
        categoryId: randomIdFromCollection(this.categories) 
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
      user.favoriteProductId = randomIdFromCollection(that.products); 
      user.secondFavoriteProductId = randomIdFromCollection(that.products); 
      user.thirdFavoriteProductId = randomIdFromCollection(that.products); 
      user.departmentId = randomIdFromCollection(that.departments);
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
