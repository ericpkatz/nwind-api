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
          user: function(UserFactory, $stateParams){
            return UserFactory.find($stateParams.id); 
          },
          addresses: function(AddressFactory, $stateParams){
            return AddressFactory.findAll({ userId: $stateParams.id }); 
          }
        },
        url: '/users/:id',
        templateUrl: '/browser/templates/user.html',
        controller: function($scope, user, addresses, AddressFactory){
          $scope.addresses = addresses;
          $scope.user = user;
          $scope.delete = function(address){
            AddressFactory.destroy(address);
          };
          $scope.showOnMap = function(address){
                var center = new google.maps.LatLng(address.lat, address.lng);
                map.panTo(center);
            console.log(address.lat, address.lng);
          
          };
            var map = new google.maps.Map(document.getElementById('map'), {
              center: {lat: -34.397, lng: 150.644},
              scrollwheel: false,
              zoom: 15 
            });
          var autocomplete = new google.maps.places.Autocomplete(document.getElementById('addressSearch', { types: ['geocode']}));
          autocomplete.addListener('place_changed', function(place){
            var place = autocomplete.getPlace();
            var latLng = place.geometry.location;
            console.log(latLng.lat(), latLng.lng());
            console.log(autocomplete.getPlace());
            var address = {};
            for (var i = 0; i < place.address_components.length; i++) {
              var addressType = place.address_components[i].types[0];
              address[addressType] = place.address_components[i].short_name;
            }
            var addressObject = {
              street: address.street_number + ' ' + address.route,
              city: address.locality,
              state: address.administrative_area_level_1,
              zipcode: address.postal_code,
              lat: latLng.lat(),
              lng: latLng.lng()
            };
            addressObject.userId = user.id;
            AddressFactory.create(addressObject)
              .then(function(address){
                $scope.addresses.push(address);
              });
          });
        }
      });
  });
