angular.module('starter.controllers')
    .controller('ClientViewProductCtrl', [
        '$scope', '$state', 'Product', '$ionicLoading', '$cart',
        function ($scope, $state, Product, $ionicLoading, $cart) {

            //delete window.localStorage['cart'];
            
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
                item.qtd = 1;
                $cart.addItem(item);
                $state.go('client.checkout');
            }
        }]);


