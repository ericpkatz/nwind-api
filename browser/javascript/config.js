angular.module('app')
  .run(function(DSHttpAdapter){
    DSHttpAdapter.defaults.basePath = '/api';
  
  })
  .config(function($stateProvider){
    $stateProvider
      .state('departments', {
        url: '/departments',
        templateUrl: '/browser/templates/departments.html',
        controller: function($scope, departments){
          $scope.departments = departments;
        },
        resolve: {
          departments: function(DepartmentFactory, $http){
            return DepartmentFactory.findAll();
          }
        }
      })
      .state('departments.users', {
        url: '/:id/users',
        templateUrl: '/browser/templates/users.html',
        controller: function($scope, users, UserFactory){
          $scope.users = users;
          $scope.delete = function(user){
            UserFactory.destroy({id: user.id, departmentId: user.departmentId})
          };
        },
        resolve: {
          users: function($http, $stateParams, UserFactory){
            return UserFactory.findAll({ departmentId: $stateParams.id});
          }
        }
      })
      .state('categories', {
        url: '/categories',
        templateUrl: '/browser/templates/categories.html',
        controller: function($scope, categories){
          $scope.categories = categories;
        },
        resolve: {
          categories: function(CategoryFactory){
            return CategoryFactory.findAll();
          }
        }
      })
      .state('categories.products', {
        url: '/:id/products',
        templateUrl: '/browser/templates/products.html',
        controller: function($scope, products){
          $scope.products = products;
        },
        resolve: {
          products: function(ProductFactory, $stateParams){
            return ProductFactory.findAll({ categoryId: $stateParams.id});
          }
        }
      });
  });
