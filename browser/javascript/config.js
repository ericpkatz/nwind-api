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
            return DepartmentFactory.findAll({}, {bypassCache: true});
          }
        }
      })
      .state('departments.edit', {
        url: '/:id/edit',
        templateUrl: '/browser/templates/edit.department.html',
        controller: function($state, $scope, department, DepartmentFactory){
          $scope.form = [
            "name",
            "priority",
            {
              "type": "submit",
              "style": "btn-info",
              "title": "OK"
            },
            {
              "type": "button",
              "style": "btn",
              "title": "Cancel",
              "onClick": "cancel()"
            }
          ];
          $scope.schema = {
            "type": "object",
            "title": "Department",
            "properties": {
              "name": {
                "title": "Name",
                "type": "string"
              },
              "priority": {
                "title": "Priority",
                "type": "integer",
                "minimum": 1,
                "maximum": 15
              }
            },
            "required": [
              "name"
            ]
          }; 

          $scope.model = angular.copy(department);

          $scope.cancel = function(){
            $scope.model = angular.copy(department);
          };

          $scope.save = function(){
            DepartmentFactory.update(department.id, $scope.model )
              .then(function(){
                $state.go('departments');
              });
          };
        },
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
