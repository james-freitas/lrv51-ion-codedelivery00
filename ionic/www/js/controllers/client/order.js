angular.module('starter.controllers')
    .controller('ClientOrderCtrl', [
        '$scope', '$state', '$ionicLoading', 'ClientOrder',
        function ($scope, $state, $ionicLoading, ClientOrder) {
            $scope.items = [];

            $ionicLoading.show({
                template: 'Carregando...'
            });

            $scope.doRefresh = function(){
              getOrders().then(function (data) {
                  $scope.items = data.data;
                  $scope.$broadcast('scroll.refreshComplete')
                  $ionicLoading.hide();
              }, function(dataError){  // funcao de fracasso
                  $scope.$broadcast('scroll.refreshComplete')
              });
            };

            $scope.openOrderDetail = function(order){
                $state.go('client.view_order', {id: order.id});
            };

            function getOrders(){
                return ClientOrder.query({
                    id: null,
                    orderBy: 'created_at',
                    sortedBy: 'desc'
                }).$promise;
            }

            getOrders().then(function (data) {
                $scope.items = data.data;
                $ionicLoading.hide();
            }, function(dataError){  // funcao de fracasso
                $ionicLoading.hide();
            });

        }]);


