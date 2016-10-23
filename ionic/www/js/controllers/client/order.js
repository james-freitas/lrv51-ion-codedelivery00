angular.module('starter.controllers')
    .controller('ClientOrderCtrl', [
        '$scope', '$state', '$ionicLoading', '$ionicActionSheet', 'ClientOrder', '$timeout',
        function ($scope, $state, $ionicLoading, $ionicActionSheet, ClientOrder, $timeout) {
            var page = 1;
            $scope.items = [];
            $scope.canMoreItens = true;
            /*$ionicLoading.show({
                template: 'Carregando...'
            });*/

            $scope.doRefresh = function(){
                page = 1;
                $scope.items = [];
                $scope.canMoreItens = true;
                $scope.loadMore();
                $timeout(function(){
                    $scope.$broadcast('scroll.refreshComplete');
                }, 200);
              /*getOrders().then(function (data) {
                  $scope.items = data.data;
                  $scope.$broadcast('scroll.refreshComplete')
              }, function(dataError){
                  $scope.$broadcast('scroll.refreshComplete')
              });*/
            };

            $scope.openOrderDetail = function(order){
                $state.go('client.view_order', {id: order.id});
            };

            $scope.showActionSheet = function(order){
                $ionicActionSheet.show({
                    buttons:[
                        {text: 'Ver Detalhes'},
                        {text: 'Ver Entrega'}
                    ],
                    titleText: 'O que fazer?',
                    cancelText: 'Cancelar',
                    cancel: function() {
                        
                    },
                    buttonClicked: function(index){
                        switch (index){
                            case 0:
                                $state.go('client.view_order', {id: order.id});
                                break;
                            case 1:
                                $state.go('client.view_delivery', {id: order.id});
                                break;
                        }
                    }
                })
            };

            $scope.loadMore = function(){
                getOrders().then(function(data){
                    $scope.items = $scope.items.concat(data.data);
                    if($scope.items.length == data.meta.pagination.total){
                        $scope.canMoreItens = false;
                    }
                    page =+ 1;
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                });
            };

            function getOrders(){
                return ClientOrder.query({
                    id: null,
                    page: page,
                    orderBy: 'created_at',
                    sortedBy: 'desc'
                }).$promise;
            }

/*

            getOrders().then(function (data) {
                $scope.items = data.data;
                $ionicLoading.hide();
            }, function(dataError){  // funcao de fracasso
                $ionicLoading.hide();
            });
*/

        }]);


