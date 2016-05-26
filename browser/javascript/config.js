angular.module('app')
  .run(function(DSHttpAdapter){
    DSHttpAdapter.defaults.basePath = '/api';
  
  })
  .config(function($stateProvider){
    $stateProvider
      .state('departments', {
        url: '/departments',
        templateUrl: '/templates/departments.html',
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
        templateUrl: '/templates/users.html',
        controller: function($scope, users){
          $scope.users = users;
        },
        resolve: {
          users: function($http, $stateParams, UserFactory){
            return UserFactory.findAll({ departmentId: $stateParams.id});
          }
        }
      })
      .state('categories', {
        url: '/categories',
        templateUrl: '/templates/categories.html',
        controller: function($scope, categories){
          $scope.categories = categories;
        },
        resolve: {
          categories: function($http){
            return $http.get('/api/categories')
              .then(function(response){
                return response.data;
              });
          }
        }
      })
      .state('categories.products', {
        url: '/:id/products',
        templateUrl: '/templates/products.html',
        controller: function($scope, products){
          $scope.products = products;
        },
        resolve: {
          products: function($http, $stateParams){
            return $http.get('/api/categories/' + $stateParams.id + '/products')
              .then(function(response){
                return response.data;
              });
          }
        }
      });
  });
