angular.module('starter.controllers')
    .controller('ClientViewProductCtrl', [
        '$scope', '$state', 'Product', '$ionicLoading', 'cart', '$localStorage',
        function ($scope, $state, Product, $ionicLoading, cart, $localStorage) {

            console.log($localStorage.setObject('cart', {
                name: "Ionic",
                version: "1.1.0"
            }));

            delete window.localStorage['cart'];
            
            $scope.products = [];
            $ionicLoading.show({
                template: 'Carregando...'
            });

            Product.query({}, function (data) {
                $scope.products = data.data;
                $ionicLoading.hide();
            }, function(dataError){  // funcao de fracasso
                $ionicLoading.hide();
            });
            
            $scope.addItem = function(item){
                cart.items.push(item);
                $state.go('client.checkout');
            };

        }]);


