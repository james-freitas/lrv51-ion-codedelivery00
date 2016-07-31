angular.module('starter.controllers')
    .controller('ClientViewOrderCtrl', [
        '$scope', '$stateParams', 'Order', '$ionicLoading',
        function ($scope, $stateParams, Order, $ionicLoading) {

            $scope.order = [];
            $ionicLoading.show({
                template: 'Carregando...'
            });
            // Quando retorna apenas um objeto usar get
            Order.get({id: $stateParams.id, include: "items,cupom"}, function (data) {
                $scope.order = data.data;
                $ionicLoading.hide();
            }, function(dataError){  // funcao de fracasso
                $ionicLoading.hide();
            });
        }]);

