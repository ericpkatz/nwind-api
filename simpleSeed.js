var db = require('./db');
var User = db.models.User;
var Product = db.models.Product;
var Category = db.models.Category;
var Department = db.models.Department;
var FavoriteProduct = db.models.FavoriteProduct;
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
    this.departmentsMap = {};
    this.categoriesMap = {};
    this.productsMap = {};
    this.usersMap = {};
    return db.connect();
  })
  .then(function(){
    return db.sync();
  })
  .then(function(){
    this.departments = this.departments.concat([
        { name: 'Engineering' },
        { name: 'HR' },
        { name: 'Executive' }
    ]);
    return Promise.map(this.departments, function(department){
      return Department.create(department);
    });
  })
  .spread(function(engineering, hr, executive){
    this.departmentsMap.engineering = engineering;
    this.departmentsMap.hr = hr;
    this.departmentsMap.executive = executive;
  })
  .then(function(){
    this.categories = this.categories.concat([
        { name: 'food' },
        { name: 'drinks' },
        { name: 'clothes' }
    ]);
    return Promise.map(this.categories, function(category){
      return Category.create(category);
    });
  })
  .spread(function(food, drinks, clothes){
    this.categoriesMap.food = food;
    this.categoriesMap.drinks = drinks;
    this.categoriesMap.clothes = clothes;
  })
  .then(function(){
    this.users = this.users.concat([
        { firstName: 'Moe', lastName: 'Smith', email: 'moe.smith@example.com', departmentId: this.departmentsMap.executive.id, password: 'Moe' },
        { firstName: 'Larry', lastName: 'Jones', email: 'larry.jones@example.com', departmentId: this.departmentsMap.hr.id, password: 'Larry' },
        { firstName: 'Curly', lastName: 'Katz', email: 'curly.katz@example.com', departmentId: this.departmentsMap.engineering.id, password: 'Curly' },
    ]);
    return Promise.map(this.users, function(user){
      return User.create(user);
    });
  })
  .spread(function(moe, larry, curly){
    this.usersMap.moe = moe;
    this.usersMap.larry = larry;
    this.usersMap.curly = curly;
  })
  .then(function(){
    console.log(this.categoriesMap);
    this.products = this.products.concat([
        { name: 'beer', categoryId: this.categoriesMap.drinks.id },
        { name: 'vodka', categoryId: this.categoriesMap.drinks.id },
        { name: 'chicken', categoryId: this.categoriesMap.food.id },
        { name: 'sneakers', categoryId: this.categoriesMap.clothes.id },
    ]);
    return Promise.map(this.products, function(product){
      return Product.create(product);
    });
  })
  .spread(function(beer, vodka, chicken, sneakers){
    this.productsMap.beer = beer;
    this.productsMap.vodka = vodka;
    this.productsMap.chicken = chicken;
    this.productsMap.sneakers = sneakers;
    console.log(this.productsMap);
  })
/*
  .then(function(departments){
    this.departments = departments;
    Categories.
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
      user.departmentId = randomIdFromCollection(that.departments);
      return User.create(user);
    });
  })
  .then(function(results){
    this.users = results;
    results.forEach(function(result){
      console.log('USER', result.get());
    });
  })
  .then(function(){
    var that = this;
    return Promise.map(this.users, function(user){
      return FavoriteProduct.create({userId: user.id, productId: randomIdFromCollection(that.products)});
    });
  })
  .then(function(){
    var that = this;
    return Promise.map(this.users, function(user){
      return FavoriteProduct.create({userId: user.id, productId: randomIdFromCollection(that.products)});
    });
  })
  .then(function(){
    var that = this;
    return Promise.map(this.users, function(user){
      return FavoriteProduct.create({userId: user.id, productId: randomIdFromCollection(that.products)});
    });
  })
*/
  .then(function(){
    //process.exit(0);
  });
