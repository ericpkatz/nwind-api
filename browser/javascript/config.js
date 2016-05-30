angular.module('app')
  .run(function(DSHttpAdapter){
    DSHttpAdapter.defaults.basePath = '/api';
  })
  .run(function($window, SessionFactory, $http){
    if($window.sessionStorage.getItem('token'))
        $http.get('/api/sessions/' + $window.sessionStorage.getItem('token'))
          .then(function(response){
            angular.copy(response.data, SessionFactory.auth);
          });
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
            return DepartmentFactory.findAll({}, {bypassCache: true});
          }
        }
      })
      .state('departments.edit', {
        url: '/:id/edit',
        templateUrl: '/browser/templates/edit.department.html',
        controller: 'DepartmentEditCtrl',
        resolve: {
          department: function(DepartmentFactory, $stateParams){
            return DepartmentFactory.find($stateParams.id);
          }
        }
      })
      .state('departments.users', {
        url: '/:id/users',
        templateUrl: '/browser/templates/users.html',
        controller: function($scope, users, UserFactory){
          $scope.users = users;
          $scope.delete = function(user){
            UserFactory.destroy({id: user.id, departmentId: user.departmentId});
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
      })
      .state('login', {
        url: '/login',
        templateUrl: '/browser/templates/login.html',
        controller: 'LoginCtrl',
      })
      .state('settings', {
        resolve: {
          user: function(SessionFactory){
            return SessionFactory.me();
          }
        },
        url: '/settings',
        templateUrl: '/browser/templates/settings.html',
        controller: function($scope, user){
          $scope.user = user;
        
        }
      });
  });
