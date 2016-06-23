angular.module('app')
  .controller('UserCtrl', function(FavoriteProductFactory, $scope, user, addresses, AddressFactory, favoriteProducts, products){
    $scope.favoriteProducts = favoriteProducts;
    $scope.notFavorite = function(product){
      return $scope.favoriteProducts.filter(function(favorite){
        return favorite.productId === product.id;
      }).length === 0;
    };

    $scope.addFavorite = function(product){
      FavoriteProductFactory.create({userId: user.id, productId: product.id})
        .then(function(favorite){
          return FavoriteProductFactory.findAll({ userId: user.id }, { bypassCache: true });
        })
        .then(function(favoriteProducts){
          $scope.favoriteProducts = favoriteProducts;
        });
    };

    $scope.removeFavorite = function(favorite){
      FavoriteProductFactory.destroy({userId: user.id, id: favorite.id});
    };
    
    $scope.products = products;
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


  );
