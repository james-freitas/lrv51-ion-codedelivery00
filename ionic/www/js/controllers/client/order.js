angular.module('starter.controllers')
    .controller('ClientOrderCtrl', [
        '$scope', '$state', '$ionicLoading', 'Order',
        function ($scope, $state, $ionicLoading, Order) {
            $scope.items = [];

            $ionicLoading.show({
                template: 'Carregando...'
            });

            Order.query({id: null}, function (data) {
                $scope.items = data.data;
                $ionicLoading.hide();
            }, function(dataError){  // funcao de fracasso
                $ionicLoading.hide();
            });
        }]);


