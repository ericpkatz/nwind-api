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
            return DepartmentFactory.findAll({});
          }
        }
      })
      .state('users', {
        url: '/users',
        templateUrl: '/browser/templates/users.html',
        controller: function($scope, users, UserFactory){
          $scope.users = users;
          $scope.delete = function(user){
            UserFactory.destroy(user.id);
          };
        },
        resolve: {
          users: function(UserFactory){
            return UserFactory.findAll({}, { useFilter: true }); 
          }
        }
      })
      .state('update_user', {
        url: '/users/update/:id',
        templateUrl: '/browser/templates/update.user.html',
        controller: 'UserUpdateCtrl',
        resolve: {
          user: function(UserFactory, $stateParams){
            return UserFactory.find($stateParams.id); 
          }
        }
      })
      .state('create_user', {
        url: '/users/create',
        templateUrl: '/browser/templates/create.user.html',
        controller: 'UserCreateCtrl', 
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
      })
      .state('user', {
        resolve: {
          products: function(ProductFactory){
            return ProductFactory.findAll(); 
          },
          user: function(UserFactory, $stateParams){
            return UserFactory.find($stateParams.id); 
          },
          addresses: function(AddressFactory, $stateParams){
            return AddressFactory.findAll({ userId: $stateParams.id }); 
          },
          similarUsers: function(SimilarUserFactory, $stateParams){
            return SimilarUserFactory.findAll({ userId: $stateParams.id }); 
          },
          favoriteProducts: function(FavoriteProductFactory, $stateParams){
            return FavoriteProductFactory.findAll({ userId: $stateParams.id }); 
          }
        },
        url: '/users/:id',
        templateUrl: '/browser/templates/user.html',
        controller: 'UserCtrl'      });
  });
